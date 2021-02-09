import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {modalOpened, ModalNames} from "../slices/modalsSlice";
import {selectYarnByID} from "../slices/yarnsSlice";
import {colorwayAddModalSubmitted} from "../slices/colorwaysSlice";

import Modal from "./Modal";
import Button from "./Button";
import addIcon from "../resources/add.svg";

export default function ColorwayAddWidget({yarnID}) {
	const dispatch = useDispatch();
	const {register, handleSubmit, errors} = useForm();
	const modalName = ModalNames.colorwayAdd;
	const yarn = useSelector(state => selectYarnByID(state, yarnID));

	const handleAddFormSubmit = data => {
		if(errors.colorwayName) return;
		dispatch(colorwayAddModalSubmitted(yarnID, data.colorwayName, data.colorwayComment));
	};

	return (
		<div className="ColorwayAddWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={addIcon}>Add New Colorway</Button>
			<Modal modalName={modalName} options={{closeOnOverlayClick: false}}>
				<p>Adding new colorway for {yarn.brand} {yarn.name}</p>
				<form onSubmit={handleSubmit(handleAddFormSubmit)}>
					<label>
						Name
						<input type="text" name="colorwayName" ref={register({required: true})} className={errors.colorwayName ? "has-error" : ""} />
					</label>
					<label>
						Comment
						<textarea name="colorwayComment" ref={register} />
					</label>
					<input type="submit" value="Add" />
				</form>
			</Modal>
		</div>
	);
}