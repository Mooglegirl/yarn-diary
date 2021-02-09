import { useSelector } from "react-redux";
import {selectSortedYarnIDs} from "../slices/yarnsSlice";

import "./YarnList.scss";
import YarnCard from "./YarnCard";

export default function YarnList(props) {
	const sortedYarnIDs = useSelector(selectSortedYarnIDs);
	
	return (
		<div className="YarnList">
			{sortedYarnIDs.map(yarnID => <YarnCard id={yarnID} key={yarnID} />)}
		</div>
	);
}