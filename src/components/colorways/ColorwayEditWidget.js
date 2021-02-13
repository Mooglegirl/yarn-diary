import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {modalOpened, colorwayEditModalSubmitted} from "../../slices/modalsSlice";
import {selectColorwayByID, selectColorwaysByYarnIDAndName} from "../../slices/colorwaysSlice";

import Button from "../general/Button";
import {ReactComponent as EditIcon} from "../../resources/edit.svg";
import Modal from "../general/Modal";

export default function ColorwayEditWidget(props) {
	const {colorwayID} = props;
	const dispatch = useDispatch();
	const currentColorway = useSelector(state => selectColorwayByID(state, colorwayID));
	const modalName = "colorwayEdit";
	const {register, handleSubmit, errors, watch} = useForm();

	const nameWatcher = watch("colorwayName", "");
	const existingColorway = useSelector(state => selectColorwaysByYarnIDAndName(state, {yarnID: currentColorway.yarnID, name: nameWatcher}))[0];
	const existingColorwayIsNotThisOne = existingColorway && existingColorway.id !== colorwayID;

	const hasAnyError = errors.colorwayName || existingColorwayIsNotThisOne;

	const handleFormSubmit = data => {
		if(hasAnyError) return;
		dispatch(colorwayEditModalSubmitted(colorwayID, {
			name: data.colorwayName,
			comment: data.colorwayComment,
			images: data.colorwayImages
		}));
	};

	return (
		<div className="ColorwayEditWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={EditIcon}>Edit Colorway</Button>
			<Modal modalName={modalName} options={{closeOnOverlayClick: false}}>
				<h3>Edit Colorway</h3>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<label>
						Name
						<input type="text" name="colorwayName" ref={register({required: true})} defaultValue={currentColorway.name} className={errors.colorwayName ? "has-error" : ""} />
					</label>
					<label>
						Comment (<a href="https://commonmark.org/help/" target="_blank" rel="noreferrer">markdown supported</a>)
						<textarea name="colorwayComment" ref={register} defaultValue={currentColorway.comment} />
					</label>
					<label>
						Image URLs (separate with line breaks)
						<textarea name="colorwayImages" ref={register} />
					</label>
					{existingColorwayIsNotThisOne && <p className="error">Other colorway with that name already exists on this yarn</p>}
					<input type="submit" value="Update" disabled={hasAnyError} />
				</form>
			</Modal>
		</div>
	);
}