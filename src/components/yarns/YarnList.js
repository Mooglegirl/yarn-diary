import { useSelector } from "react-redux";

import {selectDisplayedYarnIDs} from "../../slices/yarnsSlice";

import CardList from "../general/CardList";
import YarnCard from "./YarnCard";

export default function YarnList(props) {
	const displayedYarnIDs = useSelector(selectDisplayedYarnIDs);
	const displayMode = useSelector(state => state.yarns.displayMode);
	
	return (
		<CardList listMode={displayMode === "list"}>
			{displayedYarnIDs.map(yarnID => <YarnCard id={yarnID} key={yarnID} />)}
		</CardList>
	);
}