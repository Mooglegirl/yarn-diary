import {useDispatch, useSelector} from "react-redux";

import {modalClosed, selectModalStateByName} from "../../slices/modalsSlice";

import "./Modal.scss";

export default function Modal(props) {
	const dispatch = useDispatch();
	const modalName = props.modalName;
	const isActive = useSelector(state => selectModalStateByName(state, modalName));

	const options = {
		showOKButton: false,
		okButtonText: "OK",
		closeOnOverlayClick: true,
		showXButton: true,
		...props.options
	};

	const handleCloseClick = () => {
		dispatch(modalClosed(modalName));
	}

	return isActive && (
		<div className={`${props.className} Modal`}>
			<div className="Modal__overlay" onClick={options.closeOnOverlayClick ? handleCloseClick : undefined} />
			<div className="Modal__inner">
				{options.showXButton && <div className="Modal__close" onClick={handleCloseClick}>&times;</div>}
				{props.children}
				{options.showOKButton && <button onClick={handleCloseClick}>{options.okButtonText}</button>}
			</div>
		</div>
	);
}