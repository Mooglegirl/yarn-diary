import "./PageWithSidebar.scss";

export default function PageWithSidebar(props) {
	return (
		<div className="PageWithSidebar">
			<div className="PageWithSidebar__content">{props.content}</div>
			<div className="PageWithSidebar__sidebar">{props.sidebar}</div>
		</div>
	);
}