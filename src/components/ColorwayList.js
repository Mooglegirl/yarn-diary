import {useSelector} from "react-redux";

import {selectColorwaysByYarnID} from "../slices/colorwaysSlice";

import "./ColorwayList.scss";

export default function ColorwayList({yarnID}) {
	const colorways = useSelector(state => selectColorwaysByYarnID(state, yarnID));
	const content = colorways.length === 0 ?
		<span>(None)</span> : 
		colorways.map(colorway => <span className="ColorwayList__colorway" key={colorway.id}>{colorway.name}</span>);

	return <span className="ColorwayList">{content}</span>;
}