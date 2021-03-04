import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {selectTagsByYarnID} from "../../slices/yarnsSlice";
import {selectTagsByColorwayID} from "../../slices/colorwaysSlice";

import "./TagList.scss";

export default function TagList(props) {
	const yarnTags = useSelector(state => selectTagsByYarnID(state, props.yarnID));
	const colorwayTags = useSelector(state => selectTagsByColorwayID(state, props.colorwayID));
	const tags = yarnTags.length > 0 ? yarnTags : colorwayTags;

	return (
		<div className="TagList">{tags.map(tag => (
			<Link to={`/tags/${tag}`} className="TagList__tag" key={tag}>{tag}</Link>
		))}</div>
	);
}