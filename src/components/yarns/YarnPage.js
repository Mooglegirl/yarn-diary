import {useParams, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

import {selectYarnByID} from "../../slices/yarnsSlice";

import Markdown from "../general/Markdown";
import ColorwayList from "../colorways/ColorwayList";
import YarnEditWidget from "../yarns/YarnEditWidget";
import YarnDeleteWidget from "../yarns/YarnDeleteWidget";
import ColorwayAddWidget from "../colorways/ColorwayAddWidget";
import TagsEditWidget from "../tags/TagsEditWidget";
import PageWithSidebar from "../general/PageWithSidebar";
import ImageGallery from "../general/ImageGallery";

export default function YarnPage(props) {
	const {yarnID} = useParams();
	const yarn = useSelector(state => selectYarnByID(state, yarnID));
	const is404 = yarn === undefined;

	return is404 ? <Redirect to="/" /> : (
		<div className="YarnPage">
			<PageWithSidebar 
				content={<>
					<h2>Yarn Brand: {yarn.brand}</h2>
					<h2>Yarn Name: {yarn.name}</h2>
					{yarn.comment && <Markdown>{yarn.comment}</Markdown>}
					<h3>Colorways:</h3>
					<ColorwayList yarnID={yarnID} />
					<h3>Gallery:</h3>
					<ImageGallery images={yarn.images} />
				</>}
				sidebar={<>
					<YarnEditWidget yarnID={yarnID} />
					<TagsEditWidget yarnID={yarnID} />
					<ColorwayAddWidget yarnID={yarnID} />
					<YarnDeleteWidget yarnID={yarnID} />
				</>}
			/>
		</div>
	);
}