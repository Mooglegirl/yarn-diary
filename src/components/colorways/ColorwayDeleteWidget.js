import {useDispatch} from "react-redux";

import {modalOpened, modalClosed, colorwayDeleteModalSubmitted} from "../../slices/modalsSlice";

import Button from "../general/Button";
import {ReactComponent as DeleteIcon} from "../../resources/delete.svg";
import Modal from "../general/Modal";

export default function ColorwayDeleteWidget(props) {
	const {colorwayID} = props;
	const dispatch = useDispatch();
	const modalName = "colorwayDelete";

	return (
		<div className="ColorwayDeleteWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={DeleteIcon} buttonType="danger">Delete Colorway</Button>
			<Modal modalName={modalName}>
				<p>Are you sure you want to delete this colorway?</p>
				<div>
					<Button handleClick={() => dispatch(modalClosed(modalName))}>Cancel</Button>
					<Button handleClick={() => dispatch(colorwayDeleteModalSubmitted(colorwayID))} buttonType="danger">Yes, delete</Button>
				</div>
			</Modal>
		</div>
	);
}