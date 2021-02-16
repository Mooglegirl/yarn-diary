import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {Link} from "react-router-dom";

import "./Markdown.scss";

// render all non-external links as <Link> components
function RouterLink(props) {
	return (
		props.href.match(/^(https?:)?\/\//) ?
			<a href={props.href}>{props.children}</a> :
			<Link to={props.href}>{props.children}</Link>
	);
}

export default function Markdown(props) {
	const extraProps = props.isInCard ? {
		disallowedTypes: ["heading"],
		unwrapDisallowed: true
	} : {};

	return (
		<div className="Markdown">
			<ReactMarkdown 
				{...props} {...extraProps} 
				plugins={[gfm]}
				renderers={{link: RouterLink}}
			>
				{props.children}
			</ReactMarkdown>
		</div>
	);
}