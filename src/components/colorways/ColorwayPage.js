import {useParams, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

import {selectColorwayByID} from "../../slices/colorwaysSlice";
import {selectYarnByID} from "../../slices/yarnsSlice";

import "./ColorwayPage.scss";
import Markdown from "../general/Markdown";
import PageWithSidebar from "../general/PageWithSidebar";
import ColorwayEditWidget from "./ColorwayEditWidget";
import ColorwayDeleteWidget from "./ColorwayDeleteWidget";
import ImageGallery from "../general/ImageGallery";
import TagsEditWidget from "../tags/TagsEditWidget";
import TagList from "../tags/TagList";

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
						<TagList colorwayID={colorwayID} />
						{colorway.comment && <Markdown>{colorway.comment}</Markdown>}
						<h3>Gallery:</h3>
						<ImageGallery images={colorway.images} />
					</>}
					sidebar={<>
						<ColorwayEditWidget colorwayID={colorwayID} />
						<TagsEditWidget colorwayID={colorwayID} />
						<ColorwayDeleteWidget colorwayID={colorwayID} />
					</>}
				/>
			</div>
		);
	}
}