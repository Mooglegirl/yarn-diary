import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import "./Markdown.scss";

export default function Markdown(props) {
	return (
		<div className="Markdown">
			<ReactMarkdown plugins={[gfm]}>{props.children}</ReactMarkdown>
		</div>
	);
}