import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import "./Markdown.scss";

export default function Markdown(props) {
	const extraProps = props.isInCard ? {
		disallowedTypes: ["heading"],
		unwrapDisallowed: true
	} : {};

	return (
		<div className="Markdown">
			<ReactMarkdown {...props} {...extraProps} plugins={[gfm]}>{props.children}</ReactMarkdown>
		</div>
	);
}