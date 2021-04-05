import React from "react";
import illustration from "./../images/illustration-working.svg";

const Intro = () => {
	return (
		<div className='intro'>
			<div className='text'>
				<h1>More than just shorter links</h1>
				<p>
					Build your brand’s recognition and get detailed insights on
					how your links are performing.
				</p>
				<button title='Get Started'>Get Started</button>
			</div>
			<img
				className='illustration'
				src={illustration}
				alt='illustration'
			/>
		</div>
	);
};

export default Intro;
