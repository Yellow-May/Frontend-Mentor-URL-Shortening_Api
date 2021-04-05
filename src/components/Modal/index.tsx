import React from "react";
import Alert from "./Alert";
import Loader from "./Loader";
import Signup from "./Signup";
import Login from "./Login";

import { AppContext } from "./../../data/Store";

const Modal = () => {
	const { state, events } = React.useContext(AppContext);

	const ModalBox = () => {
		switch (state.modalType) {
			case "alert":
				return <Alert />;
			case "loader":
				return <Loader />;
			case "signup":
				return <Signup />;
			case "login":
				return <Login />;
			default:
				return <></>;
		}
	};

	return (
		<div className='modal'>
			<button
				className='close-modal'
				title='close modal'
				onClick={events.closeModal}>
				&times;
			</button>
			<ModalBox />
		</div>
	);
};

export default Modal;
