import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

import {selectYarnsByFullName} from "../../slices/yarnsSlice";
import {modalOpened, yarnAddModalSubmitted} from "../../slices/modalsSlice";

import Modal from "../general/Modal";
import Button from "../general/Button";
import {ReactComponent as AddIcon} from "../../resources/add.svg";

export default function YarnAddWidget(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const {register, handleSubmit, errors, watch} = useForm();
	const modalName = "yarnAdd";

	const brandWatcher = watch("yarnBrand", "");
	const nameWatcher = watch("yarnName", "");
	const existingYarn = useSelector(state => selectYarnsByFullName(state, {brand: brandWatcher, name: nameWatcher}))[0];

	const hasAnyError = errors.yarnBrand || errors.yarnName || !!existingYarn;

	const handleAddFormSubmit = data => {
    if(hasAnyError) return;
    const action = dispatch(yarnAddModalSubmitted(data.yarnBrand, data.yarnName, data.yarnComment, data.yarnImages));
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
				  	Comment (<a href="https://commonmark.org/help/" target="_blank" rel="noreferrer">Markdown supported</a>)
				  	<textarea name="yarnComment" ref={register} />
				  </label>
				  <label>
				  	Image URLs (separate with line breaks)
				  	<textarea name="yarnImages" ref={register} />
				  </label>
				  {!!existingYarn && <p className="error">Yarn already exists</p>}
				  <input type="submit" value="Add" disabled={hasAnyError} />
				</form>
			</Modal>
		</div>
	);
}