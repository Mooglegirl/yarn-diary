import classNames from "classnames";

import "./Card.scss";

export default function Card(props) {
	return (
		<div className="Card">
			{props.sections.map((section, index) => {
				if(!section) return null;

				const classes = classNames("Card__section", {"Card__section--header": section.isHeader});
				return <div className={classes} key={index}>{section.content || section}</div>
			})}
		</div>
	);
}