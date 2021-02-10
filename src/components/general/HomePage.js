import YarnAddWidget from "../yarns/YarnAddWidget";
import YarnList from "../yarns/YarnList";

export default function HomePage(props) {
	return (
		<div className="HomePage">
			<YarnAddWidget />
			<YarnList />
		</div>
	);
}