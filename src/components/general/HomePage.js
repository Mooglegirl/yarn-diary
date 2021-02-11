import "./HomePage.scss";
import YarnAddWidget from "../yarns/YarnAddWidget";
import YarnList from "../yarns/YarnList";
import YarnSearchBox from "../yarns/YarnSearchBox";

export default function HomePage(props) {
	return (
		<div className="HomePage">
			<div className="HomePage__toolbar">
				<YarnSearchBox />
				<YarnAddWidget />
			</div>
			<YarnList />
		</div>
	);
}