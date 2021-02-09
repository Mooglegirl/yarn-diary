import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";

import {yarnAddModalSubmitted} from "../slices/yarnsSlice";
import {modalOpened, ModalNames} from "../slices/modalsSlice";

import Modal from "./Modal";
import Button from "./Button";
import addIcon from "../resources/add.svg";

export default function YarnAddWidget(props) {
	const dispatch = useDispatch();
	const {register, handleSubmit, errors} = useForm();
	const modalName = ModalNames.yarnAdd;

	const handleAddFormSubmit = data => {
    if(errors.yarnBrand || errors.yarnName) return;
    dispatch(yarnAddModalSubmitted(data.yarnBrand, data.yarnName, data.yarnComment));
	};

	return (
		<div className="YarnAddWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={addIcon}>Add New Yarn</Button>
			<Modal modalName={modalName} options={{closeOnOverlayClick: false}}>
				<form onSubmit={handleSubmit(handleAddFormSubmit)}>
				  <label>
				    Brand
				    <input type="text" name="yarnBrand" ref={register({required: true})} className={errors.yarnBrand ? "has-error" : ""} />
				  </label>
				  <label>
				    Name
				    <input type="text" name="yarnName" ref={register({required: true})} className={errors.yarnName ? "has-error" : ""} />
				  </label>
				  <label>
				  	Comment
				  	<textarea name="yarnComment" ref={register} />
				  </label>
				  <input type="submit" value="Add" />
				</form>
			</Modal>
		</div>
	);
}