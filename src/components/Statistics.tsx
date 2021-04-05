import React from "react";
import img1 from "./../images/icon-brand-recognition.svg";
import img2 from "./../images/icon-detailed-records.svg";
import img3 from "./../images/icon-fully-customizable.svg";

const cards: { img: string; h: string; p: string }[] = [
	{
		img: img1,
		h: "Brand Recognition",
		p:
			"Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.",
	},
	{
		img: img2,
		h: "Detailed Records",
		p:
			"Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.",
	},
	{
		img: img3,
		h: "Fully Customizable",
		p:
			"Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
	},
];

const Statistics = () => {
	return (
		<section className='statistics'>
			<h2> Advanced Statistics </h2>

			<p>
				Track how your links are performing across the web with our
				advanced statistics dashboard.
			</p>

			<div className='list'>
				{cards.map((card, index) => (
					<div key={index} className='card'>
						<div className='img'>
							<img src={card.img} alt='card' />
						</div>
						<h3>{card.h}</h3>
						<p>{card.p}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default Statistics;
