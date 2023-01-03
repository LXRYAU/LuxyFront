import styled from "@emotion/styled";
import Link from "next/link";
import { UserContext } from "../context/usercontext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
	const user = useContext(UserContext);
	const router = useRouter();

	const route = router.pathname.split("/")[1].split("/")[0];

	return (
		<$Navbar>
			<header className="header">
				<div className="header__top">
					<div className="container">
						<div className="row">
							<div className="col-lg-6 col-md-7">
								<div className="header__top__left">
									<p>The worlds most entertaining shopping platform.</p>
								</div>
							</div>
							<div className="col-lg-6 col-md-5">
								<div className="header__top__right">
									<div className="header__top__links">
										<a href="#">Provably Fair</a>
										<a href="#">FAQ</a>
									</div>
									<div className="header__top__hover">
										<span>
											Usd <i className="arrow_carrot-down"></i>
										</span>
										<ul>
											<li>USD</li>
											<li>EUR</li>
											<li>USD</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-3">
							<div style={{ cursor: "pointer" }} className="header__logo">
								<Link href="/boxes">
									<img src="/img/logo.png" alt="" />
								</Link>
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
							<nav className="header__menu mobile-menu">
								<ul>
									<li className={`${route == "boxes" && "active"}`}>
										<Link href="/boxes">Boxes</Link>
									</li>
									<li className={`${route == "battles" && "active"}`}>
										<Link href="/battles">Battles</Link>
									</li>
									<li className={`${route == "affiliates" && "active"}`}>
										<Link href="/affiliates">Affiliates</Link>
									</li>
									<li className={`${route == "rewards" && "active"}`}>
										<Link href="/rewards">Rewards</Link>
									</li>
								</ul>
							</nav>
						</div>

						{!user && (
							<>
								<div className="col-lg-3 col-md-3">
									<div style={{ zoom: "0.8" }} className="header__nav__option">
										<a href="http://localhost:7777/auth/steam">
											<div
												style={{ background: "none", color: "black" }}
												className="primary-btn"
											>
												Login
											</div>
										</a>

										<a href="http://localhost:7777/auth/steam">
											<div
												style={{
													background: "none",
													color: "black",
													border: "2px solid black",
												}}
												className="primary-btn"
											>
												Register
											</div>
										</a>
									</div>
								</div>
							</>
						)}

						{user && (
							<div className="col-lg-3 col-md-3">
								<div style={{ zoom: "0.8" }} className="header__nav__option">
									<div
										style={{
											display: "flex",
											gap: "15px",
											alignItems: "center",
											justifyContent: "end",
										}}
									>
										<Link href="/inventory">
											<div
												style={{
													cursor: "pointer",
													display: "flex",
													backgroundColor: "transparent",
													border: "2px solid #bebebe",
													color: "#bebebe",
													fontWeight: "bold",
													padding: "0px 15px 1px 15px",
													borderRadius: "50px",
												}}
											>
												${user.balance / 100}
											</div>
										</Link>

										<Link href="/account">
											<div
												style={{
													cursor: "pointer",
													display: "flex",
													gap: "5px",
													alignItems: "center",
												}}
											>
												<img
													style={{ borderRadius: "100%" }}
													src={user.avatar}
												/>
												<div>{user.displayName}</div>
											</div>
										</Link>
									</div>
								</div>
							</div>
						)}
					</div>
					<div className="canvas__open">
						<i className="fa fa-bars"></i>
					</div>
				</div>
			</header>
		</$Navbar>
	);
};

const $Navbar = styled.div``;

export default Navbar;
