import React from "react";
import logo from "./../../images/logo.svg";

import { AppContext } from "./../../data/Store";
import {
	signUpDataType,
	signUpErrDataType,
} from "./../../data/InterfacesAndTypes";
import { checkUsers, createUser } from "./../../data/reuseableFuncs";

const Signup = () => {
	const { events } = React.useContext(AppContext);
 
	const [formData, setFormData] = React.useState({
		username: "",
		password: "",
		passwordConfirm: "",
	});

	const [errCheck, setCheck] = React.useState({
		username: false,
		passwordConfirm: false,
	});

	const startErrCheck = (
		name: "username" | "password" | "passwordConfirm",
		value: "string"
	) => {
		if (formData[name] !== "") {
			if (name === "username") {
				if (checkUsers(value))
					setCheck((prev: signUpErrDataType) => {
						return { ...prev, username: true };
					});
				else
					setCheck((prev: signUpErrDataType) => {
						return { ...prev, username: false };
					});
			} else if (name === "passwordConfirm") {
				if (value !== formData.password)
					setCheck((prev: signUpErrDataType) => {
						return { ...prev, passwordConfirm: true };
					});
				else
					setCheck((prev: signUpErrDataType) => {
						return { ...prev, passwordConfirm: false };
					});
			} else {
				if (value !== formData.passwordConfirm)
					setCheck((prev: signUpErrDataType) => {
						return { ...prev, passwordConfirm: true };
					});
				else
					setCheck((prev: signUpErrDataType) => {
						return { ...prev, passwordConfirm: false };
					});
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value }: any = e.target;

		setFormData((prev: signUpDataType) => {
			return { ...prev, [name]: value };
		});

		startErrCheck(name, value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		createUser({
			username: formData.username,
			password: formData.password,
			list: [],
		});

		events.signIn({ d1: formData.username, d2: [] });

		setFormData({
			username: "",
			password: "",
			passwordConfirm: "",
		});

		events.openModal("loader");
		setTimeout(() => events.closeModal(), 2000);
	};

	return (
		<form className='modal-box signup' onSubmit={handleSubmit}>
			<legend>
				<img src={logo} alt='logo' />
				<span>Sign Up</span>
			</legend>

			<div
				className={
					errCheck.username ? "form-group error" : "form-group"
				}>
				<input
					type='text'
					name='username'
					value={formData.username}
					onChange={handleChange}
					autoComplete='off'
					required
				/>
				<span>Select username...</span>
				<span
					className='check'
					style={{
						display: formData.username !== "" ? "block" : "none",
					}}></span>
			</div>

			<div className='form-group'>
				<input
					type='password'
					name='password'
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<span>Select password...</span>
			</div>

			<div
				className={
					errCheck.passwordConfirm ? "form-group error" : "form-group"
				}>
				<input
					type='password'
					name='passwordConfirm'
					value={formData.passwordConfirm}
					onChange={handleChange}
					required
				/>
				<span>Confirm password...</span>
				<span
					className='check'
					style={{
						display: formData.password !== "" ? "block" : "none",
					}}></span>
			</div>

			<button
				className='form-btn'
				type='submit'
				title='sign up'
				style={{
					pointerEvents:
						errCheck.username || errCheck.passwordConfirm
							? "none"
							: "all",
				}}>
				Sign up
			</button>

			<p>
				Already have an account?{" "}
				<button
					className='form-link'
					type='button'
					title='login'
					onClick={() => events.openModal("login")}>
					login
				</button>
			</p>
		</form>
	);
};

export default Signup;
