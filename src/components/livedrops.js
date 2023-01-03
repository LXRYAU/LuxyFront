import styled from "@emotion/styled";

const Livedrops = () => {
	return (
		<$Livedrops>
			<$Header>
				<$LiveCircle />
				<div style={{ fontWeight: "500" }}>Live Drops</div>
			</$Header>

			<$Drops>
				{new Array(40).fill(" ").map((item, i) => (
					<$Drop key={i}>
						<$DropImage src="https://usercontent.one/wp/www.sneakersmagasinet.se/wp-content/uploads/2022/09/yeezy-boost-350-v2-197143-2-1000.png?media=1663854067" />
						<$DropDetails>
							<div style={{ fontSize: "14px" }}>Yeezy Boost 350</div>
							<div style={{ fontSize: "13px", fontWeight: "600" }}>
								$9600.32
							</div>
						</$DropDetails>
					</$Drop>
				))}
			</$Drops>
		</$Livedrops>
	);
};

const $Livedrops = styled.div`
	min-width: 250px;
	height: 100%;
	background-color: #f3f2ee;
	display: flex;
	flex-direction: column;
`;

const $Header = styled.div`
	padding: 15px;
	display: flex;
	align-items: center;
	gap: 10px;
`;
const $LiveCircle = styled.div`
	height: 10px;
	width: 10px;
	border-radius: 100%;
	background-color: red;
`;

const $Drops = styled.div`
	flex: 1;
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

const $Drop = styled.div`
	border-left: 4px solid #ccb640;
	width: 100%;
	min-height: 85px;

	display: flex;
	align-items: center;
	padding-left: 20px;
	gap: 10px;
`;
const $DropImage = styled.div`
	width: 70px;
	height: 70px;
	background-image: url(${(props) => props.src});
	background-size: 89px;
	background-position: center;
	background-repeat: no-repeat;
`;
const $DropDetails = styled.div``;

export default Livedrops;
