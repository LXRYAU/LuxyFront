import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useState } from "react";
import Router from "next/router";
import { css } from "@emotion/react";

const CreateBattle = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [creatingBattle, setCreatingBattle] = useState(false);

	const [battleMode, setBattleMode] = useState("regular"); // regular || team || group
	const [players, setPlayers] = useState(2);
	const [addedBoxes, setAddedBoxes] = useState([]);
	const [isPrivate, setIsPrivate] = useState(false);

	const removeBox = (box) => {
		var found = addedBoxes.find((addedBox) => {
			return addedBox.id === box.id;
		});
		if (found) {
			var temp = addedBoxes.filter((addedBox) => {
				return addedBox.id !== box.id;
			});
			box.amount -= 1;

			if (box.amount > 0) {
				setAddedBoxes([...temp, box]);
			} else {
				setAddedBoxes([...temp]);
			}
		}
	};

	const doCreateBattle = () => {
		setCreatingBattle(true);
		playBetClick();

		/* */
	};

	return (
		<$CreateBattle>
			<div className="container">
				<div>
					<div color={""}>Team Configuration</div>
					<br />
					<div color={""}>Select a game mode and the player amount</div>

					<div
						style={{
							display: "flex",
							gap: "25px",
							marginTop: "10px",
							width: "100%",
						}}
					>
						<$Card>
							<div
								style={{
									display: "flex",
									gap: "10px",
									alignItems: "center",
								}}
							>
								<svg fill={""} width="24" height="24" viewBox="0 0 24 24">
									<path
										data-v-64635c1a=""
										d="M6.2,2.44L18.1,14.34L20.22,12.22L21.63,13.63L19.16,16.1L22.34,19.28C22.73,19.67 22.73,20.3 22.34,20.69L21.63,21.4C21.24,21.79 20.61,21.79 20.22,21.4L17,18.23L14.56,20.7L13.15,19.29L15.27,17.17L3.37,5.27V2.44H6.2M15.89,10L20.63,5.26V2.44H17.8L13.06,7.18L15.89,10M10.94,15L8.11,12.13L5.9,14.34L3.78,12.22L2.37,13.63L4.84,16.1L1.66,19.29C1.27,19.68 1.27,20.31 1.66,20.7L2.37,21.41C2.76,21.8 3.39,21.8 3.78,21.41L7,18.23L9.44,20.7L10.85,19.29L8.73,17.17L10.94,15Z"
									>
										<title data-v-64635c1a="">Sword Cross icon</title>
									</path>
								</svg>
								<div weight="600" color={""}>
									REGULAR BATTLE
								</div>
							</div>

							<div style={{ marginTop: "10px" }}>
								<div
									onClick={() => {
										setBattleMode("regular");
										setPlayers(2);
									}}
									active={battleMode == "regular" && players == 2}
								>
									<div size="13px" weight="500" color={""}>
										1v1
									</div>
								</div>
								<div
									onClick={() => {
										setBattleMode("regular");
										setPlayers(3);
									}}
									active={battleMode == "regular" && players == 3}
								>
									<div size="13px" weight="500" color={""}>
										1v1v1
									</div>
								</div>
								<div
									onClick={() => {
										setBattleMode("regular");
										setPlayers(4);
									}}
									active={battleMode == "regular" && players == 4}
								>
									<div size="13px" weight="500" color={""}>
										1v1v1v1
									</div>
								</div>
							</div>
						</$Card>
						<$Card>
							<div
								style={{
									display: "flex",
									gap: "10px",
									alignItems: "center",
								}}
							>
								<svg fill={""} width="24" height="24" viewBox="0 0 24 24">
									<path
										data-v-64635c1a=""
										d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"
									>
										<title data-v-64635c1a="">Account Multiple icon</title>
									</path>
								</svg>
								<div weight="600" color={""}>
									TEAM BATTLE
								</div>
							</div>

							<div style={{ marginTop: "10px" }}>
								<div
									onClick={() => {
										setBattleMode("team");
										setPlayers(2);
									}}
									active={battleMode == "team" && players == 2}
								>
									<div size="13px" weight="500" color={""}>
										2v2
									</div>
								</div>
							</div>
						</$Card>
						<$Card>
							<div
								style={{
									display: "flex",
									gap: "10px",
									alignItems: "center",
								}}
							>
								<svg fill={""} width="24" height="24" viewBox="0 0 24 24">
									<path
										data-v-64635c1a=""
										d="M2,10.96C1.5,10.68 1.35,10.07 1.63,9.59L3.13,7C3.24,6.8 3.41,6.66 3.6,6.58L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.66,6.72 20.82,6.88 20.91,7.08L22.36,9.6C22.64,10.08 22.47,10.69 22,10.96L21,11.54V16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V10.96C2.7,11.13 2.32,11.14 2,10.96M12,4.15V4.15L12,10.85V10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V12.69L14,15.59C13.67,15.77 13.3,15.76 13,15.6V19.29L19,15.91M13.85,13.36L20.13,9.73L19.55,8.72L13.27,12.35L13.85,13.36Z"
									>
										<title data-v-64635c1a="">Package Variant icon</title>
									</path>
								</svg>
								<div weight="600" color={""}>
									GROUP UNBOX
								</div>
							</div>

							<div style={{ marginTop: "10px" }}>
								<div
									onClick={() => {
										setBattleMode("group");
										setPlayers(2);
									}}
									active={battleMode == "group" && players == 2}
								>
									<div size="13px" weight="500" color={""}>
										2p
									</div>
								</div>
								<div
									onClick={() => {
										setBattleMode("group");
										setPlayers(3);
									}}
									active={battleMode == "group" && players == 3}
								>
									<div size="13px" weight="500" color={""}>
										3p
									</div>
								</div>
								<div
									onClick={() => {
										setBattleMode("group");
										setPlayers(4);
									}}
									active={battleMode == "group" && players == 4}
								>
									<div size="13px" weight="500" color={""}>
										4p
									</div>
								</div>
							</div>
						</$Card>
					</div>
				</div>

				<div style={{ display: "flex" }}>
					<div color={""}>Add Cases</div>
					<br />
					<div color={""}>Select what cases to add</div>

					<$BoxCards>
						<$AddCard
							onClick={() => {
								setModalOpen(true);
							}}
						>
							<svg
								width="82"
								height="74"
								fill={""}
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									data-v-64635c1a=""
									d="M1.887 42a10 10 0 010-10L17.113 5.627a10 10 0 018.66-5h30.454a10 10 0 018.66 5L80.113 32a10 10 0 010 10L64.887 68.373a10 10 0 01-8.66 5H25.774a10 10 0 01-8.66-5L1.886 42z"
								></path>
							</svg>
							<span style={{ position: "absolute", marginTop: "-30px" }}>
								<svg fill={""} width="24" height="24" viewBox="0 0 24 24">
									<path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z">
										<title data-v-64635c1a="">Plus icon</title>
									</path>
								</svg>
							</span>
							<div color={""}>Add Box</div>
						</$AddCard>

						{addedBoxes.map((box, i) => {
							return <></>;
						})}
					</$BoxCards>
				</div>

				<div style={{ display: "flex" }}>
					<div color={""}>Extra Configuration</div>
					<br />
					<div color={""}>
						Tweak some optional settings to fit this battle to your needs.
					</div>

					<div style={{ marginTop: "10px" }} direction="column" gap="15px">
						<$ExtraCard crazyMode>
							<svg
								style={{ transform: "rotate(180deg)" }}
								data-v-64635c1a=""
								fill={""}
								width="40"
								height="40"
								viewBox="0 0 24 24"
							>
								<path
									data-v-64635c1a=""
									d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z"
								>
									<title data-v-64635c1a="">Crown icon</title>
								</path>
							</svg>

							<div>
								<div color={""}>Crazy Mode</div>
								<br />
								<div color={""}>
									The one who unboxes the LEAST wins! Winners lose and losers
									win.
								</div>
							</div>
						</$ExtraCard>
						<$ExtraCard>
							<svg
								data-v-64635c1a=""
								fill={""}
								width="40"
								height="40"
								viewBox="0 0 24 24"
							>
								<path
									data-v-64635c1a=""
									d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
								>
									<title data-v-64635c1a="">Lock icon</title>
								</path>
							</svg>

							<div>
								<div color={""}>Private Battle</div>
								<br />
								<div color={""}>
									Hide this battle from the public listings. Users can only join
									via link.
								</div>
							</div>
						</$ExtraCard>
					</div>
				</div>

				<div style={{ display: "flex", justifyContent: "end" }} justify="end">
					<div
						onClick={doCreateBattle}
						disabled={creatingBattle}
						style={{ width: "150px", height: "39px" }}
					>
						{creatingBattle ? (
							<motion.div
								animate={{ x: [0, 5, -5, 0] }}
								transition={{
									repeat: Infinity,
									repeatType: "loop",
									duration: 1,
								}}
							>
								<svg
									fill="#CFD8FF"
									width="18px"
									height="18px"
									viewBox="0 0 24 24"
								>
									<path
										data-v-64635c1a=""
										d="M6.2,2.44L18.1,14.34L20.22,12.22L21.63,13.63L19.16,16.1L22.34,19.28C22.73,19.67 22.73,20.3 22.34,20.69L21.63,21.4C21.24,21.79 20.61,21.79 20.22,21.4L17,18.23L14.56,20.7L13.15,19.29L15.27,17.17L3.37,5.27V2.44H6.2M15.89,10L20.63,5.26V2.44H17.8L13.06,7.18L15.89,10M10.94,15L8.11,12.13L5.9,14.34L3.78,12.22L2.37,13.63L4.84,16.1L1.66,19.29C1.27,19.68 1.27,20.31 1.66,20.7L2.37,21.41C2.76,21.8 3.39,21.8 3.78,21.41L7,18.23L9.44,20.7L10.85,19.29L8.73,17.17L10.94,15Z"
									>
										<title data-v-64635c1a="">Sword Cross icon</title>
									</path>
								</svg>
							</motion.div>
						) : (
							<div>Create Battle</div>
						)}
					</div>
				</div>

				{/*<AddCasesModal
				open={modalOpen}
				setOpen={setModalOpen}
				addedBoxes={addedBoxes}
				setAddedBoxes={setAddedBoxes}
				removeBox={removeBox}
            />*/}
			</div>
		</$CreateBattle>
	);
};

const $CreateBattle = styled.div`
	margin-top: 100px;
	margin-bottom: 120px;
	display: div;
	div-direction: column;
	gap: 50px;
	line-height: 22px;
`;

const $Card = styled.div`
	div: 1;
	border: 2px solid ${""};
	border-radius: 8px;
	padding: 15px;
`;

const $BoxCards = styled(motion.div)`
	margin-top: 10px;
	display: grid;
	grid-gap: 16px;
	grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
	position: relative;
`;
const $AddCard = styled(motion.div)`
	cursor: pointer;
	background-color: ${""};
	width: 100%;
	height: 100%;
	aspect-ratio: 220/260;
	display: div;
	div-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	position: relative;
	border-radius: 8px;
	padding: 6%;
	gap: 10px;
`;

const $ExtraCard = styled.div`
	width: 100%;
	border: 2px solid ${""};
	border-radius: 5px;
	display: div;
	align-items: center;
	padding: 20px;
	gap: 10px;

	${(props) =>
		props.crazyMode &&
		css(`
			background-image: url(/assets/img/crazymode.png);
			background-position: right;
			background-size: 300px;
			background-repeat: no-repeat;
		`)}
`;

export default CreateBattle;
