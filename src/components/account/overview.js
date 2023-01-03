import Link from "next/link";
import { handleClientScriptLoad } from "next/script";
import { useContext, useEffect, useState } from "react";
import { Card, Nav, Modal, Button } from "react-bootstrap";
import { SocketContext } from "../../context/socketcontext";
import { UserContext } from "../../context/usercontext";

const Overview = () => {
    const socket = useContext(SocketContext);
    const user = useContext(UserContext);

    return(
        <div style={{display: "flex", gap: "10px"}}>
            <img style={{height: "100px", borderRadius: "15px"}} src={user.avatar}/>

            <div>
                <div style={{lineHeight: "12px"}}>
                    <span style={{fontSize: "10px", fontWeight: "bold"}}>Username</span>
                    <br />
                    <span>{user.displayName}</span>

                    <br/><br/>
                    <span style={{fontSize: "10px", fontWeight: "bold"}}>Steam Level</span>
                    <br />
                    <span>{user.steamLevel}</span>
                </div>
            </div>
        </div>
    )
}

export default Overview;