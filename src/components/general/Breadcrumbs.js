import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

import {selectYarnByID} from "../../slices/yarnsSlice";
import {selectColorwayByID} from "../../slices/colorwaysSlice";

import "./Breadcrumbs.scss";

export default function Breadcrumbs(props) {
	const {pathname} = useLocation();
	const crumbs = [];

	if(pathname === "/") {
		crumbs.push({name: "Yarn List"});
	} else {
		crumbs.push({name: "Yarn List", path: "/"});
	}

	const parsedYarnID = pathname.match(/(?<=\/yarns\/).*/);
	const yarnID = !!parsedYarnID ? parsedYarnID[0].replace(/\/colorways\/.*/, "") : null;
	const yarn = useSelector(state => selectYarnByID(state, yarnID));

	const parsedColorwayID = pathname.match(/(?<=\/colorways\/).*/);
	const colorwayID = !!parsedColorwayID ? parsedColorwayID[0] : null;
	const colorway = useSelector(state => selectColorwayByID(state, colorwayID));

	const parsedTag = pathname.match(/(?<=\/tags\/).*/);
	const tag = !!parsedTag ? decodeURIComponent(parsedTag[0]) : null;

	if(yarn) {
		crumbs.push({name: `${yarn.brand} ${yarn.name}`, path: !!colorway ? `/yarns/${yarnID}` : null});
	}

	if(colorway) {
		crumbs.push({name: colorway.name});
	}

	if(tag) {
		crumbs.push({name: "Tag: " + tag});
	}

	return (
		<div className="Breadcrumbs">
			{crumbs.map((crumb, index) => (
				<div className="Breadcrumbs__crumb" key={index}>
					{crumb.path ?
						<Link to={crumb.path}>{crumb.name}</Link> :
						<p>{crumb.name}</p>}
				</div>
			))}
		</div>
	);
}