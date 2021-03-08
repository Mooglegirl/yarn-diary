import {useParams, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

import {selectYarnIDsByTag} from "../../slices/yarnsSlice";
import {selectColorwayIDsByTag} from "../../slices/colorwaysSlice";

import Markdown from "../general/Markdown";
import PageWithSidebar from "../general/PageWithSidebar";
import CardList from "../general/CardList";
import YarnCard from "../yarns/YarnCard";
import ColorwayCard from "../colorways/ColorwayCard";
import TagMetaEditWidget from "./TagMetaEditWidget";
import TagButton from "./TagButton";
import TagDeleteWidget from "./TagDeleteWidget";

export default function TagPage(props) {
	const {tagID} = useParams();
	const tag = useSelector(state => state.tags.entities[tagID]);
	const is404 = tag === undefined;

	const yarnIDs = useSelector(state => selectYarnIDsByTag(state, tag ? tag.id : null));
	const colorwayIDs = useSelector(state => selectColorwayIDsByTag(state, tag ? tag.id : null));
	const yarnDisplayMode = useSelector(state => state.yarns.displayMode);
	const colorwayDisplayMode = useSelector(state => state.colorways.displayMode);

	return is404 ? <Redirect to="/" /> : (
		<div className="TagPage">
			<PageWithSidebar
				content={<>
					<h2>Tag: <TagButton tagID={tag.id} /></h2>
					{tag.comment && <Markdown>{tag.comment}</Markdown>}

					<h3>Yarns:</h3>
					<CardList listMode={yarnDisplayMode === "list"}>
						{yarnIDs.length === 0 ? <p>(None)</p> :
							yarnIDs.map(yarnID => <YarnCard id={yarnID} key={yarnID} />)
						}
					</CardList>

					<h3>Colorways:</h3>
					<CardList listMode={colorwayDisplayMode === "list"}>
						{colorwayIDs.length === 0 ? <p>(None)</p> :
							colorwayIDs.map(colorwayID => <ColorwayCard id={colorwayID} key={colorwayID} />)
						}
					</CardList>
				</>}
				sidebar={<>
					<TagMetaEditWidget tagID={tagID} />
					<TagDeleteWidget tagID={tagID} />
				</>}
			/>
		</div>
	);
}