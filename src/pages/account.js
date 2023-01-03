import Link from "next/link";
import { handleClientScriptLoad } from "next/script";
import { useContext, useEffect, useState } from "react";
import { Card, Nav, Modal, Button } from "react-bootstrap";
import Overview from "../components/account/overview";
import Fairness from "../components/account/fairness";
import { SocketContext } from "../context/socketcontext";
import { UserContext } from "../context/usercontext";
import UnboxingHistory from "../components/account/unboxinghistory";
import BattleHistory from "../components/account/battlehistory";

const Account = () => {
	const socket = useContext(SocketContext);
	const user = useContext(UserContext);
	const [tab, setTab] = useState("overview");

	return (
		<>
			<section className="breadcrumb-option">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="breadcrumb__text">
								<h4>My Account</h4>
								<div className="breadcrumb__links">
									<Link href="/boxes">Home</Link>
									<span>Account</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="container" style={{ marginTop: "50px" }}>
				{user && (
					<>
						<Nav
							variant="pills"
							activeKey={tab}
							onSelect={(newTab) => {
								setTab(newTab);
							}}
						>
							<Nav.Item>
								<Nav.Link eventKey="overview">Overview</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="fairness">Fairness</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="unboxing history">
									Unboxing History
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="battle history">Battle History</Nav.Link>
							</Nav.Item>
						</Nav>

						<br />

						{tab == "overview" && <Overview />}
						{tab == "fairness" && <Fairness />}
						{tab == "unboxing history" && <UnboxingHistory />}
						{tab == "battle history" && <BattleHistory />}
					</>
				)}
			</div>

			<div style={{ height: "400px" }} />
		</>
	);
};

export default Account;
