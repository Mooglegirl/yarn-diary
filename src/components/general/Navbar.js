import Breadcrumbs from "./Breadcrumbs";
import OptionsWidget from "./OptionsWidget";
import BackupWidget from "./BackupWidget";
import AllTagsWidget from "../tags/AllTagsWidget";
import "./Navbar.scss";

export default function Navbar(props) {
	return (
		<div className="Navbar">
			<div className="Navbar__section">
				<Breadcrumbs />
			</div>
			<div className="Navbar__section">
				<AllTagsWidget />
				<BackupWidget />
				<OptionsWidget />
			</div>
		</div>
	);
}