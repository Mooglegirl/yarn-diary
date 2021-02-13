import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router";

import {modalOpened, colorwayAddModalSubmitted} from "../../slices/modalsSlice";
import {selectYarnByID} from "../../slices/yarnsSlice";
import {selectColorwaysByYarnIDAndName} from "../../slices/colorwaysSlice";

import Modal from "../general/Modal";
import Button from "../general/Button";
import {ReactComponent as AddIcon} from "../../resources/add.svg";

export default function ColorwayAddWidget(props) {
	const {yarnID} = props;
	const dispatch = useDispatch();
	const history = useHistory();
	const {register, handleSubmit, errors, watch} = useForm();
	const modalName = "colorwayAdd";
	const yarn = useSelector(state => selectYarnByID(state, yarnID));

	const nameWatcher = watch("colorwayName", "");
	const existingColorway = useSelector(state => selectColorwaysByYarnIDAndName(state, {yarnID: yarnID, name: nameWatcher}))[0];

	const hasAnyError = errors.colorwayName || !!existingColorway;

	const handleAddFormSubmit = data => {
		if(hasAnyError) return;
		const action = dispatch(colorwayAddModalSubmitted(yarnID, data.colorwayName, data.colorwayComment, data.colorwayImages));
		history.push(`/yarns/${yarnID}/colorways/${action.payload.id}`);
	};

	return (
		<div className="ColorwayAddWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={AddIcon}>Add New Colorway</Button>
			<Modal modalName={modalName} options={{closeOnOverlayClick: false}}>
				<h3>Add New Colorway - {yarn.brand} {yarn.name}</h3>
				<form onSubmit={handleSubmit(handleAddFormSubmit)}>
					<label>
						Name
						<input type="text" name="colorwayName" ref={register({required: true})} className={errors.colorwayName ? "has-error" : ""} />
					</label>
					<label>
						Comment (<a href="https://commonmark.org/help/" target="_blank" rel="noreferrer">markdown supported</a>)
						<textarea name="colorwayComment" ref={register} />
					</label>
					<label>
						Image URLs (separate with line breaks)
						<textarea name="colorwayImages" ref={register} />
					</label>
					{!!existingColorway && <p className="error">Colorway already exists on this yarn</p>}
					<input type="submit" value="Add" disabled={hasAnyError} />
				</form>
			</Modal>
		</div>
	);
}