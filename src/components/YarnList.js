import { useSelector } from "react-redux";
import "./YarnList.scss";

import YarnCard from "./YarnCard";
import {selectSortedYarnIDs} from "../slices/yarnsSlice";

export default function YarnList(props) {
	const sortedYarnIDs = useSelector(selectSortedYarnIDs);
	
	return (
		<ul className="YarnList">
			{sortedYarnIDs.map(yarnID => <YarnCard id={yarnID} key={yarnID} />)}
		</ul>
	);
}