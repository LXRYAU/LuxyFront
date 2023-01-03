import Link from "next/link";
import { handleClientScriptLoad } from "next/script";
import { useContext, useEffect, useState } from "react";
import { Card, Nav, Modal, Button } from "react-bootstrap";
import { SocketContext } from "../../context/socketcontext";
import { UserContext } from "../../context/usercontext";
import randomRoll from "../../util/randomRoll";

const BattleHistory = () => {
    const socket = useContext(SocketContext);
    const user = useContext(UserContext);

    const [history, setHistory] = useState([]);

    useEffect(() => {
        socket.emit("user:getBattleHistory", {}, (res) => {
            setHistory(res);
            console.log(res);
        })
    }, [])

    return(
        <>
            <table style={{width: "100%"}}>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Random.org Ticket</th>
                        <th>Boxes</th>
                        <th>Users</th>
                        <th>Winner</th>
                    </tr>
                    {history.map((item, i) => {
                        return(
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.randomTicketId}</td>
                                <td>
                                    <div style={{display: "flex", gap:"5px"}}>
                                        {item.boxes.map((box, ii) => {
                                            return(
                                                <img key={i} height="25px" src={box.iconUrl}/>
                                            )
                                        })}
                                    </div>
                                </td>
                                <td>
                                    <div style={{display: "flex", gap:"5px"}}>
                                        {item.battleUsers.map((battleUser, ii) => {
                                            return(
                                                <img key={i} style={{height: "25px", width: "25px", borderRadius: "100%"}} src={battleUser.user.avatar}/>
                                            )
                                        })}
                                    </div>
                                </td>
                                <td>
                                    <div style={{display: "flex", gap:"5px"}}>
                                        <img style={{height: "25px", width: "25px", borderRadius: "100%"}} src={item.winner.avatar}/>
                                        <div>{item.winner.displayName}</div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default BattleHistory;