import "./Navbar.scss";

import Breadcrumbs from "./Breadcrumbs";
import OptionsWidget from "./OptionsWidget";
import BackupWidget from "./BackupWidget";

export default function Navbar(props) {
	return (
		<div className="Navbar">
			<div className="Navbar__section">
				<Breadcrumbs />
			</div>
			<div className="Navbar__section">
				<BackupWidget />
				<OptionsWidget />
			</div>
		</div>
	);
}