import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router";

import {yarnAddModalSubmitted} from "../../slices/yarnsSlice";
import {modalOpened, ModalNames} from "../../slices/modalsSlice";

import Modal from "../general/Modal";
import Button from "../general/Button";
import {ReactComponent as AddIcon} from "../../resources/add.svg";

export default function YarnAddWidget(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const {register, handleSubmit, errors} = useForm();
	const modalName = ModalNames.yarnAdd;

	const handleAddFormSubmit = data => {
    if(errors.yarnBrand || errors.yarnName) return;
    const action = dispatch(yarnAddModalSubmitted(data.yarnBrand, data.yarnName, data.yarnComment));
    history.push(`/yarns/${action.payload.id}`);
	};

	return (
		<div className="YarnAddWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={AddIcon}>Add New Yarn</Button>
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