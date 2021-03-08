import {useDispatch} from "react-redux";

import {modalOpened, modalClosed, tagDeleteModalSubmitted} from "../../slices/modalsSlice";

import Button from "../general/Button";
import {ReactComponent as DeleteIcon} from "../../resources/delete.svg";
import Modal from "../general/Modal";

export default function TagDeleteWidget(props) {
	const {tagID} = props;
	const dispatch = useDispatch();
	const modalName = "tagDelete";

	return (
		<div className="TagDeleteWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={DeleteIcon} buttonType="danger">Delete Tag</Button>
			<Modal modalName={modalName}>
				<p>Are you sure you want to delete this tag? This will also remove it from all yarns and colorways.</p>
				<div>
					<Button handleClick={() => dispatch(modalClosed(modalName))}>Cancel</Button>
					<Button handleClick={() => dispatch(tagDeleteModalSubmitted(tagID))} buttonType="danger">Yes, delete</Button>
				</div>
			</Modal>
		</div>
	);
}