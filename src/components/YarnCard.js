import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {selectYarnByID} from "../slices/yarnsSlice";

import "./YarnCard.scss";
import ColorwayList from "./ColorwayList";

export default function YarnCard(props) {
	const yarnID = props.id;
	const yarn = useSelector(state => selectYarnByID(state, yarnID));

	return (
		<div className="YarnCard">
			<Link className="YarnCard__name" to={`/yarns/${yarnID}`}>{yarn.brand} {yarn.name}</Link>
			<div className="YarnCard__colorways">
				<span>Colorways: </span>
				<ColorwayList yarnID={yarnID} />
			</div>
			{!!yarn.comment && (
				<div className="YarnCard__comment">{yarn.comment}</div>
			)}
		</div>
	);
}