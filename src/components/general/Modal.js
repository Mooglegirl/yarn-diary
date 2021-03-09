import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";

import Button from "./Button";

import {modalClosed, selectModalStateByName} from "../../slices/modalsSlice";

import "./Modal.scss";

// portal code repurposed from: https://medium.com/@jc_perez_ch/dynamic-react-portals-with-hooks-ddeb127fa516
export default function Modal(props) {
	const dispatch = useDispatch();
	const modalName = props.modalName;
	const isActive = useSelector(state => selectModalStateByName(state, modalName));

	const elRef = useRef(document.createElement("div"));
	useEffect(() => {
		const el = elRef.current;
		el.id = "modal_" + modalName;
		if(isActive) document.body.appendChild(el);
		return () => { if(isActive && el.parentElement) el.parentElement.removeChild(el); }
	}, [modalName, isActive]);

	const options = {
		showOKButton: false,
		okButtonText: "OK",
		closeOnOverlayClick: true,
		showXButton: true,
		...props.options
	};

	const handleCloseClick = () => {
		dispatch(modalClosed(modalName));
	};

	return isActive && createPortal((
		<div className={`Modal ${props.className ? props.className : ""}`}>
			<div className="Modal__overlay" onClick={options.closeOnOverlayClick ? handleCloseClick : undefined} />
			<div className="Modal__inner">
				{options.showXButton && <div className="Modal__close" onClick={handleCloseClick}>&times;</div>}
				{props.children}
				{options.showOKButton && <Button handleClick={handleCloseClick}>{options.okButtonText}</Button>}
			</div>
		</div>
	), elRef.current);
}
