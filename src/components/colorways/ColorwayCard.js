import {useSelector} from "react-redux";
import {Link, useRouteMatch} from "react-router-dom";

import {selectColorwayByID} from "../../slices/colorwaysSlice";

import Card from "../general/Card";

export default function ColorwayCard(props) {
	const {url} = useRouteMatch();
	const colorwayID = props.id;
	const colorway = useSelector(state => selectColorwayByID(state, colorwayID));

	return (
		<Card
			header={<Link to={`${url}/colorways/${colorwayID}`}>{colorway.name}</Link>}
			body={!!colorway.comment && <p>{colorway.comment}</p>}
		/>
	);
}