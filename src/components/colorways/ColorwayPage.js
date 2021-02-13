import {useParams, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import {selectColorwayByID} from "../../slices/colorwaysSlice";
import {selectYarnByID} from "../../slices/yarnsSlice";

import "./ColorwayPage.scss";
import PageWithSidebar from "../general/PageWithSidebar";
import ColorwayEditWidget from "./ColorwayEditWidget";
import ColorwayDeleteWidget from "./ColorwayDeleteWidget";
import ImageGallery from "../general/ImageGallery";

export default function ColorwayPage(props) {
	const {yarnID, colorwayID} = useParams();
	const colorway = useSelector(state => selectColorwayByID(state, colorwayID));
	const yarn = useSelector(state => selectYarnByID(state, yarnID));
	const colorwayIs404 = colorway === undefined;
	const yarnIs404 = yarn === undefined;

	if(colorwayIs404) {
		return yarnIs404 ? <Redirect to="/" /> : <Redirect to={`/yarns/${yarnID}`} />;
	} else {
		return (
			<div className="ColorwayPage">
				<PageWithSidebar
					content={<>
						<h2>Colorway: {colorway.name}</h2>
						<h3>Yarn: {yarn.brand} {yarn.name}</h3>
						{colorway.comment && <ReactMarkdown plugins={[gfm]}>{colorway.comment}</ReactMarkdown>}
						<h3>Gallery:</h3>
						<ImageGallery images={colorway.images} />
					</>}
					sidebar={<>
						<ColorwayEditWidget colorwayID={colorwayID} />
						<ColorwayDeleteWidget colorwayID={colorwayID} />
					</>}
				/>
			</div>
		);
	}
}