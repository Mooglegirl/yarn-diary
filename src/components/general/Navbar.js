import "./Navbar.scss";

import Breadcrumbs from "./Breadcrumbs";
import OptionsWidget from "./OptionsWidget";

export default function Navbar(props) {
	return (
		<div className="Navbar">
			<div className="Navbar__section">
				<Breadcrumbs />
			</div>
			<div className="Navbar__section">
				<OptionsWidget />
			</div>
		</div>
	);
}