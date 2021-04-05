import React from "react";
import "./sass/style.scss";

import Header from "./components/Header";
import Intro from "./components/Intro";
import Action from "./components/Action";
import Statistics from "./components/Statistics";
import LinkText from "./components/Link";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Attribution from "./components/Attribution";

import { AppContext } from "./data/Store";
import { getCurrentUser } from "./data/reuseableFuncs";

function App() {
	const { state, events } = React.useContext(AppContext);

	document.addEventListener("DOMContentLoaded", () => {
		const user = getCurrentUser();

		if (user) events.signIn({ d1: user.username, d2: user.list });
	});

	return (
		<>
			<div className='app'>
				<Header />
				<Intro />
				<main>
					<Action />
					<Statistics />
				</main>
				<LinkText />
				<Footer />
				{state.modalActive && <Modal />}
			</div>
			<Attribution />
		</>
	);
}

export default App;
