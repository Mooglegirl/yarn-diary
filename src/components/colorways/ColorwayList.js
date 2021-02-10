import {useSelector} from "react-redux";

import {selectColorwayIDsByYarnID} from "../../slices/colorwaysSlice";

import CardList from "../general/CardList";
import ColorwayCard from "./ColorwayCard";

export default function ColorwayList(props) {
	const {yarnID} = props;
	const colorwayIDs = useSelector(state => selectColorwayIDsByYarnID(state, yarnID));
	
	return (
		<CardList>
			{colorwayIDs.length === 0 ? <p>(None)</p> : colorwayIDs.map(colorwayID => <ColorwayCard id={colorwayID} key={colorwayID} />)}
		</CardList>
	);
}