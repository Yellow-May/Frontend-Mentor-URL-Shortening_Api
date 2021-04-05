import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AppContext } from "./../../data/Store";

const Alert = () => {
	const { state, events } = React.useContext(AppContext);
	const [copy, setCopy] = React.useState(false);

	const handleCopy = () => {
		setCopy(true);
		setTimeout(() => setCopy(false), 250);
		setTimeout(() => events.closeModal(), 2000);
	};

	return (
		<div className='modal-box alert-box'>
			<h2>Your link is ready!</h2>

			<a
				href={`https://www.${state.shortLink}`}
				target='_blank'
				rel='noreferrer'
				className='alert-link'>
				{state.shortLink}
			</a>

			<CopyToClipboard onCopy={handleCopy} text={state.shortLink}>
				<button className='alert-btn' title='copy link and close modal'>
					{copy ? "Copied" : "Copy"}
				</button>
			</CopyToClipboard>
		</div>
	);
};

export default Alert;
