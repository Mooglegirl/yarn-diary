import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {selectYarnByID} from "../../slices/yarnsSlice";
import {selectColorwaysByYarnID} from "../../slices/colorwaysSlice";

import Card from "../general/Card";

export default function YarnCard(props) {
	const yarnID = props.id;
	const yarn = useSelector(state => selectYarnByID(state, yarnID));
	const colorways = useSelector(state => selectColorwaysByYarnID(state, yarnID));

	const colorwayList = colorways.length === 0 ?
		<span>(None)</span> : 
		colorways.map(colorway => <span className="comma-separate" key={colorway.id}><Link to={`/yarns/${yarnID}/colorways/${colorway.id}`}>{colorway.name}</Link></span>);

	return (
		<Card 
			header={<Link to={`/yarns/${yarnID}`}>{yarn.brand} {yarn.name}</Link>}
			body={(<>
				<span>Colorways: </span>
				{colorwayList}
			</>)}
			footer={!!yarn.comment && <p>{yarn.comment}</p>}
		/>
	);
}