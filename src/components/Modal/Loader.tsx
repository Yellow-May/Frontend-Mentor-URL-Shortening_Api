import React from "react";

const Loader = () => {
	const el = [];
	for (let index = 1; index <= 20; index++) {
		el.push(index);
	}

	return (
		<div className='modal-box loader-box'>
			<div className='loader'>
				{el.map(e => (
					<div
						key={e}
						style={{
							transform: `rotate(calc(18deg * ${e}))`,
						}}>
						<span
							style={{
								animationDelay: `calc(0.1s * ${e}`,
							}}></span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Loader;
