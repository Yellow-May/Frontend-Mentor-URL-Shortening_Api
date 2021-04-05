export type listType = { long: string; short: string };
export type modalType = "alert" | "loader" | "signup" | "login";

export type stateType = {
	loggedIn: boolean;
	username: string;
	list: listType[];
	modalActive: boolean;
	modalType: modalType | undefined;
	shortLink: string;
};

export type actionType = {
	type: string;
	payload?: any;
};

export type eventsType = {
	openModal: (payload: modalType) => void;
	closeModal: () => void;
	updateList: (payload: { d1: string; d2: listType }) => void;
	deleteItem: (payload: number) => void;
	signIn: (payload: { d1: string; d2: listType[] }) => void;
	logOut: () => void;
};

export interface contextProps {
	state: stateType;
	events: eventsType;
}

export type signUpDataType = {
	username: string;
	password: string;
	passwordConfirm: string;
};

export type signUpErrDataType = {
	username: boolean;
	passwordConfirm: boolean;
};
