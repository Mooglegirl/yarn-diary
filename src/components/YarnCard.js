import {useSelector} from "react-redux";
import "./YarnCard.scss";

import {selectYarnByID} from "../slices/yarnsSlice";
import {selectColorwaysByYarnID} from "../slices/colorwaysSlice";

export default function YarnCard(props) {
	const yarnID = props.id;
	const yarn = useSelector(state => selectYarnByID(state, yarnID));
	const colorways = useSelector(state => selectColorwaysByYarnID(state, yarnID));

	return (
		<li className="YarnCard">
			{yarn.brand} {yarn.name}
			<ul>
				{colorways.map(colorway => <li key={colorway.id}>{colorway.name}</li>)}
			</ul>
		</li>
	);
}