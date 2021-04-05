import { listType } from "./InterfacesAndTypes";

type userType = {
	username: string;
	password: string;
	list: listType[];
};

export const getCurrentUser = () => {
	if (typeof window.localStorage !== undefined) {
		const users = window.localStorage.getItem("users");

		if (users) {
			const user: userType = JSON.parse(users)[
				JSON.parse(users).length - 1
			];

			return user;
		}
	}
};

export const checkUsers = (username: string) => {
	if (typeof window.localStorage !== undefined) {
		const users = window.localStorage.getItem("users");

		if (users) {
			const alreadyRegistered = JSON.parse(users).filter(
				(user: userType) => user.username === username
			);

			if (alreadyRegistered.length === 0) return false;
			else return true;
		}
	}
};

export const signInUser = (username: string, password: string) => {
	if (typeof window.localStorage !== undefined) {
		const users = window.localStorage.getItem("users");

		if (users) {
			const alreadyRegistered = JSON.parse(users).filter(
				(user: userType) =>
					user.username === username && user.password === password
			);

			if (alreadyRegistered.length === 0) return "error";
			else {
				const user = alreadyRegistered[0];

				const cData = JSON.parse(users);

				const newData = cData.filter(
					(user: userType) => user.username !== username
				);

				const newUsers = [...newData, user];

				window.localStorage.setItem("users", JSON.stringify(newUsers));

				return user;
			}
		}
	}
};

export const createUser = (newUser: userType) => {
	if (typeof window.localStorage !== undefined) {
		const users = window.localStorage.getItem("users");
		let newUsers;

		if (users) newUsers = JSON.parse(users);
		else newUsers = [];

		newUsers.push(newUser);
		window.localStorage.setItem("users", JSON.stringify(newUsers));
	}
};

export const deleteUser = (username: string) => {
	if (typeof window.localStorage !== undefined) {
		const users = window.localStorage.getItem("users");

		if (users) {
			const newUsers = JSON.parse(users).filter(
				(user: userType) => user.username !== username
			);

			window.localStorage.setItem("users", JSON.stringify(newUsers));
		}
	}
};

export const updateUserData = (username: string, list: listType[]) => {
	if (typeof window.localStorage !== undefined) {
		const users = window.localStorage.getItem("users");

		if (users) {
			const newData = JSON.parse(users).map((user: userType) => {
				if (user.username === username) user.list = list;
				return user;
			});

			window.localStorage.setItem("users", JSON.stringify(newData));
		}
	}
};
