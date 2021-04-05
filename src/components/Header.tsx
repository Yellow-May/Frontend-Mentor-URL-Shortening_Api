import React from "react";
import logo from "./../images/logo.svg";
import hamburger from "./../images/icon-hamburger.svg";
import userIcon from "./../images/user-circle.svg";

import { AppContext } from "./../data/Store";
import { deleteUser } from "./../data/reuseableFuncs";

const navLinks: string[] = ["Features", "Pricing", "Resources"];
const signLinks: ("Login" | "Sign Up")[] = ["Login", "Sign Up"];

const Header = () => {
	const { state, events } = React.useContext(AppContext);

	const [navState, setNav] = React.useState(false);
	const [profileState, setProfileState] = React.useState(false);

	const handleSign = (link: string) => {
		link === "Login"
			? events.openModal("login")
			: events.openModal("signup");
		setNav(false);
	};

	const handleDelete = () => {
		events.logOut();
		deleteUser(state.username);
	};

	const handleNav = () => {
		if (navState) setNav(false);
		else setNav(true);
	};

	const handleProfileNav = () => {
		if (profileState) setProfileState(false);
		else setProfileState(true);
	};

	return (
		<header>
			<img src={logo} alt='logo' />

			<nav style={{ left: navState ? "50%" : "-150%" }}>
				<div className='nav-links'>
					{navLinks.map((link, i) => (
						<button className='nav-link' title={link} key={i}>
							{link}
						</button>
					))}
				</div>

				<div
					className='sign-links'
					style={{ display: state.loggedIn ? "none" : "" }}>
					{signLinks.map((link, i) => (
						<button
							className='sign-link'
							title={link}
							key={i}
							onClick={() => handleSign(link)}>
							{link}
						</button>
					))}
				</div>

				<div
					className='profile'
					style={{ display: state.loggedIn ? "" : "none" }}>
					<div className='user' onClick={handleProfileNav}>
						<img src={userIcon} alt='user' />{" "}
						<span>{state.username}</span>
					</div>

					<div className={profileState ? "nav open" : "nav"}>
						<button
							className='profile-btn'
							title='logout button'
							onClick={events.logOut}>
							Logout
						</button>
						<button
							className='profile-btn'
							title='delete account button'
							onClick={handleDelete}>
							Delete account
						</button>
					</div>
				</div>
			</nav>

			<button className='nav-btn' onClick={handleNav}>
				<img src={hamburger} alt='hamburger icon' />
			</button>
		</header>
	);
};

export default Header;
