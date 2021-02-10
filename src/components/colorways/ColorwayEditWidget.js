import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {modalOpened, ModalNames} from "../../slices/modalsSlice";
import {colorwayEditModalSubmitted, selectColorwayByID} from "../../slices/colorwaysSlice";

import Button from "../general/Button";
import {ReactComponent as EditIcon} from "../../resources/edit.svg";
import Modal from "../general/Modal";

export default function ColorwayEditWidget(props) {
	const {colorwayID} = props;
	const dispatch = useDispatch();
	const currentColorway = useSelector(state => selectColorwayByID(state, colorwayID));
	const modalName = ModalNames.colorwayEdit;
	const {register, handleSubmit, errors} = useForm();

	const handleFormSubmit = data => {
		if(errors.colorwayName) return;

		dispatch(colorwayEditModalSubmitted(colorwayID, {
			name: data.colorwayName,
			comment: data.colorwayComment
		}));
	};

	return (
		<div className="ColorwayEditWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={EditIcon}>Edit Colorway</Button>
			<Modal modalName={modalName} options={{closeOnOverlayClick: false}}>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<label>
						Name
						<input type="text" name="colorwayName" ref={register({required: true})} defaultValue={currentColorway.name} className={errors.colorwayName ? "has-error" : ""} />
					</label>
					<label>
						Comment
						<textarea name="colorwayComment" ref={register} defaultValue={currentColorway.comment} />
					</label>
					<input type="submit" value="Update" />
				</form>
			</Modal>
		</div>
	);
}