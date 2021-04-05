import * as IT from "./InterfacesAndTypes";

const Reducer = (state: IT.stateType, action: IT.actionType) => {
	switch (action.type) {
		case "OPEN_MODAL":
			return {
				...state,
				modalActive: true,
				modalType: action.payload,
			};

		case "CLOSE_MODAL":
			return {
				...state,
				modalActive: false,
				modalType: undefined,
			};

		case "UPDATE_LIST":
			return {
				...state,
				list: [...state.list, action.payload.d2],
				shortLink: action.payload.d1,
			};

		case "DELETE_ITEM":
			return {
				...state,
				list: state.list.filter(
					(_item, index) => index !== action.payload
				),
			};

		case "SIGN_IN":
			return {
				...state,
				loggedIn: true,
				username: action.payload.d1,
				list: action.payload.d2,
			};

		case "LOG_OUT":
			return {
				...state,
				loggedIn: false,
				username: "",
				list: [],
			};

		default:
			return state;
	}
};

export default Reducer;
