import Link from "next/link";
import { handleClientScriptLoad } from "next/script";
import { useContext, useEffect, useState } from "react";
import { Card, Nav, Modal, Button } from "react-bootstrap";
import { SocketContext } from "../../context/socketcontext";
import { UserContext } from "../../context/usercontext";
import battleRoll from "../../util/battleroll";
import randomRoll from "../../util/randomRoll";

const BattleFairness = ({battle, showModal, setShowModal}) => {
    const socket = useContext(SocketContext);
    const user = useContext(UserContext);

    const [tab, setTab] = useState("info");

    const [nonce, setNonce] = useState(1);
    const [verifyText, setVerifyText] = useState("...");

    const doVerify = () => {
        let roll = battleRoll(battle.randomBeacon, nonce, battle.clientSeeds);

        setVerifyText("Roll: " + roll);
    }

    return(
        <>
            {battle &&
                <Modal show={showModal} onHide={() => {setShowModal(false)}} size="lg">
                    <Modal.Header>Fairness</Modal.Header>
                    <Modal.Body>
                        <Nav variant="tabs" activeKey={tab} onSelect={(newTab) => {setTab(newTab)}}>
                            <Nav.Item>
                                <Nav.Link eventKey="info">Info</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="verify">Verify</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <br />

                        {tab == "info" &&
                            <>
                                 <div>
                                    <label>Ticket ID <a href={"https://api.random.org/tickets/form?ticket="+battle.randomTicketId} target="_BLANK">(Verify Ticket)</a></label><br />
                                    <input style={{width: "600px"}} disabled value={battle.randomTicketId}/>
                                </div>

                                <div style={{marginTop: "5px"}}>
                                    <label>Beacon</label><br />
                                    <input style={{width: "600px"}} disabled value={battle.randomBeacon}/>
                                </div>
                                
                                <div style={{marginTop: "5px"}}>
                                    <label>Client Seeds</label><br />
                                    <input style={{width: "600px"}} disabled value={battle.clientSeeds}/>
                                </div>

                                <div style={{marginTop: "5px"}}>
                                    <label>Nonce</label><br />
                                    <input style={{width: "600px"}} disabled value={battle.nonce}/>
                                </div>

                                <hr />

                                <h6>Rounds:</h6>
                                {battle.rounds.length > 0 
                                    ?
                                        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                                            <div style={{display: "flex", height: "50px", gap: "10px"}}>
                                                <div style={{width: "80px", backgroundColor:"gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                    <span style={{color: "white"}}>Round</span>
                                                </div>
                                                <div style={{flex: 1, backgroundColor:"gray", color: "white", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                    <img height="30px" style={{borderRadius: "10px", marginRight: "5px"}} src={battle.players[0].user.avatar}/>
                                                    <span>{battle.players[0].user.displayName}</span>
                                                </div>
                                                <div style={{flex: 1, backgroundColor:"gray", color: "white",display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                    <img height="30px" style={{borderRadius: "10px", marginRight: "5px"}} src={battle.players[1] && battle.players[1].user.avatar}/>
                                                    <span>{battle.players[1] && battle.players[1].user.displayName}</span>
                                                </div>
                                                <div style={{flex: 1, backgroundColor:"gray", color: "white",display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                    <img height="30px" style={{borderRadius: "10px", marginRight: "5px"}} src={battle.players[2] && battle.players[2].user.avatar}/>
                                                    <span>{battle.players[2] && battle.players[2].user.displayName}</span>
                                                </div>
                                                <div style={{flex: 1, backgroundColor:"gray", color: "white",display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                    <img height="30px" style={{borderRadius: "10px", marginRight: "5px"}} src={battle.players[3] && battle.players[3].user.avatar}/>
                                                    <span>{battle.players[3] && battle.players[3].user.displayName}</span>
                                                </div>
                                            </div>

                                            {battle.rounds.map((round, i) => {
                                                return(
                                                    <div key={i} style={{display: "flex", minHeight: "50px", gap: "10px"}}>
                                                        <div style={{width: "80px", backgroundColor:"gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                            <span style={{color: "white"}}>{i+1}</span>
                                                        </div>
                                                        {round.battleUserRound[0] &&
                                                            <div style={{flex: 1/4.2, backgroundColor:"gray", color: "white"}}>
                                                                <div style={{padding: "5px", fontSize: "12px", display: "flex", flexDirection: "column", gap: "5px"}}>
                                                                    <div><b>Nonce</b><br/>{round.battleUserRound[0].nonce}</div>
                                                                    <div><b>Roll</b><br/>{round.battleUserRound[0].roll}</div>
                                                                    <div><b>Item</b><br/>{round.battleUserRound[0].wonItem.name}</div>
                                                                    <div><b>Total</b><br/>{round.battleUserRound[0].total/100}</div>
                                                                </div>
                                                            </div>
                                                        }

                                                        {round.battleUserRound[1] &&
                                                            <div style={{flex: 1/4.2, backgroundColor:"gray", color: "white"}}>
                                                                <div style={{padding: "5px", fontSize: "12px", display: "flex", flexDirection: "column", gap: "5px"}}>
                                                                    <div><b>Nonce</b><br/>{round.battleUserRound[1].nonce}</div>
                                                                    <div><b>Roll</b><br/>{round.battleUserRound[1].roll}</div>
                                                                    <div><b>Item</b><br/>{round.battleUserRound[1].wonItem.name}</div>
                                                                    <div><b>Total</b><br/>{round.battleUserRound[1].total/100}</div>
                                                                </div>
                                                            </div>
                                                        }

                                                        {round.battleUserRound[2] &&
                                                            <div style={{flex: 1/4.2, backgroundColor:"gray", color: "white"}}>
                                                                <div style={{padding: "5px", fontSize: "12px", display: "flex", flexDirection: "column", gap: "5px"}}>
                                                                    <div><b>Nonce</b><br/>{round.battleUserRound[2].nonce}</div>
                                                                    <div><b>Roll</b><br/>{round.battleUserRound[2].roll}</div>
                                                                    <div><b>Item</b><br/>{round.battleUserRound[2].wonItem.name}</div>
                                                                    <div><b>Total</b><br/>{round.battleUserRound[2].total/100}</div>
                                                                </div>
                                                            </div>
                                                        }

                                                        {round.battleUserRound[3] &&
                                                            <div style={{flex: 1/4.2, backgroundColor:"gray", color: "white"}}>
                                                                <div style={{padding: "5px", fontSize: "12px", display: "flex", flexDirection: "column", gap: "5px"}}>
                                                                    <div><b>Nonce</b><br/>{round.battleUserRound[3].nonce}</div>
                                                                    <div><b>Roll</b><br/>{round.battleUserRound[3].roll}</div>
                                                                    <div><b>Item</b><br/>{round.battleUserRound[3].wonItem.name}</div>
                                                                    <div><b>Total</b><br/>{round.battleUserRound[3].total/100}</div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    :
                                        <i>Full rounds data will be available after the battle.</i>
                                }
                            </>
                        }

                        {tab == "verify" &&
                            <>
                                <div>
                                    <label>Beacon</label><br />
                                    <input style={{width: "600px"}} disabled value={battle.randomBeacon}/>
                                </div>

                                <div style={{marginTop: "15px"}}>
                                    <label>Client Seeds</label><br />
                                    <input style={{width: "600px"}} disabled value={battle.clientSeeds}/>
                                </div>

                                <div style={{marginTop: "15px"}}>
                                    <label>Nonce</label><br />
                                    <input style={{width: "600px"}} value={nonce} onChange={(e) => {setNonce(e.target.value)}}/>
                                </div>

                                <hr />
                                <Button onClick={doVerify} style={{width: "100%", height: "50px"}} variant="success">Verify Fairness</Button>
                                <div style={{backgroundColor: "gray", marginTop: "10px", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "25px", fontWieght: "bold", color: "white"}}>
                                    <div>{verifyText}</div>
                                </div>
                                <a href="https://codesandbox.io/s/battle-unboxing-fairness-nd8pv4?file=/src/index.js" target="_BLANK">Independent Verification</a>
                            </>
                        }
                    </Modal.Body>
                </Modal>
            }
        </>
    )
}

export default BattleFairness;