import "./CardList.scss";

export default function CardList(props) {
	return (
		<div className="CardList">
			{props.children}
		</div>
	);
}