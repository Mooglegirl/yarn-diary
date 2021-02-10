import {useSelector} from "react-redux";
import {Link, useRouteMatch} from "react-router-dom";

import {selectColorwayByID} from "../../slices/colorwaysSlice";

import Card from "../general/Card";

export default function ColorwayCard(props) {
	const {url} = useRouteMatch();
	const colorwayID = props.id;
	const colorway = useSelector(state => selectColorwayByID(state, colorwayID));

	return (
		<Card sections={[
			!!colorway.images && <Link to={`${url}/colorways/${colorwayID}`}><img src={colorway.images.split("\n")[0]} alt="Yarn" /></Link>,
			{isHeader: true, content: <Link to={`${url}/colorways/${colorwayID}`}>{colorway.name}</Link>},
			!!colorway.comment && <p>{colorway.comment}</p>
		]} />
	);
}