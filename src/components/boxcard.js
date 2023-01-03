import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const boxVariants = {
	hover: {},
};
const boxImgVariants = {
	hover: {},
};
const boxOpenVariants = {
	initial: {
		opacity: 0,
	},
	hover: {
		opacity: 1,
	},
};

const BoxCard = ({
	name,
	iconUrl,
	cost,
	addBox = () => {},
	removeBox = () => {},
	added = false,
	amount = 0,
	variant = "link",
}) => {
	return (
		<$BoxCard variants={boxVariants} initial="initial" whileHover={"hover"}>
			<motion.img
				animate={{ scale: added ? 0.8 : 1, y: added ? -15 : 0 }}
				variants={boxImgVariants}
				transition={{ duration: 0 }}
				src={iconUrl}
			/>

			<div>
				<div style={{ lineHeight: "5px" }} weight={500} size="15px" color="red">
					<b>{name}</b>
				</div>

				{added && (
					<div style={{ marginTop: "0px" }}>
						<div weight={500} size="15px" color="white">
							{cost / 100}
						</div>
					</div>
				)}
			</div>

			{added ? (
				<div style={{ width: "100%", position: "relative" }}>
					<$BoxCardPrice style={{ justifyContent: "space-between" }}>
						<button onClick={removeBox}>-</button>
						<span>{amount}</span>
						<button onClick={addBox}>+</button>
					</$BoxCardPrice>
				</div>
			) : (
				<div style={{ width: "100%", position: "relative" }}>
					<$BoxCardPrice>{cost / 100}</$BoxCardPrice>
					<motion.div
						variants={boxOpenVariants}
						style={{ width: "100%", position: "absolute", top: 10 }}
						transition={{ duration: 0.2 }}
					>
						{variant == "additive" && (
							<$BigButton onClick={addBox}>Add</$BigButton>
						)}

						{variant == "remove" && (
							<$BigButton onClick={removeBox}>Remove</$BigButton>
						)}
					</motion.div>
				</div>
			)}
		</$BoxCard>
	);
};

const $BoxCard = styled(motion.div)`
	cursor: pointer;
	background-color: #f3f2ee;
	width: 100%;
	height: 100%;
	aspect-ratio: 220/260;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	text-align: center;
	position: relative;
	border-radius: 8px;
	padding: 6%;

	& img {
		width: 60%;
		height: unset;
		aspect-ratio: 1/1;
		position: absolute;
		top: 8%;
		transition: 0.2s;
	}
`;
const $BoxCardPrice = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	grid-gap: 4px;
	color: black;
	font-size: 16px;
	margin-top: 6%;
	border-radius: 6px;
	background-color: white;
`;

const $BigButton = styled.button`
	height: 100%;
	width: 100%;
`;

export default BoxCard;
