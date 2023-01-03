import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { SocketContext } from "../context/socketcontext";

const Inventory = () => {
	const socket = useContext(SocketContext);
	const [inventoryItems, setInventoryItems] = useState([]);

	const getItems = () => {
		socket.emit("items:owned", {}, (res) => {
			if (Array.isArray(res)) {
				res.sort(function (a, b) {
					return parseInt(b.item.value) - parseInt(a.item.value);
				});
				setInventoryItems(res);
			}
		});
	};

	const handleSell = (inventoryItem) => {
		socket.emit("items:sell", { itemId: inventoryItem.id }, (res) => {
			if (res.status == true) {
				getItems();
			}
		});
	};

	const handleSellAll = () => {
		socket.emit("items:sellAll", {}, (res) => {
			if (res.status == true) {
				getItems();
			}
		});
	};

	const formatName = (name) => {
		return name.replace("&#39", "").replace("&#39", "").replace("|", "");
	};

	useEffect(() => {
		getItems();
	}, [socket]);

	return (
		<div>
			<section className="breadcrumb-option">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="breadcrumb__text">
								<h4>My Inventory</h4>
								<div className="breadcrumb__links">
									<Link href="/boxes">Home</Link>
									<span>Inventory</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="container" style={{ marginTop: "25px" }}>
				<div className="checkout__form">
					<form action="#">
						<div className="row">
							<div className="col-lg-8 col-md-6">
								<div className="row">
									<div
										style={{
											display: "flex",
											flexWrap: "wrap",
											gap: "10px",
										}}
									>
										{inventoryItems.map((inventoryItem, i) => {
											let item = inventoryItem.item;
											return (
												<div
													key={i}
													style={{
														display: "flex",
														flexDirection: "column",
														justifyContent: "space-between",
														width: "160px",
														height: "230px",
														backgroundColor: "#F3F2EE",
														padding: "15px",
													}}
												>
													<div>
														<div>
															<img
																width="100px"
																src={`https://community.akamai.steamstatic.com/economy/image/${item.icon}/360x360`}
															/>
														</div>
														<div>
															<b style={{ fontSize: "11px" }}>{item.gunType}</b>
														</div>
														<div>{item.color}</div>
														<div>({item.wear})</div>
													</div>

													<div style={{ display: "flex", gap: "5px" }}>
														<div
															style={{
																backgroundColor: "white",
																color: "black",
																fontWeight: "bold",
																display: "flex",
																flex: 1,
																justifyContent: "center",
																padding: "5px",
															}}
														>
															${item.value / 100}
														</div>
														<div
															onClick={() => {
																handleSell(inventoryItem);
															}}
															style={{
																cursor: "pointer",
																backgroundColor: "black",
																color: "white",
																fontWeight: "bold",
																display: "flex",
																flex: 1,
																justifyContent: "center",
																padding: "5px",
															}}
														>
															SELL
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6">
								<div className="checkout__order">
									<ul className="checkout__total__all">
										<li>
											Items Owned: <b>{inventoryItems.length}</b>
										</li>
										<li>
											Total Value: ${" "}
											<b>
												{inventoryItems.reduce(
													(a, b) => +a + +b.item.value,
													0
												) / 100}
											</b>
										</li>
									</ul>
									<button onClick={handleSellAll} className="site-btn">
										SELL ALL FOR $
										{inventoryItems.reduce((a, b) => +a + +b.item.value, 0) /
											100}
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Inventory;
