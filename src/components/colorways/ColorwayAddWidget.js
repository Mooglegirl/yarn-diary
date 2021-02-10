import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router";

import {modalOpened, ModalNames} from "../../slices/modalsSlice";
import {selectYarnByID} from "../../slices/yarnsSlice";
import {colorwayAddModalSubmitted} from "../../slices/colorwaysSlice";

import Modal from "../general/Modal";
import Button from "../general/Button";
import {ReactComponent as AddIcon} from "../../resources/add.svg";

export default function ColorwayAddWidget({yarnID}) {
	const dispatch = useDispatch();
	const history = useHistory();
	const {register, handleSubmit, errors} = useForm();
	const modalName = ModalNames.colorwayAdd;
	const yarn = useSelector(state => selectYarnByID(state, yarnID));

	const handleAddFormSubmit = data => {
		if(errors.colorwayName) return;
		const action = dispatch(colorwayAddModalSubmitted(yarnID, data.colorwayName, data.colorwayComment, data.colorwayImages));
		history.push(`/yarns/${yarnID}/colorways/${action.payload.id}`);
	};

	return (
		<div className="ColorwayAddWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={AddIcon}>Add New Colorway</Button>
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
					<label>
						Image URLs (separate with line breaks)
						<textarea name="colorwayImages" ref={register} />
					</label>
					<input type="submit" value="Add" />
				</form>
			</Modal>
		</div>
	);
}