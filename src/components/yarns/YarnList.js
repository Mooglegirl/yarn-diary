import { useSelector } from "react-redux";

import {selectSortedYarnIDs} from "../../slices/yarnsSlice";

import CardList from "../general/CardList";
import YarnCard from "./YarnCard";

export default function YarnList(props) {
	const sortedYarnIDs = useSelector(selectSortedYarnIDs);
	
	return (
		<CardList>
			{sortedYarnIDs.map(yarnID => <YarnCard id={yarnID} key={yarnID} />)}
		</CardList>
	);
}