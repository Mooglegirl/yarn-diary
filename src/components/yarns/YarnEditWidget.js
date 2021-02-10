import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {modalOpened, ModalNames} from "../../slices/modalsSlice";
import {yarnEditModalSubmitted, selectYarnByID} from "../../slices/yarnsSlice";

import Button from "../general/Button";
import {ReactComponent as EditIcon} from "../../resources/edit.svg";
import Modal from "../general/Modal";

export default function YarnEditWidget(props) {
	const {yarnID} = props;
	const dispatch = useDispatch();
	const currentYarn = useSelector(state => selectYarnByID(state, yarnID));
	const modalName = ModalNames.yarnEdit;
	const {register, handleSubmit, errors} = useForm();

	const handleFormSubmit = data => {
		if(errors.yarnBrand || errors.yarnName) return;

		dispatch(yarnEditModalSubmitted(yarnID, {
			brand: data.yarnBrand,
			name: data.yarnName,
			comment: data.yarnComment
		}));
	};

	return (
		<div className="YarnEditWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={EditIcon}>Edit Yarn</Button>
			<Modal modalName={modalName} options={{closeOnOverlayClick: false}}>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<label>
						Brand
						<input type="text" name="yarnBrand" ref={register({required: true})} defaultValue={currentYarn.brand} className={errors.yarnBrand ? "has-error" : ""} />
					</label>
					<label>
						Name
						<input type="text" name="yarnName" ref={register({required: true})} defaultValue={currentYarn.name} className={errors.yarnName ? "has-error" : ""} />
					</label>
					<label>
						Comment
						<textarea name="yarnComment" ref={register} defaultValue={currentYarn.comment} />
					</label>
					<input type="submit" value="Update" />
				</form>
			</Modal>
		</div>
	);
}