import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Card, Button, Table, Modal } from "react-bootstrap";
import { SocketContext } from "../../context/socketcontext";
import { motion } from "framer-motion";
import BattleRow from "../../components/battles/battlerow";
import BoxCard from "../../components/boxcard";
import styled from "@emotion/styled";

const Battles = () => {
	const [sortMode, setSortMode] = useState("new"); // new || expensive
	const socket = useContext(SocketContext);
	const [battles, setBattles] = useState([]);
	const [boxes, setBoxes] = useState([]);
	const [players, setPlayers] = useState(2);

	const [showCreateBattleModal, setShowCreateBattleModal] = useState(false);
	const [addedBoxes, setAddedBoxes] = useState([]);

	const handleClose = () => setShowCreateBattleModal(false);
	const handleShow = () => setShowCreateBattleModal(true);

	const getBattles = () => {
		socket.emit("battles:list", {}, (res) => {
			res.forEach(function (item, i) {
				if (item.status === "lobby") {
					res.splice(i, 1);
					res.unshift(item);
				}
			});

			setBattles(res);
		});
	};

	const handleAddBox = (box) => {
		let temp = [...addedBoxes];
		const clone = structuredClone(box);
		clone.amount = 1;

		let obj = temp.find((o) => o.id === box.id);
		if (obj) {
			obj.amount = parseInt(obj.amount) + 1;
		} else {
			temp.push(clone);
		}

		setAddedBoxes(temp);
	};

	const createBattle = () => {
		socket.emit(
			"battles:create",
			{ boxes: addedBoxes, players: players },
			(res) => {
				console.log(res);
				getBattles();
			}
		);
	};

	useEffect(() => {
		getBattles();
		socket.emit("boxes:list", { page: 1, perPage: 8 }, (res) => {
			setBoxes(res);
		});
	}, [socket]);

	return (
		<>
			<div
				style={{
					marginTop: "-125px",
					backgroundImage: "url(/img/battleswall.png)",
					backgroundSize: "",
					backgroundPosition: "top",
					backgroundColor: "#F3F2EE",
					height: "400px",
					paddingTop: "60px",
				}}
			>
				<div className="container">
					<div className="row">
						<div className="col-xl-5 col-lg-7 col-md-8">
							<div className="hero__text">
								<h2>Box Battles</h2>
								<p>
									Discover and unbox luxury products on the world’s most
									entertaining shopping platform.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div style={{ marginTop: "50px" }} className="container">
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<ul
						className="filter__controls"
						style={{
							textAlign: "left",
							paddingLeft: "0px",
							marginBottom: "0px",
						}}
					>
						<li
							onClick={() => {
								setSortMode("new");

								let temp = [...battles];
								temp.sort(function (a, b) {
									return a.id - b.id;
								});
								setBattles(temp);
							}}
							className={`${sortMode == "new" && "active"}`}
							style={{ marginRight: "40px" }}
						>
							Newest
						</li>
						<li
							onClick={() => {
								setSortMode("expensive");

								let temp = [...battles];
								temp.sort(function (b, a) {
									return a.totalCost - b.totalCost;
								});
								setBattles(temp);
							}}
							className={`${sortMode == "expensive" && "active"}`}
						>
							Most Expensive
						</li>
					</ul>
					<div
						onClick={handleShow}
						style={{ cursor: "pointer" }}
						className="primary-btn"
					>
						Create Battle
					</div>
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "25px",
						marginTop: "35px",
					}}
				>
					{battles.map((battle, i) => {
						return <BattleRow key={battle.id} pushedBattle={battle} />;
					})}
				</div>
			</div>

			<Modal show={showCreateBattleModal} onHide={handleClose} size="lg">
				<Modal.Body>
					<div
						style={{
							display: "flex",
							height: "20px",
							justifyContent: "space-between",
							alignItems: "start",
						}}
					>
						<Card.Title>Create new Battle</Card.Title>
						<svg
							onClick={handleClose}
							style={{ height: "20px", cursor: "pointer" }}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 352 512"
						>
							<path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
						</svg>
					</div>
					<hr />

					<h6>Boxes</h6>
					<$BoxCards>
						{boxes.map((box, i) => {
							return (
								<>
									{/*<Card
										key={i}
										onClick={() => {
											handleAddBox(box);
										}}
										style={{
											width: "150px",
											height: "200px",
											cursor: "pointer",
										}}
									>
										<Card.Body
											style={{
												display: "flex",
												flexDirection: "column",
												justifyContent: "space-between",
												alignItems: "center",
											}}
										>
											<div
												style={{
													display: "flex",
													flex: 1,
													flexDirection: "column",
													justifyContent: "center",
												}}
											>
												<div>
													<img height="60px" src={box.iconUrl} />
												</div>

												<div>{box.name}</div>
											</div>
											<div
												style={{
													backgroundColor: "green",
													color: "white",
													fontWeight: "bold",
													display: "flex",
													width: "100%",
													justifyContent: "center",
													padding: "5px",
												}}
											>
												{box.cost / 100}
											</div>
										</Card.Body>
											</Card>*/}
									<BoxCard
										key={i}
										name={box.name}
										iconUrl={box.iconUrl}
										cost={box.cost}
										addBox={() => {
											handleAddBox(box);
										}}
										removeBox={() => {
											let temp = [...addedBoxes];
											const clone = structuredClone(box);
											clone.amount = 1;

											let obj = temp.find((o) => o.id === box.id);
											if (obj) {
												obj.amount = parseInt(obj.amount) - 1;
											} else {
												temp.push(clone);
											}

											setAddedBoxes(temp);

											if (obj.amount <= 0) {
												let copy = [...addedBoxes];
												copy = copy.filter(function (obj) {
													return obj.id !== box.id;
												});

												setAddedBoxes(copy);
											}
										}}
										added={addedBoxes.find((addedBox) => {
											return addedBox.id === box.id;
										})}
										amount={
											addedBoxes.find((addedBox) => {
												return addedBox.id === box.id;
											})
												? addedBoxes.find((addedBox) => {
														return addedBox.id === box.id;
												  }).amount
												: 0
										}
										variant="additive"
									/>
								</>
							);
						})}
					</$BoxCards>

					<div style={{ marginTop: "25px" }} />

					{/*<h6>Added Boxes</h6>
					<table style={{ width: "100%", marginTop: "5px" }}>
						<tbody>
							<tr>
								<th>Box</th>
								<th>Amount</th>
								<th>Remove</th>
							</tr>
							{addedBoxes.map((box, i) => {
								return (
									<tr key={i}>
										<td style={{ width: "80%" }}>
											<img height="20px" src={box.iconUrl} />
											{box.name}
										</td>
										<td>
											<input
												style={{ width: "100px" }}
												type="number"
												value={box.amount}
												onChange={(e) => {
													let value = e.target.value;

													let copy = [...addedBoxes];
													let obj = copy.find((o) => o.id === box.id);
													obj.amount = value;

													setAddedBoxes(copy);
												}}
											/>
										</td>
										<td>
											<Button
												variant="danger"
												size="sm"
												onClick={() => {
													let copy = [...addedBoxes];
													copy = copy.filter(function (obj) {
														return obj.id !== box.id;
													});

													setAddedBoxes(copy);
												}}
											>
												Remove
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
						</table>*/}

					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />

					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<div>
							<div className="product__details__option__size">
								<span>Players:</span>
								<label className={`${players == 2 && "active"}`}>
									2
									<input
										type="radio"
										id="xxl"
										onClick={(e) => {
											setPlayers(2);
										}}
									/>
								</label>
								<label className={`${players == 3 && "active"}`}>
									3
									<input
										type="radio"
										id="xl"
										onClick={(e) => {
											setPlayers(3);
										}}
									/>
								</label>
								<label className={`${players == 4 && "active"}`}>
									4
									<input
										type="radio"
										id="l"
										onClick={(e) => {
											setPlayers(4);
										}}
									/>
								</label>
							</div>
						</div>
						<div
							onClick={createBattle}
							style={{ cursor: "pointer", zoom: 0.85 }}
							className="primary-btn"
						>
							Create Battle For{" "}
							{addedBoxes.reduce((a, b) => +a + +(b.cost * b.amount), 0) / 100}
						</div>
					</div>
				</Modal.Body>
			</Modal>

			<br />
			<br />
			<br />
		</>
	);
};

const $BoxCards = styled(motion.div)`
	display: grid;
	grid-gap: 16px;
	grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
	position: relative;
`;

export default Battles;
