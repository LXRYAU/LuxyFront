import { motion } from "framer-motion";
import Link from "next/link";
import { handleClientScriptLoad } from "next/script";
import { useContext, useEffect, useState } from "react";
import { Card, Nav, Modal, Button } from "react-bootstrap";
import { SocketContext } from "../../context/socketcontext";
import { UserContext } from "../../context/usercontext";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const BattleRow = ({ pushedBattle }) => {
	const socket = useContext(SocketContext);
	const [battle, setBattle] = useState(pushedBattle);

	useEffect(() => {
		let id = battle.id;
		socket.emit("room:join", { room: `battle-${id}` });

		socket.on("battle:playerJoined", (msg) => {
			if (msg.battle.id != id) return;

			setBattle(msg.battle);
		});

		socket.on("battle:roll", (msg) => {
			if (msg.battle.id != id) return;

			setTimeout(() => {
				setBattle(msg.battle);
			}, 9500);
		});

		socket.on("battle:nextBox", (msg) => {
			if (msg.battle.id != id) return;

			setBattle(msg.battle);
		});

		socket.on("battle:ended", (msg) => {
			if (msg.battle.id != id) return;

			setBattle(msg.battle);
		});

		return () => {
			socket.off("battle:playerJoined");
			socket.off("battle:roll");
			socket.off("battle:nextBox");
			socket.off("battle:ended");
			socket.emit("room:leave", { room: `battle-${id}` });
		};
	}, [socket]);
	return (
		<Link href={"/battles/" + battle.id}>
			<$BattleRow whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
				<div
					style={{
						display: "flex",
						gap: "8px",
						flexWrap: "wrap",
						maxWidth: "100px",
					}}
				>
					{new Array(battle.maxPlayers).fill(" ").map((slot, i) => {
						const plr = battle.players[i];
						let isWinner = false;

						if (battle.status == "ended") {
							if (plr.sid == battle.winner.sid) isWinner = true;
						}

						if (plr) {
							return (
								<$Avatar
									style={{ border: isWinner ? "5px solid green" : "unset" }}
									src={plr.user.avatar}
								/>
							);
						} else {
							return <$Avatar />;
						}
					})}
				</div>

				<$Boxes>
					{battle.boxes.map((box, i) => {
						return (
							<$Box key={i}>
								<motion.div
									animate={{ scale: battle.currentBox == i ? 1.1 : 1 }}
									transition={{
										duration: 0.5,
									}}
								>
									<motion.div
										animate={{
											y: battle.currentBox == i ? [0, -3, 0] : 0,
										}}
										transition={{
											repeat: Infinity,
											duration: battle.currentBox == i ? 2 : 0,
											delay: battle.currentBox == i ? 0.5 : 0,
										}}
									>
										<$BoxThumb src={box.iconUrl} />
									</motion.div>
								</motion.div>

								{battle.currentBox == i && (
									<motion.div
										layoutId={`indicator-${battle.id}`}
										style={{
											position: "absolute",
											bottom: "-8px",
											left: "44px",
											color: "black",
											fontSize: "15px",
											lineHeight: "17px",
										}}
									>
										&#9650;
									</motion.div>
								)}
							</$Box>
						);
					})}
				</$Boxes>

				<$BattleAmount status={battle.status}>
					$
					{battle.status == "ended"
						? battle.players.reduce((a, b) => +a + +b.totalValue, 0) / 100
						: battle.boxes.reduce((a, b) => +a + +b.cost, 0) / 100}
				</$BattleAmount>

				<div className="primary-btn">Go TO</div>
			</$BattleRow>
		</Link>
	);
};

const $BattleRow = styled(motion.div)`
	cursor: pointer;
	display: flex;
	background-color: #f3f2ee;
	gap: 20px;
	align-items: center;
	padding: 25px;
	border-radius: 5px;

	${(props) =>
		props.crazyMode &&
		css(`
			background-image: url(/img/crazymode.png);
			background-position: right;
			background-size: contain;
			background-repeat: no-repeat;
		`)}
`;

const $Avatar = styled.div`
	height: 40px;
	width: 40px;
	background-color: white;
	background-image: url(${(props) => props.src});
	background-size: cover;
	background-position: center;
	border-radius: 100%;
`;

const $Boxes = styled.div`
	background-color: #eae9e4;
	flex: 1;
	height: 100%;
	display: flex;
	align-items: center;
	padding: 10px;
	gap: 10px;
	overflow-x: hidden;
	border-radius: 5px;
`;
const $Box = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 5px;
	min-width: 60px;
	background-color: #f3f2ee;
	border-radius: 5px;
`;
const $BoxAmount = styled.div`
	position: absolute;
	top: 0px;
	right: 0px;
	height: 15px;
	width: 15px;
	background-color: #d6d6d6;
	border-radius: 100%;
	font-size: 12px;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const $BoxThumb = styled.img`
	height: 100px;
`;
const $BoxLabel = styled.div`
	color: white;
	font-weight: bold;
	font-size: 10px;
`;

const $BattleAmount = styled.div`
	width: 50px;
	display: flex;
	justify-content: center;
	font-weight: bold;
	color: ${(props) => (props.status == "ended" ? "green" : "black")};
	font-size: 18px;
`;

export default BattleRow;
