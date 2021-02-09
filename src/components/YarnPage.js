import {useParams, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

import {selectYarnByID} from "../slices/yarnsSlice";

import ColorwayList from "./ColorwayList";
import YarnEditWidget from "./YarnEditWidget";
import ColorwayAddWidget from "./ColorwayAddWidget";
import PageWithSidebar from "./PageWithSidebar";

export default function YarnPage(props) {
	const {yarnID} = useParams();
	const yarn = useSelector(state => selectYarnByID(state, yarnID));
	const is404 = yarn === undefined;

	return is404 ? <Redirect to="/" /> : (
		<div className="YarnPage">
			<PageWithSidebar 
				content={<>
					<h2>Brand: {yarn.brand}</h2>
					<h2>Name: {yarn.name}</h2>
					<h3>Colorways: <ColorwayList yarnID={yarnID} /></h3>
					{yarn.comment && <p>{yarn.comment}</p>}
				</>}
				sidebar={<>
					<YarnEditWidget yarnID={yarnID} />
					<ColorwayAddWidget yarnID={yarnID} />
				</>}
			/>
		</div>
	);
}