import React from "react";
import Reducer from "./Reducer";
import * as IT from "./InterfacesAndTypes";

const initialState: IT.stateType = {
	loggedIn: false,
	username: "",
	list: [],
	modalActive: false,
	modalType: undefined,
	shortLink: "",
};

export const AppContext = React.createContext({} as IT.contextProps);

export const AppProvider: React.FC = ({ children }) => {
	const [state, dispatch] = React.useReducer(Reducer, initialState);

	const openModal = (payload: IT.modalType) =>
		dispatch({ type: "OPEN_MODAL", payload });

	const closeModal = () => dispatch({ type: "CLOSE_MODAL" });

	const updateList = (payload: { d1: string; d2: IT.listType }) =>
		dispatch({ type: "UPDATE_LIST", payload });

	const deleteItem = (payload: number) =>
		dispatch({ type: "DELETE_ITEM", payload });

	const signIn = (payload: { d1: string; d2: IT.listType[] }) =>
		dispatch({ type: "SIGN_IN", payload });

	const logOut = () => dispatch({ type: "LOG_OUT" });

	const events: IT.eventsType = {
		openModal,
		closeModal,
		updateList,
		deleteItem,
		signIn,
		logOut,
	};
	const combined = { state, events };

	return (
		<AppContext.Provider value={combined}>{children}</AppContext.Provider>
	);
};
