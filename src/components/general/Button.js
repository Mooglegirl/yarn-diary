import classNames from "classnames";
import "./Button.scss";

export default function Button(props) {
	let icon;
	if(typeof props.icon === "string") { // was passed as filename
		icon = <img src={props.icon} alt="" />
	} else if(typeof props.icon === "object") { // was passed as SVG component
		const Icon = props.icon;
		icon = <Icon />; // hack to render using a dynamic name
	}

	const classes = classNames("Button", {
		"Button--danger": props.buttonType === "danger"
	});

	return (
		<button className={classes} onClick={props.handleClick}>
			{icon}
			{props.children && <div>{props.children}</div>}
		</button>
	);
}