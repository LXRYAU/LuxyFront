import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { SocketContext } from "../../context/socketcontext";

const Unbox = () => {
	const socket = useContext(SocketContext);
	const [id, setId] = useState(0);
	const [box, setBox] = useState({});
	const [rolled, setRolled] = useState(false);

	const [fastMode, setFastMode] = useState(false);
	const [openCount, setOpenCount] = useState([" "]);
	const [animItems, setAnimItems] = useState([]);

	const [unboxingLoading, setUnboxingLoading] = useState(false);

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

	const unbox = () => {
		setUnboxingLoading(true);
		socket.emit("boxes:unbox", { id: id, amount: openCount.length }, (res) => {
			setUnboxingLoading(false);
			if (res.status == true) {
				let temp = [...animItems];
				setAnimItems([
					shuffle(temp[0]),
					shuffle(temp[1]),
					shuffle(temp[2]),
					shuffle(temp[3]),
					shuffle(temp),
				]);
				res.rolls.forEach((roll, i) => {
					temp[i][86].icon = roll.item.icon;
				});
				setAnimItems(temp);

				setRolled(false);

				setTimeout(() => {
					setRolled(true);

					/*setTimeout(() => {
                        console.log("Winnings:")
                        res.rolls.forEach((roll, i) => {
                            console.log(roll.item.name);
                        })
                    }, 9000)*/
				}, 500);
			}
		});
	};

	useEffect(() => {
		let id = parseInt(window.location.pathname.split("/")[2]);
		setId(id);

		socket.emit("boxes:details", { id: id }, (res) => {
			res.slots.sort(function (a, b) {
				return parseInt(b.item.value) - parseInt(a.item.value);
			});

			setBox(res);

			let temp = [];
			res.slots.forEach((slot) => {
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
			//temp = shuffle(temp);

			setAnimItems([
				shuffle(temp),
				shuffle(temp),
				shuffle(temp),
				shuffle(temp),
				shuffle(temp),
			]);
			//setAnimItems(temp);
		});
	}, [socket]);

	return (
		<div>
			<section className="shop-details">
				<div style={{ marginBottom: "75px" }} className="product__details__pic">
					<div className="container">
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "5px",
								alignItems: "center",
							}}
						>
							<div
								style={{ display: "flex", alignItems: "center", gap: "10px" }}
							></div>

							<Link href="/account">
								<div
									style={{
										cursor: "pointer",
										display: "flex",
										justifyContent: "end",
										alignItems: "center",
										marginBottom: "5px",
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="-1 -1 20 20"
										fill="none"
										className="_MYLDlgEUiByZN_J2e_0ZP _uyr6_5XUjxfBgeKrbRhGQ _3Il0MbLFojyenWv84ye339"
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
							</Link>
						</div>
					</div>
					<div className="row">
						{openCount.map((el, ii) => {
							return (
								<div
									key={ii}
									style={{
										position: "relative",
										width: "100%",
										backgroundColor: "transparent",
										borderRadius: "5px",
										height: "150px",
										overflow: "hidden",
									}}
								>
									<div
										style={{
											height: "100%",
											width: "5px",
											position: "absolute",
											backgroundColor: "black",
											zIndex: 99,
											left: "50%",
											transform: "translate(-50%, -0)",
										}}
									/>
									<motion.div
										animate={{ x: rolled ? -6050 : 6040 }}
										transition={{
											ease: [0.56, 0.18, 0.16, 0.99],
											duration: rolled ? (fastMode ? 2 : 9) : 0,
										}}
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
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
															backgroundColor: "#e9e8e4",
															height: "175px",
															minWidth: "150px",
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
														}}
													>
														<img
															style={{
																maxHeight: "125px",
																maxWidth: "125px",
															}}
															src={`https://community.akamai.steamstatic.com/economy/image/${item.icon}/360x360`}
														/>
													</div>
												);
											})}
									</motion.div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="product__details__content">
					<div className="container">
						<div className="row d-flex justify-content-center">
							<div className="col-lg-8">
								<div className="product__details__text">
									<h5 style={{ fontWeight: 500 }}>{box.name}</h5>
									<h3>${(box.cost / 100).toFixed(2)}</h3>
									<div className="product__details__cart__option">
										<div className="quantity">
											<div className="pro-qty">
												<input
													type="text"
													value={openCount.length}
													onChange={(e) => {
														setOpenCount(
															new Array(parseInt(e.target.value)).fill(" ")
														);
													}}
												/>
											</div>
										</div>
										<div
											onClick={unbox}
											style={{ cursor: "pointer" }}
											className="primary-btn"
										>
											Open Box
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section style={{ marginTop: "75px" }} className="related">
				<div className="container">
					<div className="product__details__text">
						<div class="product__details__last__option">
							<h5>
								<span>Box Items</span>
							</h5>
						</div>
					</div>
					<div className="row">
						{box.slots && (
							<>
								{box.slots.map((slot, i) => {
									let item = slot.item;

									return (
										<div
											key={i}
											className="col-lg-3 col-md-6 col-sm-6 col-sm-6"
										>
											<div
												className="product__item"
												style={{ overflow: "hidden" }}
											>
												<motion.div className="product__item__pic set-bg">
													<span className="label">
														{(slot.rollEnd - slot.rollStart) / 1000}%
													</span>
													<div
														style={{
															position: "absolute",
															height: "100%",
															width: "100%",
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
														}}
													>
														<motion.img
															whileHover={{
																y: [0, -5],
															}}
															style={{ height: "70%", cursor: "pointer" }}
															draggable="false"
															src={`https://community.akamai.steamstatic.com/economy/image/${item.icon}/360x360`}
														/>
													</div>
												</motion.div>
												<div className="product__item__text">
													<small style={{ fontWeight: 500 }}>{item.wear}</small>
													<h5 style={{ fontSize: "15px" }}>
														{item.gunType} {item.color}
													</h5>
													<h5>${(item.value / 100).toFixed(2)}</h5>
												</div>
											</div>
										</div>
									);
								})}
							</>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Unbox;
