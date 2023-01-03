import "../styles/globals.css";
import "../styles/theme/elegant-icons.css";
import "../styles/theme/font-awesome.min.css";
import "../styles/theme/magnific-popup.css";
import "../styles/theme/nice-select.css";
import "../styles/theme/owl.carousel.min.css";
import "../styles/theme/slicknav.min.css";
import "../styles/theme/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useSocket } from "../hooks/usesocket";
import { SocketContext } from "../context/socketcontext";
import { useEffect, useState } from "react";
import { UserContext } from "../context/usercontext";
import { Container } from "react-bootstrap";
import NavComponent from "../components/navcomponent";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import styled from "@emotion/styled";
import LiveDrops from "../components/livedrops";

function MyApp({ Component, pageProps }) {
	const socket = useSocket();
	const [user, setUser] = useState(null);

	useEffect(() => {
		/*socket.emit("user:data", {}, (res) => {
      setUser(res.user);
    })*/
		socket.on("user:data", (res) => {
			setUser(res);
		});
	}, []);

	return (
		<UserContext.Provider value={user}>
			<SocketContext.Provider value={socket}>
				<$Wrapper>
					<div style={{ flex: 1, overflowY: "scroll" }}>
						<Navbar />

						<div style={{ marginTop: "25px" }} />

						<Component {...pageProps} />

						<div style={{ marginTop: "100px" }} />
						<Footer />
					</div>
				</$Wrapper>
			</SocketContext.Provider>
		</UserContext.Provider>
	);
}

const $Wrapper = styled.div`
	display: flex;
	height: 100vh;
`;

export default MyApp;
