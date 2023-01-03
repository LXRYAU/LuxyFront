import Link from "next/link";
import { handleClientScriptLoad } from "next/script";
import { useContext, useEffect, useState } from "react";
import { Card, Nav, Modal, Button } from "react-bootstrap";
import { SocketContext } from "../../context/socketcontext";
import { UserContext } from "../../context/usercontext";
import randomRoll from "../../util/randomRoll";

const UnboxingHistory = () => {
    const socket = useContext(SocketContext);
    const user = useContext(UserContext);

    const [history, setHistory] = useState([]);
    const [current, setCurrent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [verifyText, setVerifyText] = useState("");
    
    const handleShowModal = (item) => {
        setVerifyText("...");
        setCurrent(item);
        setShowModal(true);
    }
    const handleVerifyFairness = () => {
        if(current.fairness.active) {
            socket.emit("user:revealServerSeed", {}, (res) => {
                socket.emit("user:getUnboxingHistory", {}, (res) => {
                    setHistory(res.reverse())
                })
                
                const clone = structuredClone(current);
                clone.fairness.active = false;
                clone.fairness.serverSeed = res.prevServerSeed;
                setCurrent(clone);

                let roll = randomRoll(res.prevServerSeed, current.fairness.clientSeed, current.fairnessNonce);

                if(roll == current.roll) {
                    setVerifyText("Outcome: Fair, Roll: " + roll);
                } else {
                    setVerifyText("Outcome: Unfair, Roll: " + roll);
                }
            })
        } else {
            let roll = randomRoll(current.fairness.serverSeed, current.fairness.clientSeed, current.fairnessNonce);

            if(roll == current.roll) {
                setVerifyText("Outcome: Fair, Roll: " + roll);
            } else {
                setVerifyText("Outcome: Unfair, Roll: " + roll);
            }
        }
    }

    useEffect(() => {
        socket.emit("user:getUnboxingHistory", {}, (res) => {
            setHistory(res.reverse())
        })
    }, [])

    return(
        <>
            <table style={{width: "100%"}}>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Box</th>
                        <th>Cost</th>
                        <th>Roll</th>
                        <th>Item</th>
                        <th>Provably Fair</th>
                    </tr>
                    {history.map((item, i) => {
                        return(
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>
                                    <Link href={"/boxes/"+item.box.id} passHref={true}>
                                        <a style={{textDecoration: "none", color: "black"}}>
                                            <img width="40px" src={item.box.iconUrl}/>
                                            <span  style={{marginLeft: "3px"}}>{item.box.name}</span>
                                        </a>
                                    </Link>
                                </td>
                                <td>{item.cost}</td>
                                <td>{item.roll}</td>
                                <td>
                                    <Link href="/inventory" passHref={true}>
                                        <a style={{textDecoration: "none", color: "black"}}>
                                            {item.wonItem.status == "owned" &&
                                                <>
                                                    <img width="40px" src={`https://community.akamai.steamstatic.com/economy/image/${item.wonItem.item.icon}/360x360`}/>
                                                    <span style={{marginLeft: "3px"}}>{item.wonItem.item.name}</span>
                                                </>
                                            }

                                            {item.wonItem.status == "sold" &&
                                                <div style={{opacity: "0.5"}}>
                                                    <img width="40px" src={`https://community.akamai.steamstatic.com/economy/image/${item.wonItem.item.icon}/360x360`}/>
                                                    <span style={{marginLeft: "3px"}}>{item.wonItem.item.name} -- Sold</span>
                                                </div>
                                            }
                                        </a>
                                    </Link>
                                </td>
                                <td><button onClick={() => {handleShowModal(item)}}>Verify Fairness</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Modal show={showModal} onHide={() => {setShowModal(false)}} size="lg">
                <Modal.Body style={{margin: "auto"}}>
                    {current &&
                        <>
                            <div style={{display: "flex", gap: "10px"}}>
                                <img height="100px" src={`https://community.akamai.steamstatic.com/economy/image/${current.wonItem.item.icon}/360x360`}/>
                                <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                                    <div style={{lineHeight: "12px"}}>
                                        <span style={{fontSize: "10px", fontWeight: "bold"}}>Box</span>
                                        <br />
                                        <span><img height="20px" src={current.box.iconUrl}/>{current.box.name}</span>
                                    </div>

                                    <div style={{lineHeight: "12px"}}>
                                        <span style={{fontSize: "10px", fontWeight: "bold"}}>Roll</span>
                                        <br />
                                        <span>{current.roll}</span>
                                    </div>

                                    <div style={{lineHeight: "12px"}}>
                                        <span style={{fontSize: "10px", fontWeight: "bold"}}>Item</span>
                                        <br />
                                        <span>{current.wonItem.item.name}</span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <label>Server Seed (Hashed)</label><br />
                                <input style={{width: "600px"}} disabled value={current.fairness.hashedServerSeed}/>
                            </div>

                            <div style={{marginTop: "15px"}}>
                                <label>Server Seed</label><br />
                                <input style={{width: "600px"}} disabled value={current.fairness.serverSeed ? current.fairness.serverSeed : "hidden"}/>
                            </div>

                            <div style={{marginTop: "15px"}}>
                                <label>Client Seed</label><br />
                                <input style={{width: "600px"}} disabled value={current.fairness.clientSeed}/>
                            </div>

                            <div style={{marginTop: "15px"}}>
                                <label>Nonce</label><br />
                                <input style={{width: "600px"}} disabled value={current.fairnessNonce}/>
                            </div>

                            <hr />
                            <Button onClick={handleVerifyFairness} style={{width: "100%", height: "50px"}} variant="success">Verify Fairness</Button>
                            {current.fairness.serverSeed ? <></> : <i>Verifying will reveal and rotate the server seed.</i>}
                            <div style={{backgroundColor: "gray", marginTop: "10px", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "25px", fontWieght: "bold", color: "white"}}>
                                <div>{verifyText}</div>
                            </div>
                            <a href="https://codesandbox.io/s/case-unboxing-fariness-vepk8n?file=/src/index.js" target="_BLANK">Independent Verification</a>
                        </>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UnboxingHistory;