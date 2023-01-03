import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { SocketContext } from "../../context/socketcontext";
import CountUp from "react-countup";
import { Shake } from "reshake";
import { UserContext } from "../../context/usercontext";
import BattleFairness from "../../components/battles/battlefairness";

const Battle = () => {
	const user = useContext(UserContext);
	const socket = useContext(SocketContext);
	const [id, setId] = useState(0);

	const [battle, setBattle] = useState(null);
	const [animItems, setAnimItems] = useState([]);
	const [rolled, setRolled] = useState(false);

	const [showModal, setShowModal] = useState(false);

	const shuffle = (arr) => {
		return arr.reduce(
			(newArr, _, i) => {
				var rand = i + Math.floor(Math.random() * (newArr.length - i));
				[newArr[rand], newArr[i]] = [newArr[i], newArr[rand]];
				return newArr;
			},
			[...arr]
		);
	};

	const handleJoin = () => {
		socket.emit("battles:join", { id: id }, (res) => {
			console.log(res);
		});
	};

	const handleCallBot = () => {
		socket.emit("battles:callBot", { id: id }, (res) => {
			console.log(res);
		});
	};

	useEffect(() => {
		let id = parseInt(window.location.pathname.split("/")[2]);
		setId(id);

		socket.emit("room:join", { room: `battle-${id}` });

		socket.emit("battles:details", { id: id }, (res) => {
			setBattle(res);
			console.log(res);
		});

		socket.on("battle:playerJoined", (msg) => {
			if (msg.battle.id != id) return;

			console.log("playerJoined");
			setBattle(msg.battle);
		});

		socket.on("battle:status", (msg) => {
			if (msg.battle.id != id) return;

			console.log("status");
		});

		socket.on("battle:roll", (msg) => {
			if (msg.battle.id != id) return;

			console.log("roll");
			let temp = [];

			msg.battle.boxes[msg.battle.currentBox].slots.forEach((slot) => {
				let chance = (slot.rollEnd - slot.rollStart) / 1000;
				chance = parseInt(chance);
				if (chance <= 1) {
					chance = 1;
				}
				for (var i = 0; i < chance; i++) {
					temp.push({
						name: slot.item.name,
						icon: slot.item.icon,
					});
				}
			});
			console.log(temp);
			temp = [shuffle(temp), shuffle(temp), shuffle(temp), shuffle(temp)];

			msg.rolls.forEach((roll, i) => {
				if (msg.battle.maxPlayers == 2) {
					temp[i][75].icon = roll.item.icon;
				} else if (msg.battle.maxPlayers == 3) {
					temp[i][75].icon = roll.item.icon;
				} else if (msg.battle.maxPlayers == 4) {
					temp[i][75].icon = roll.item.icon;
				}
			});
			setAnimItems(temp);

			setRolled(false);

			setTimeout(() => {
				setRolled(true);
			}, 500);

			setTimeout(() => {
				setBattle(msg.battle);
			}, 9500);
		});

		socket.on("battle:nextBox", (msg) => {
			if (msg.battle.id != id) return;

			console.log("nextBox");
			console.log(msg.battle.currentBox);
			//setAnimItems([], [], [], []);
			setBattle(msg.battle);
		});

		socket.on("battle:ended", (msg) => {
			if (msg.battle.id != id) return;

			console.log(msg);
			setBattle(msg.battle);
		});

		return () => {
			socket.off("battle:playerJoined");
			socket.off("battle:status");
			socket.off("battle:roll");
			socket.off("battle:nextBox");
			socket.off("battle:ended");

			socket.emit("room:leave", { room: `battle-${id}` });
		};
	}, [socket]);

	return (
		<div>
			{battle && (
				<>
					<div
						style={{
							backgroundColor: "#F3F2EE",
							marginTop: "50px",
							padding: "25px",
							height: "700px",
						}}
					>
						<div
							className="container"
							style={{
								position: "relative",
								display: "flex",
								flexDirection: "column",
								height: "100%",
							}}
						>
							<div
								onClick={() => {
									setShowModal(true);
								}}
								style={{
									position: "absolute",
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									marginBottom: "5px",
									right: "0",
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="-1 -1 20 20"
									fill="none"
									class="_MYLDlgEUiByZN_J2e_0ZP _uyr6_5XUjxfBgeKrbRhGQ _3Il0MbLFojyenWv84ye339"
									preserveAspectRatio="xMidYMid slice"
									focusable="false"
									role="presentation"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M9 0L2.83725 2.1195C2.6707 2.15652 2.52176 2.24922 2.41499 2.3823C2.30823 2.51538 2.25003 2.68089 2.25 2.8515V10.3425C2.25018 11.0832 2.43318 11.8124 2.78276 12.4653C3.13235 13.1183 3.63771 13.6749 4.254 14.0858L9 17.25L13.746 14.0858C14.3624 13.6749 14.8678 13.1181 15.2174 12.465C15.567 11.8119 15.7499 11.0826 15.75 10.3417V2.8515C15.75 2.68089 15.6918 2.51538 15.585 2.3823C15.4782 2.24922 15.3293 2.15652 15.1627 2.1195L9 0ZM13.125 6.41656L7.96921 11L4.875 8.24968L5.90616 7.33312L7.96921 9.16688L12.0938 5.5L13.125 6.41656Z"
										fill="green"
									></path>
								</svg>
								<div style={{ marginBottom: "2px" }}>Fair Game</div>
							</div>

							<div
								style={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								<div style={{ position: "relative" }}>
									<motion.div
										style={{
											display: "flex",
											height: "100%",
											alignItems: "center",
											gap: "15px",
										}}
									>
										{battle.boxes.map((box, i) => {
											return (
												<div
													key={i}
													style={{
														display: "flex",
														position: "relative",
														flexDirection: "column",
														justifyContent: "center",
														alignItems: "center",
														gap: "5px",
													}}
												>
													<motion.div
														animate={{
															scale: battle.currentBox == i ? 1.15 : 1,
														}}
														transition={{
															duration: 0.5,
														}}
													>
														<motion.img
															animate={{
																y: battle.currentBox == i ? [0, -3, 0] : 0,
															}}
															transition={{
																repeat: Infinity,
																duration: battle.currentBox == i ? 2 : 0,
																delay: battle.currentBox == i ? 0.5 : 0,
															}}
															width="60px"
															src={box.iconUrl}
														/>
													</motion.div>

													{battle.currentBox == i && (
														<motion.div
															layoutId="indicator"
															style={{
																position: "absolute",
																bottom: "0px",
																left: "22px",
																color: "white",
																fontSize: "20px",
																lineHeight: "17px",
															}}
														>
															&#9650;
														</motion.div>
													)}
												</div>
											);
										})}
									</motion.div>
								</div>
							</div>
							<div
								style={{
									display: "flex",
									gap: "25px",
								}}
							>
								{new Array(battle.maxPlayers).fill(" ").map((player, ii) => {
									return (
										<div key={ii} style={{ flex: 1, width: "0px" }}>
											<div
												style={{
													position: "relative",
													maxWidth: "100%",
													borderRadius: "5px",
													overflow: "hidden",
													height: "585px",
													maxHeight: "585px",
												}}
											>
												{(battle.status == "lobby" ||
													battle.status == "in-progress") && (
													<>
														<div
															style={{
																height: "5px",
																position: "absolute",
																zIndex: 99,
																top: "50%",
																left: "50%",
																transform: "translate(-50%, -50%)",
																width: "35%",
																color: "#EAE9E4",
																fontSize: "30px",
															}}
														>
															<div
																style={{
																	position: "absolute",
																	bottom: "0px",
																	left: "0",
																	top: "0",
																	lineHeight: "17px",
																	transform: "rotate(90deg)",
																}}
															>
																&#9650;
															</div>
															<div
																style={{
																	position: "absolute",
																	bottom: "0px",
																	right: "0",
																	top: "0",
																	lineHeight: "17px",
																	transform: "rotate(-90deg)",
																}}
															>
																&#9650;
															</div>
														</div>
														<motion.div
															animate={{ y: rolled ? -10650 : -645 }}
															transition={{
																ease: [0.56, 0.18, 0.16, 0.99],
																duration: rolled ? 9 : 0,
															}}
															style={{
																display: "flex",
																flexDirection: "column",
																alignItems: "center",
																height: "100%",
																gap: "5px",
															}}
														>
															{animItems[ii] &&
																animItems[ii].map((item, i) => {
																	return (
																		<div
																			key={i}
																			style={{
																				minHeight: "140px",
																				minWidth: "140px",
																				display: "flex",
																				alignItems: "center",
																				justifyContent: "center",
																			}}
																		>
																			<img
																				style={{
																					maxHeight: "140px",
																				}}
																				src={`https://community.akamai.steamstatic.com/economy/image/${item.icon}/360x360`}
																			/>
																		</div>
																	);
																})}
														</motion.div>
													</>
												)}
												{battle.status == "ended" && battle.players[ii] && (
													<>
														<div
															style={{
																color:
																	battle.winner.sid == battle.players[ii].sid
																		? "green"
																		: "red",
																fontSize: "30px",
																fontWeight: "bold",
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																height: "100%",
															}}
														>
															<motion.div
																initial={{ opacity: 0.25, scale: 0.5 }}
																animate={{ opacity: 1, scale: 1.2 }}
																transition={{
																	duration: 5,
																}}
															>
																<Shake
																	h={5}
																	v={5}
																	r={3}
																	dur={300}
																	int={20}
																	max={100}
																	fixed={true}
																	fixedStop={true}
																	freez={false}
																>
																	<CountUp
																		start={0}
																		end={battle.players[ii].totalValue / 100}
																		decimals={2}
																		duration={4.7}
																	/>
																</Shake>
															</motion.div>
														</div>
													</>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>

					<div className="container">
						<div style={{ display: "flex", gap: "25px" }}>
							{new Array(battle.maxPlayers).fill(" ").map((player, ii) => {
								return (
									<div key={ii} style={{ flex: 1, width: "0px" }}>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												marginTop: "-15px",
												gap: "10px",
											}}
										>
											<img
												width="30px"
												height="30px"
												style={{
													display: battle.players[ii] ? "block" : "none",
													borderRadius: "100%",
												}}
												src={
													battle.players[ii]
														? battle.players[ii].user.avatar
														: "https://www.solidbackgrounds.com/images/2560x1600/2560x1600-dark-gray-solid-color-background.jpg"
												}
											/>
											<div style={{ marginTop: "-5px" }}>
												{battle.players[ii] ? (
													battle.players[ii].user.displayName
												) : (
													<>
														{user && (
															<>
																{user.id != battle.players[0].user.id && (
																	<button
																		style={{ zoom: 0.75 }}
																		onClick={handleCallBot}
																		className="site-btn"
																	>
																		Join Battle
																	</button>
																)}
																{user.id == battle.players[0].user.id && (
																	<button
																		style={{ zoom: 0.75 }}
																		onClick={handleCallBot}
																		className="site-btn"
																	>
																		Call Bot
																	</button>
																)}
															</>
														)}
													</>
												)}
											</div>
										</div>

										<div
											style={{
												marginTop: "25px",
												display: "flex",
												gap: "5px",
												flexWrap: "wrap",
											}}
										>
											{battle.players[ii] &&
												battle.players[ii].items.map((item, i) => {
													return (
														<div
															key={i}
															style={{
																zoom: 0.8,
																minWidth: "160px",
																width: "160px",
																minHeight: "250px",
																height: "250px",
																backgroundColor: "#F3F2EE",
																borderRadius: "5px",
															}}
														>
															<Card.Body
																style={{
																	display: "flex",
																	flexDirection: "column",
																	justifyContent: "space-between",
																	height: "100%",
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
																		<b style={{ fontSize: "11px" }}>
																			{item.gunType}
																		</b>
																	</div>
																	<div>{item.color}</div>
																	<div>({item.wear})</div>
																</div>

																<div
																	style={{
																		backgroundColor: "white",
																		color: "black",
																		fontWeight: "bold",
																		display: "flex",
																		justifyContent: "center",
																		padding: "5px",
																	}}
																>
																	${item.value / 100}
																</div>
															</Card.Body>
														</div>
													);
												})}
										</div>
									</div>
								);
							})}
						</div>
					</div>

					<BattleFairness
						battle={battle}
						showModal={showModal}
						setShowModal={setShowModal}
					/>
				</>
			)}
			<br /> <br /> <br /> <br /> <br /> <br /> <br />
		</div>
	);
};

export default Battle;
