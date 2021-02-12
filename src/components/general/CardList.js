import "./CardList.scss";

export default function CardList(props) {
	return (
		<div className={`CardList ${props.listMode ? "CardList--list-mode" : ""}`}>
			{props.children}
		</div>
	);
}