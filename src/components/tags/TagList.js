import {useSelector} from "react-redux";

import {selectTagsByYarnID} from "../../slices/yarnsSlice";
import {selectTagsByColorwayID} from "../../slices/colorwaysSlice";

import "./TagList.scss";

export default function TagList(props) {
	const yarnTags = useSelector(state => selectTagsByYarnID(state, props.yarnID));
	const colorwayTags = useSelector(state => selectTagsByColorwayID(state, props.colorwayID));
	const tags = yarnTags.length > 0 ? yarnTags : colorwayTags;

	return (
		<div className="TagList">{tags.map(tag => (
			<div className="TagList__tag" key={tag}>{tag}</div>
		))}</div>
	);
}