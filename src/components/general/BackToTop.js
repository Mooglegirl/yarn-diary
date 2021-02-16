import {useEffect, useState} from "react";

import "./BackToTop.scss";
import {ReactComponent as BackToTopIcon} from "../../resources/back-to-top.svg";

export default function BackToTop(props) {
	const [scrollPos, setScrollPos] = useState();

	useEffect(() => {
		const handleScroll = () => setScrollPos(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		scrollPos > 200 && <div className="BackToTop" onClick={() => window.scrollTo({top: 0, left: 0, behavior: "smooth"})}>
		  <BackToTopIcon />
		</div>
	);
}