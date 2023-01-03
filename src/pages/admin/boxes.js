import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card, Table, Modal, Tabs, Tab, Sonnet } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/socketcontext';
import randomInt from "../../util/randomint";

const Boxes = () => {
    const socket = useContext(SocketContext);
    const [show, setShow] = useState(false);
    const [itemsInBox, setItemsInBox] = useState([]); 
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const [boxes, setBoxes] = useState([]);
    const [boxName, setBoxName] = useState("");
    const [boxDescription, setBoxDescription] = useState("default description");
    const [boxIconUrl, setBoxIconUrl] = useState("https://www.csgolive.com/assets/images/newCases/custom_cases/KnifeCase.png");
    const [boxCost, setBoxCost] = useState("");

    const [wantedEdge, setWantedEdge] = useState("");
    const [suggestPrice, setSuggestPrice] = useState(0);

    const [trueHouseEdge, setTrueHouseEdge] = useState(0);
    const [profitPer, setProfitPer] = useState(0);
     
    const handleRefreshItems = () => {
        socket.emit("admin:refreshItems", "", (res) => {
            console.log(res);
        })
    }

    const getItems = () => {
        socket.emit("items:list", {page: page, perPage: 8, query: searchQuery}, (res) => {
            setItems(res);
        })
    }

    const formatName = (name) => {
        return name.replace("&#39", "").replace("&#39", "").replace("|", "");
    }

    const handleNextPage = () => {
        setPage(page+1);
    }

    const handleBackPage = () => {
        if(page > 1) {
            setPage(page-1);
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addItem = (item) => {
        let copy = [...itemsInBox];
        copy.push(item);
        setItemsInBox(copy);
    }

    const numberWithCommas = (x) => {
        if(x == 0) return 0;
        if(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }

    const recalculateRolls = () => {
        let rollTot = 0;

        let copy = [...itemsInBox];

        copy.forEach((item, i) => {
            if(item.chance) {
                item.rollStart = rollTot;
                item.rollEnd = rollTot+(item.chance*1000);

                rollTot += item.chance*1000;
            }
        })

        setItemsInBox(copy);
    }

    const totalChance = () => {
        let calc = 0;

        itemsInBox.forEach((item, i) => {
            if(item.chance) {
                calc+=parseFloat(item.chance);
            }
        })

        return calc;
    }

    const createBox = () => {
        socket.emit("admin:createBox", {name: boxName, description: boxDescription, iconUrl: boxIconUrl, cost: boxCost*100, items: itemsInBox}, (res) => {
            console.log(res);
        })
    }

    const deleteBox = (id) => {
        socket.emit("admin:deleteBox", {id: id}, (res) => {
            console.log(res);
        })
    }

    /* Fairness Section */
    const handleCalculateSuggested = () => {
        if(isNaN(parseInt(wantedEdge))) return;
        if(itemsInBox.length == 0) return;

        let valuePer = 0;
        itemsInBox.forEach((item) => {
            valuePer += (item.value*(item.chance/100))
        })
        let multiplier = (wantedEdge/100)+1;
        
        let suggested = (valuePer*multiplier)/100

        setSuggestPrice(Math.round(suggested * 100) / 100);
    }

    const handleCalculateAnalytics = () => {
        if(itemsInBox.length == 0) return;
        
        let iterations = 25000000;
        let trueCost = boxCost*100;

        let valuePer = 0;
        itemsInBox.forEach((item) => {
            valuePer += (item.value*(item.chance/100))
        })
        var percDiff = (trueCost - valuePer) / valuePer * 100.0;

        setTrueHouseEdge(Math.round(percDiff * 100) / 100);
        setProfitPer(Math.round((trueCost-valuePer)/100 * 100) / 100)
    }
    /* End Fariness Section */

    const fillRandom = () => {
        let fillRandomAmount = 50;
        socket.emit("items:list", {page: 1, perPage: 10000, query: searchQuery}, (res) => {
            let fetchedItems = res;
            setItemsInBox([]);

            let randomItems = fetchedItems.sort(() => .5 - Math.random()).slice(0,fillRandomAmount);
            let remaining = 10000;
            let tot = 0;
            randomItems.forEach((item, i) => {
                if(i == randomItems.length - 1) {
                    item.chance = (10000-tot)/100;
                } else {
                    let randomChance = randomInt((remaining > 10 ? 10 : remaining), (remaining < 2000 ? remaining : 2000));
                    console.log(remaining);
                    item.chance = randomChance/100;
                    remaining -= randomChance;
                    tot += randomChance;
                }
            })

            let rollTot = 0;
            randomItems.forEach((item, i) => {
                if(item.chance) {
                    item.rollStart = rollTot;
                    item.rollEnd = rollTot+(item.chance*1000);
    
                    rollTot += item.chance*1000;
                }
            })

            randomItems.sort((a, b) => parseInt(a.value) - parseInt(b.value));

            let keep = [];
            randomItems.forEach((item) => {
                if(item.chance != 0) {
                    keep.push(item);
                }
            })

            setItemsInBox(keep);
        })
    }

    useEffect(() => {
        socket.emit("boxes:list", {page: 1, perPage: 8}, (res) => {
            setBoxes(res);
        })
    }, [])

    useEffect(() => {
        getItems();
    }, [page, searchQuery])

    useEffect(() => {
        setPage(1);
    }, [searchQuery])

    useEffect(() => {
        handleCalculateAnalytics();
        handleCalculateSuggested();
    }, [itemsInBox, boxCost, wantedEdge])

    return(
        <>            
            <div>
                <Card>
                    <Card.Header>Create New Box</Card.Header>
                    <Card.Body> 
                    
                        <Form.Group className="mb-3">
                            <Form.Label>Box Name</Form.Label>
                            <Form.Control type="text" value={boxName} onChange={(e) => {setBoxName(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={boxDescription} onChange={(e) => {setBoxDescription(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Icon Url</Form.Label>
                            <Form.Control type="text" value={boxIconUrl} onChange={(e) => {setBoxIconUrl(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Cost</Form.Label>
                            <Form.Control type="number" value={boxCost} onChange={(e) => {setBoxCost(e.target.value)}}/>
                        </Form.Group>

                        <Card>
                            <Card.Header style={{display: "flex", justifyContent: "space-between"}}>
                                <div>Items - {itemsInBox.length} ({totalChance()}%)</div>
                                <div>Number will be rolled: 0 - 100,000</div>
                            </Card.Header>
                            <Card.Body>
                                <div style={{display: "flex", gap: "10px"}}>
                                    <Button onClick={handleShow}>Add Item</Button>
                                    <Button onClick={fillRandom} variant="warning">Fill Random</Button>
                                </div>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Icon</th>
                                            <th>Skin</th>
                                            <th>Value</th>
                                            <th>Chance (%)</th>
                                            <th>RollStart - RollEnd</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemsInBox.map((item, i) => {
                                            return(
                                                <tr key={i}>
                                                    <td><img width="60px" src={`https://community.akamai.steamstatic.com/economy/image/${item.icon}/360x360`}/></td>
                                                    <td>{item.name}</td>
                                                    <td>{item.value/100}</td>
                                                    <td>
                                                        <input 
                                                            type="number" 
                                                            value={item.chance} 
                                                            onChange={(e) => {
                                                                let copy = [...itemsInBox];
                                                                var res = copy.find(x => x.nameHash === item.nameHash);
                                                                
                                                                res.chance = e.target.value;
                                                                //res.rollStart = currentRoll;
                                                                //res.rollEnd = e.target.value*1000;

                                                                setItemsInBox(copy);
                                                                recalculateRolls();
                                                            }}
                                                        />
                                                    </td>
                                                    <td>{numberWithCommas(item.rollStart)} - {numberWithCommas(item.rollEnd)}</td>
                                                    <td>
                                                        <Button onClick={() => {
                                                            let copy = [...itemsInBox];
                                                            copy = copy.filter(function( obj ) {
                                                                return obj.nameHash !== item.nameHash;
                                                            });
                                                            setItemsInBox(copy);
                                                        }} variant="danger">Remove</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                        <br />

                        <Card style={{width: "560px"}}>
                            <Card.Body style={{display: "flex"}}>
                                <div style={{}}>
                                    <h6>Price Suggestor</h6>
                                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                        <div>Wanted House Edge: <input style={{width: "60px"}} type="number" value={wantedEdge} onChange={(e) => {setWantedEdge(e.target.value)}}/>%</div>
                                    </div>
                                    <b>Suggested Price: {suggestPrice}</b>
                                </div>

                                <div style={{width: "90px", marginRight: "10px"}}>
                                    <hr style={{transform: "rotate(90deg) translate(25px, 0px)"}}/>
                                </div>

                                <div>
                                    <h6>Analytics</h6>
                                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                        <div> 
                                            <div>House Edge: {trueHouseEdge}%</div>
                                            <div>Profit Per Unbox: {profitPer}</div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <br />

                        <Button onClick={createBox}>Create</Button>
                    </Card.Body>
                </Card>
            </div>

            <hr style={{marginTop: "25px", marginBottom: "25px"}} />

            <div>
                <Card>
                    <Card.Header>Manage Boxes</Card.Header>
                    <Card.Body style={{display: "flex", gap: "15px"}}>
                        {boxes.map((box, i) => {
                            return(
                                <Card key={i} style={{width: "150px", height: "200px"}}>
                                    <Card.Body style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                                        <div>
                                            <img height="60px" src={box.iconUrl}/>
                                        </div>

                                        <div>{box.name}</div>

                                        <Button onClick={() => {deleteBox(box.id)}} variant="danger">Delete</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </Card.Body>
                </Card>
            </div>

            <br /><br />

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Body>
                    <div style={{display: "flex", flexWrap: "wrap", gap: "10px", border: "1px solid gray", padding: "15px", borderRadius: "5px"}}>
                        {items.map((item, i) => {
                            return(
                                <Card style={{minWidth: "160px", width: "160px", minHeight: "250px", height: "250px"}}>
                                    <Card.Body style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                        <div>
                                            <div>
                                                <img width="100px" src={`https://community.akamai.steamstatic.com/economy/image/${item.icon}/360x360`}/>
                                            </div>
                                            <div>
                                                <b style={{fontSize: "11px"}}>{item.gunType}</b>
                                            </div>
                                            <div>{item.color}</div>
                                            <div>({item.wear})</div>
                                        </div>

                                        <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                                            <div style={{backgroundColor: "green", color: "white", fontWeight: "bold", display: "flex", justifyContent: "center", padding: "5px"}}>{item.value/100}</div>
                                            <Button onClick={() => {addItem(item)}}>Add</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </div>

                    <br />
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div style={{display: "flex", gap: "5px", alignItems: "center"}}>
                            <button onClick={handleBackPage}>Back</button>
                            <span>Page: {page}</span>
                            <button onClick={handleNextPage}>Next</button>
                        </div>

                        <div>
                            <span>Search: </span>
                            <input value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)}}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Boxes;