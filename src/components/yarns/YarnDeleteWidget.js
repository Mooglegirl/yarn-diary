import {useDispatch} from "react-redux";

import {modalOpened, modalClosed, yarnDeleteModalSubmitted} from "../../slices/modalsSlice";

import Button from "../general/Button";
import {ReactComponent as DeleteIcon} from "../../resources/delete.svg";
import Modal from "../general/Modal";

export default function YarnDeleteWidget(props) {
	const {yarnID} = props;
	const dispatch = useDispatch();
	const modalName = "yarnDelete";

	return (
		<div className="YarnDeleteWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={DeleteIcon} buttonType="danger">Delete Yarn</Button>
			<Modal modalName={modalName}>
				<p>Are you sure you want to delete this yarn? This will also delete all its colorways.</p>
				<div>
					<Button handleClick={() => dispatch(modalClosed(modalName))}>Cancel</Button>
					<Button handleClick={() => dispatch(yarnDeleteModalSubmitted(yarnID))} buttonType="danger">Yes, delete</Button>
				</div>
			</Modal>
		</div>
	);
}