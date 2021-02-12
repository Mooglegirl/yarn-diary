import {useSelector} from "react-redux";

import {selectSortedColorwayIDsByYarnID} from "../../slices/colorwaysSlice";

import CardList from "../general/CardList";
import ColorwayCard from "./ColorwayCard";

export default function ColorwayList(props) {
	const {yarnID} = props;
	const colorwayIDs = useSelector(state => selectSortedColorwayIDsByYarnID(state, yarnID));
	const displayMode = useSelector(state => state.colorways.displayMode);
	
	return (
		<CardList listMode={displayMode === "list"}>
			{colorwayIDs.length === 0 ? <p>(None)</p> : colorwayIDs.map(colorwayID => <ColorwayCard id={colorwayID} key={colorwayID} />)}
		</CardList>
	);
}