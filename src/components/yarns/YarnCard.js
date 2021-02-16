import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {selectYarnByID} from "../../slices/yarnsSlice";
import {selectSortedColorwaysByYarnID} from "../../slices/colorwaysSlice";
import {selectScreenWidth} from "../../slices/uiSlice";

import Card from "../general/Card";
import Markdown from "../general/Markdown";

export default function YarnCard(props) {
	const yarnID = props.id;
	const yarn = useSelector(state => selectYarnByID(state, yarnID));
	const colorways = useSelector(state => selectSortedColorwaysByYarnID(state, yarnID));

	const screenWidth = useSelector(selectScreenWidth);
	const breakpoint = 768;
	const isCardMode = useSelector(state => state.yarns.displayMode) === "cards";

	const colorwayList = colorways.length === 0 ?
		<span>(None)</span> : 
		colorways.map(colorway => <span className="comma-separate" key={colorway.id}><Link to={`/yarns/${yarnID}/colorways/${colorway.id}`}>{colorway.name}</Link></span>);

	return (
		<Card sections={[
			(screenWidth > breakpoint || isCardMode) && !!yarn.images && 
				<Link to={`/yarns/${yarnID}`}>
					<div className="Card__img" style={{backgroundImage: `url("${yarn.images.split("\n")[0]}")`}} />
				</Link>,
			{isHeader: true, content: <Link to={`/yarns/${yarnID}`}>{yarn.brand} {yarn.name}</Link>},
			<>
				{<span>Color{screenWidth > breakpoint ? "way" : ""}s: </span>}
				{colorwayList}
			</>,
			(screenWidth > breakpoint || isCardMode) && !!yarn.comment && <Markdown isInCard={true}>{yarn.comment}</Markdown>
		]} />
	);
}