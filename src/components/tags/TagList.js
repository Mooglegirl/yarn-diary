import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {selectTagsByYarnID} from "../../slices/yarnsSlice";
import {selectTagsByColorwayID} from "../../slices/colorwaysSlice";
import {selectTagColorsByIDs} from "../../slices/tagsSlice";

import "./TagList.scss";

export default function TagList(props) {
	const yarnTags = useSelector(state => selectTagsByYarnID(state, props.yarnID));
	const colorwayTags = useSelector(state => selectTagsByColorwayID(state, props.colorwayID));
	const tags = yarnTags.length > 0 ? yarnTags : colorwayTags;
	const colorData = useSelector(state => selectTagColorsByIDs(state, tags));

	return (
		<div className="TagList">{tags.map(tag => {
			const bg = colorData[tag];
			let isLight = true;

			// https://awik.io/determine-color-bright-dark-using-javascript/
			if(!!bg) {
				const color = +("0x" + bg.slice(1).replace(bg.length < 5 && /./g, '$&$&'));
	      const r = color >> 16;
	      // eslint-disable-next-line no-mixed-operators
	      const g = color >> 8 & 255;
	      const b = color & 255;
	      const hsp = Math.sqrt(
			    0.299 * (r * r) +
			    0.587 * (g * g) +
			    0.114 * (b * b)
		    );

		    isLight = hsp > 127.5;
			}

			return (
				<Link to={`/tags/${tag}`} className="TagList__tag" key={tag} style={{
					backgroundColor: bg,
					color: isLight ? "#000" : "#fff"
				}}>{tag}</Link>
			);
		})}</div>
	);
}