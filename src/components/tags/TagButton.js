import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {selectTagColorByID} from "../../slices/tagsSlice";

import "./TagButton.scss";

export default function TagButton(props) {
	const {tagID} = props;
	const tagBG = useSelector(state => selectTagColorByID(state, tagID));
	let isLight = true;

	// https://awik.io/determine-color-bright-dark-using-javascript/
	if(!!tagBG) {
		const color = +("0x" + tagBG.slice(1).replace(tagBG.length < 5 && /./g, '$&$&'));
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
		<Link to={`/tags/${tagID}`} className="TagButton" style={{
			backgroundColor: tagBG,
			color: isLight ? "#000" : "#fff"
		}}>{tagID}</Link>
	);
}