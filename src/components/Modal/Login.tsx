import React from "react";
import logo from "./../../images/logo.svg";

import { AppContext } from "./../../data/Store";
import { signInUser } from "./../../data/reuseableFuncs";

const Login = () => {
	const { events } = React.useContext(AppContext);

	const [formData, setFormData] = React.useState({
		userName: "",
		userPass: "",
	});

	const [err, setErr] = React.useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value }: any = e.target;

		setFormData((prev: { userName: string; userPass: string }) => {
			return { ...prev, [name]: value };
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const userData = signInUser(formData.userName, formData.userPass);

		if (userData === "error") {
			setFormData((prev: { userName: string; userPass: string }) => {
				return { ...prev, userPass: "" };
			});

			setErr(true);
			setTimeout(() => setErr(false), 1500);
		} else {
			events.signIn({ d1: formData.userName, d2: userData.list });

			setFormData({
				userName: "",
				userPass: "",
			});

			events.openModal("loader");
			setTimeout(() => events.closeModal(), 2000);
		}
	};

	return (
		<form className='modal-box login' onSubmit={handleSubmit}>
			<legend>
				<img src={logo} alt='logo' />
				<span>Login</span>
			</legend>

			<div className={err ? "form-group error" : "form-group"}>
				<input
					type='text'
					name='userName'
					value={formData.userName}
					onChange={handleChange}
					autoComplete='off'
					required
				/>
				<span>Enter username</span>
				<span
					className='check'
					style={{
						display: err ? "block" : "none",
					}}></span>
			</div>

			<div className={err ? "form-group error" : "form-group"}>
				<input
					type='password'
					name='userPass'
					value={formData.userPass}
					onChange={handleChange}
					required
				/>
				<span>Enter password</span>
			</div>

			<button className='form-btn' type='submit' title='login'>
				Login
			</button>

			<p>
				Don't have an account?{" "}
				<button
					className='form-link'
					type='button'
					title='sign up'
					onClick={() => events.openModal("signup")}>
					sign up!
				</button>
			</p>
		</form>
	);
};

export default Login;
