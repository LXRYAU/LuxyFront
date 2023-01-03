import Link from "next/link";
import { handleClientScriptLoad } from "next/script";
import { useContext, useEffect, useState } from "react";
import { Card, Nav, Modal, Button } from "react-bootstrap";
import { SocketContext } from "../../context/socketcontext";
import { UserContext } from "../../context/usercontext";

const Fairness = () => {
    const socket = useContext(SocketContext);
    const user = useContext(UserContext);

    const [hashedServerSeed, setHashedServerSeed] = useState("");
    const [clientSeed, setClientSeed] = useState("");
    const [nonce, setNonce] = useState("");
    const [fairnessHistory, setFairnessHistory] = useState([]);

    const getFairnessHistory = () => {
        socket.emit("user:getFairnessHistory", {}, (res) => {
            setFairnessHistory(res.reverse());
        })
    }

    const handleRevealServerSeed = () => {
        socket.emit("user:revealServerSeed", {}, (res) => {
            setHashedServerSeed(res.hashedServerSeed);
            setClientSeed(res.clientSeed);
            setNonce(res.nonce);

            getFairnessHistory();
        })
    }
    const handleSetClientSeed = () => {
        socket.emit("user:setClientSeed", {clientSeed: clientSeed}, (res) => {
            setHashedServerSeed(res.hashedServerSeed);
            setClientSeed(res.clientSeed);
            setNonce(res.nonce);

            getFairnessHistory();
        })
    }

    useEffect(() => {
        socket.emit("user:getFairness", {}, (res) => {
            setHashedServerSeed(res.hashedServerSeed);
            setClientSeed(res.clientSeed);
            setNonce(res.nonce);

            getFairnessHistory();
        })
    }, [])

    return(
        <>
            <div>
                <label>Server Seed (Hashed)</label><br />
                <input style={{width: "600px"}} disabled value={hashedServerSeed}/>
                <button onClick={handleRevealServerSeed} style={{marginLeft: "5px"}}>Reveal</button>
            </div>

            <div style={{marginTop: "15px"}}>
                <label>Client Seed</label><br />
                <input style={{width: "600px"}} value={clientSeed} onChange={(e) => {setClientSeed(e.target.value)}}/>
                <button onClick={handleSetClientSeed} style={{marginLeft: "5px"}}>save</button>
            </div>

            <div style={{marginTop: "15px"}}>
                <label>Nonce</label><br />
                <input style={{width: "600px"}} disabled value={nonce}/>
            </div>

            <br />
            <b>History:</b>
            <table style={{width: "100%"}}>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Server Seed (Hashed)</th>
                        <th>Client Seed</th>
                        <th>Server Seed (Revealed)</th>
                        <th>Nonce</th>
                    </tr>
                    <tr>
                        <td>{fairnessHistory.length+1}</td>
                        <td>{hashedServerSeed}</td>
                        <td>{clientSeed}</td>
                        <td style={{filter: "blur(4px)"}}>5e6636741488b0a645589fc5a089f605a6391c7f</td>
                        <td>{nonce}</td>
                    </tr>
                    {fairnessHistory.map((item, i) => {
                        return(
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.hashedServerSeed}</td>
                                <td>{item.clientSeed}</td>
                                <td>{item.serverSeed}</td>
                                <td>{item.nonce}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Fairness;