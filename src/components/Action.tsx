import React from "react";

import { AppContext } from "./../data/Store";
import { updateUserData } from "./../data/reuseableFuncs";

const Action = () => {
	const { state, events } = React.useContext(AppContext);

	const [inpTxt, setInpTxt] = React.useState("");
	const [err, setErr] = React.useState(false);

	const regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

	const shorten = async (link: string) => {
		setInpTxt("");
		await events.openModal("loader");

		const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`);
		const data = await res.json();

		console.log(data.result);

		const listData = await {
			long: data.result.original_link,
			short: data.result.short_link,
		};

		events.updateList({ d1: data.result.short_link, d2: listData });
		updateUserData(state.username, [...state.list, listData]);
		await events.openModal("alert");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (err && e.target.value.length !== 0) setErr(false);
		setInpTxt(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inpTxt.length === 0 || !regex.test(inpTxt)) setErr(true);
		else {
			if (state.loggedIn) shorten(inpTxt);
			else events.openModal("login");
		}
	};

	const handleDelete = (index: number) => {
		events.deleteItem(index);

		updateUserData(
			state.username,
			state.list.filter((_item, i) => i !== index)
		);
	};

	return (
		<section className='action'>
			<form onSubmit={handleSubmit}>
				<div className={err ? "form-group error" : "form-group"}>
					<input
						type='text'
						name='inpTxt'
						placeholder='Shorten a link here...'
						value={inpTxt}
						onChange={handleChange}
						autoComplete='off'
					/>
					<span className='error'>
						Please add a url link starting with 'http://' or
						'https://'
					</span>
				</div>
				<button title='Shorten It!'>Shorten It!</button>
			</form>

			<ul className='list'>
				{state.list.map((item, index) => (
					<li key={index}>
						<a
							href={item.long}
							target='_blank'
							rel='noreferrer'
							className='linkLong'>
							{item.long}
						</a>
						<a
							href={`https://www.${item.short}`}
							target='_blank'
							rel='noreferrer'
							className='linkShort'>
							{item.short}
						</a>

						<button className='copy' title='copy'>
							Copy
						</button>

						<button
							className='del'
							title='delete'
							onClick={() => handleDelete(index)}>
							&times;
						</button>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Action;
