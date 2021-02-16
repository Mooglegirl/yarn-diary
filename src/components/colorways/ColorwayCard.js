import {useSelector} from "react-redux";
import {Link, useRouteMatch} from "react-router-dom";

import {selectColorwayByID} from "../../slices/colorwaysSlice";
import {selectScreenWidth} from "../../slices/uiSlice";

import Card from "../general/Card";
import Markdown from "../general/Markdown";

export default function ColorwayCard(props) {
	const {url} = useRouteMatch();
	const colorwayID = props.id;
	const colorway = useSelector(state => selectColorwayByID(state, colorwayID));

	const screenWidth = useSelector(selectScreenWidth);
	const breakpoint = 768;
	const isCardMode = useSelector(state => state.colorways.displayMode) === "cards";

	return (
		<Card sections={[
			(screenWidth > breakpoint || isCardMode) && !!colorway.images && 
				<Link to={`${url}/colorways/${colorwayID}`}>
					<div className="Card__img" style={{backgroundImage: `url("${colorway.images.split("\n")[0]}")`}} />
				</Link>,
			{isHeader: true, content: <Link to={`${url}/colorways/${colorwayID}`}>{colorway.name}</Link>},
			!!colorway.comment && <Markdown isInCard={true}>{colorway.comment}</Markdown>
		]} />
	);
}