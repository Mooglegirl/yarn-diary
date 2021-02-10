import "./Card.scss";

export default function Card(props) {
	return (
		<div className="Card">
			<div className="Card__header">{props.header}</div>
			{props.body && <div className="Card__body">{props.body}</div>}
			{props.footer && <div className="Card__footer">{props.footer}</div>}
		</div>
	);
}