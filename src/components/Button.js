import "./Button.scss";

export default function Button(props) {
	return (
		<button className="Button" onClick={props.handleClick}>
			{props.icon && <img src={props.icon} alt="" />}
			{props.children}
		</button>
	);
}