import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { SocketContext } from "../../context/socketcontext";

const Admin = () => {
    const socket = useContext(SocketContext);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    
    const handleRefreshItems = () => {
        socket.emit("admin:refreshItems", "", (res) => {
            console.log(res);
        })
    }

    const getItems = () => {
        socket.emit("items:list", {page: page, perPage: 18}, (res) => {
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

    useEffect(() => {
        getItems();
    }, [page])

    return(
        <div>
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

                                <div style={{backgroundColor: "green", color: "white", fontWeight: "bold", display: "flex", justifyContent: "center", padding: "5px"}}>{item.value/100}</div>
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
                <button style={{color: "red"}} onClick={handleRefreshItems}>Refresh Items</button>
            </div>
        </div>
    )
}

export default Admin;