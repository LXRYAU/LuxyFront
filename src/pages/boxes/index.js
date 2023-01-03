import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { SocketContext } from "../../context/socketcontext";
import { motion } from "framer-motion";

const Boxes = () => {
	const [boxes, setBoxes] = useState([]);
	const socket = useContext(SocketContext);

	useEffect(() => {
		socket.emit("boxes:list", { page: 1, perPage: 8 }, (res) => {
			console.log("done");
			setBoxes(res);
		});
	}, [socket]);
	return (
		<div>
			<div
				style={{
					marginTop: "-124px",
					backgroundImage: "url(img/hero/hero.png)",
					backgroundSize: "1850px",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "top",
					backgroundColor: "#F3F2EE",
					height: "600px",
					paddingTop: "100px",
				}}
			>
				<div className="container">
					<div className="row">
						<div className="col-xl-5 col-lg-7 col-md-8">
							<div className="hero__text">
								<h2>Supercharge your Shopping with mystery boxes</h2>
								<p>
									Discover and unbox luxury products at exclusive prices on the
									world’s most entertaining shopping platform.
								</p>
								<div className="primary-btn">
									How it works <span className="arrow_right"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container" style={{ marginTop: "50px" }}>
				<div className="row">
					<div className="col-lg-12">
						<ul
							className="filter__controls"
							style={{ textAlign: "left", paddingLeft: "0px" }}
						>
							<li className="active">Featured</li>
							<li>Hot</li>
							<li>50/50</li>
							<li>High Risk</li>
						</ul>
					</div>
				</div>
				<div className="row product__filter">
					<Link href={`/boxes/1}`}>
						<div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
							<div className="product__item">
								<div className="product__item__pic">
									<span className="label">New</span>
									<motion.div
										style={{
											position: "absolute",
											top: 0,
											top: "-23px",
											cursor: "pointer",
										}}
										whileHover={{
											scale: 1.1,
											rotate: "10deg",
										}}
										whileTap={{
											scale: 0.9,
										}}
									>
										<img
											draggable="false"
											src="https://aklzyovimo.cloudimg.io/v7/_content_/images/uploads/1649182112998.png"
										/>
									</motion.div>
								</div>
								<div className="product__item__text">
									<h6>Hype Shoes</h6>
									<a href="#" className="add-cart">
										View Box
									</a>
									<h5>$67.24</h5>
								</div>
							</div>
						</div>
					</Link>
					<Link href={`/boxes/1}`}>
						<div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
							<div className="product__item">
								<div className="product__item__pic">
									<motion.div
										style={{
											position: "absolute",
											top: 0,
											top: "-23px",
											cursor: "pointer",
										}}
										whileHover={{
											scale: 1.1,
											rotate: "10deg",
										}}
										whileTap={{
											scale: 0.9,
										}}
									>
										<img
											draggable="false"
											src="https://aklzyovimo.cloudimg.io/v7/_content_/images/uploads/1649182146889.png"
										/>
									</motion.div>
								</div>
								<div className="product__item__text">
									<h6>Pokemon Premium</h6>
									<a href="#" className="add-cart">
										View Box
									</a>
									<h5>$67.24</h5>
								</div>
							</div>
						</div>
					</Link>
					<Link href={`/boxes/1}`}>
						<div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
							<div className="product__item sale">
								<div className="product__item__pic">
									<span className="label" style={{ zIndex: 99 }}>
										SALE
									</span>
									<motion.div
										style={{
											position: "absolute",
											top: 0,
											top: "-23px",
											cursor: "pointer",
										}}
										whileHover={{
											scale: 1.1,
											rotate: "10deg",
										}}
										whileTap={{
											scale: 0.9,
										}}
									>
										<img
											draggable="false"
											src="https://aklzyovimo.cloudimg.io/v7/_content_/images/uploads/1660474279847.png"
										/>
									</motion.div>
								</div>
								<div className="product__item__text">
									<h6>BEARBRICK</h6>
									<a href="#" className="add-cart">
										View Box
									</a>
									<h5>$43.48</h5>
								</div>
							</div>
						</div>
					</Link>
					<Link href={`/boxes/1}`}>
						<div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
							<div className="product__item">
								<div className="product__item__pic set-bg">
									<motion.div
										style={{
											position: "absolute",
											top: 0,
											top: "-23px",
											cursor: "pointer",
										}}
										whileHover={{
											scale: 1.1,
											rotate: "10deg",
										}}
										whileTap={{
											scale: 0.9,
										}}
									>
										<img
											draggable="false"
											src="https://aklzyovimo.cloudimg.io/v7/_content_/images/uploads/1649182136899.png"
										/>
									</motion.div>
								</div>
								<div className="product__item__text">
									<h6>OFF-WHITE</h6>
									<a href="#" className="add-cart">
										View Box
									</a>
									<h5>$60.9</h5>
								</div>
							</div>
						</div>
					</Link>
					<Link href={`/boxes/1}`}>
						<div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
							<div className="product__item">
								<div className="product__item__pic set-bg">
									<motion.div
										style={{
											position: "absolute",
											top: 0,
											top: "-23px",
											cursor: "pointer",
										}}
										whileHover={{
											scale: 1.1,
											rotate: "10deg",
										}}
										whileTap={{
											scale: 0.9,
										}}
									>
										<img
											draggable="false"
											src="https://aklzyovimo.cloudimg.io/v7/_content_/images/uploads/1649182123642.png"
										/>
									</motion.div>
								</div>
								<div className="product__item__text">
									<h6>KAWS</h6>
									<a href="#" className="add-cart">
										View Box
									</a>
									<h5>$31.37</h5>
								</div>
							</div>
						</div>
					</Link>
					<Link href={`/boxes/1}`}>
						<div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
							<div className="product__item sale">
								<div className="product__item__pic set-bg">
									<span className="label" style={{ zIndex: 99 }}>
										SALE
									</span>
									<motion.div
										style={{
											position: "absolute",
											top: 0,
											top: "-23px",
											cursor: "pointer",
										}}
										whileHover={{
											scale: 1.1,
											rotate: "10deg",
										}}
										whileTap={{
											scale: 0.9,
										}}
									>
										<img
											draggable="false"
											src="https://aklzyovimo.cloudimg.io/v7/_content_/images/uploads/1651406938902.png"
										/>
									</motion.div>
								</div>
								<div className="product__item__text">
									<h6>LEGO</h6>
									<a href="#" className="add-cart">
										View Box
									</a>
									<h5>$98.49</h5>
								</div>
							</div>
						</div>
					</Link>
					<Link href={`/boxes/1}`}>
						<div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
							<div className="product__item">
								<div className="product__item__pic set-bg">
									<motion.div
										style={{
											position: "absolute",
											top: 0,
											top: "-23px",
											cursor: "pointer",
										}}
										whileHover={{
											scale: 1.1,
											rotate: "10deg",
										}}
										whileTap={{
											scale: 0.9,
										}}
									>
										<img
											draggable="false"
											src="https://aklzyovimo.cloudimg.io/v7/_content_/images/uploads/1657462075553.png"
										/>
									</motion.div>
								</div>
								<div className="product__item__text">
									<h6>LV Lite</h6>
									<a href="#" className="add-cart">
										View Box
									</a>
									<h5>$49.66</h5>
								</div>
							</div>
						</div>
					</Link>
					<Link href={`/boxes/1}`}>
						<div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
							<div className="product__item">
								<div className="product__item__pic set-bg">
									<motion.div
										style={{
											position: "absolute",
											top: 0,
											top: "-23px",
											cursor: "pointer",
										}}
										whileHover={{
											scale: 1.1,
											rotate: "10deg",
										}}
										whileTap={{
											scale: 0.9,
										}}
									>
										<img
											draggable="false"
											src="https://aklzyovimo.cloudimg.io/v7/_content_/images/uploads/1649182171486.png"
										/>
									</motion.div>
								</div>
								<div className="product__item__text">
									<h6>Switch</h6>
									<a href="#" className="add-cart">
										View Box
									</a>
									<h5>$26.28</h5>
								</div>
							</div>
						</div>
					</Link>
					<Link href={`/boxes/1}`}>
						<div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
							<div className="product__item">
								<div className="product__item__pic set-bg">
									<motion.div
										style={{
											position: "absolute",
											top: 0,
											top: "-23px",
											cursor: "pointer",
										}}
										whileHover={{
											scale: 1.1,
											rotate: "10deg",
										}}
										whileTap={{
											scale: 0.9,
										}}
									>
										<img
											draggable="false"
											src="https://aklzyovimo.cloudimg.io/v7/_content_/images/uploads/1649182115981.png"
										/>
									</motion.div>
								</div>
								<div className="product__item__text">
									<h6>Hypebeast</h6>
									<a href="#" className="add-cart">
										View Box
									</a>
									<h5>$26.28</h5>
								</div>
							</div>
						</div>
					</Link>
					<Link href={`/boxes/1}`}>
						<div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
							<div className="product__item">
								<div className="product__item__pic set-bg">
									<motion.div
										style={{
											position: "absolute",
											top: 0,
											top: "-23px",
											cursor: "pointer",
										}}
										whileHover={{
											scale: 1.1,
											rotate: "10deg",
										}}
										whileTap={{
											scale: 0.9,
										}}
									>
										<img
											draggable="false"
											src="https://aklzyovimo.cloudimg.io/v7/_content_/images/uploads/1661422292182.png"
										/>
									</motion.div>
								</div>
								<div className="product__item__text">
									<h6>Autumn</h6>
									<a href="#" className="add-cart">
										View Box
									</a>
									<h5>$26.28</h5>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>

			{/*<div className="container" style={{ marginTop: "100px" }}>
				<div style={{ display: "flex", gap: "25px" }}>
					{boxes.map((box, i) => {
						return (
							<Link key={i} href={`/boxes/${box.id}`}>
								<Card
									key={i}
									style={{ width: "150px", height: "200px", cursor: "pointer" }}
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
								</Card>
							</Link>
						);
					})}
				</div>
			</div>*/}
		</div>
	);
};

export default Boxes;
