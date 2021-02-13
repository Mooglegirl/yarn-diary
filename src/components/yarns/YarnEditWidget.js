import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {modalOpened, yarnEditModalSubmitted} from "../../slices/modalsSlice";
import {selectYarnByID, selectYarnsByFullName} from "../../slices/yarnsSlice";

import Button from "../general/Button";
import {ReactComponent as EditIcon} from "../../resources/edit.svg";
import Modal from "../general/Modal";

export default function YarnEditWidget(props) {
	const {yarnID} = props;
	const dispatch = useDispatch();
	const currentYarn = useSelector(state => selectYarnByID(state, yarnID));
	const modalName = "yarnEdit";
	const {register, handleSubmit, errors, watch} = useForm();

	const brandWatcher = watch("yarnBrand", "");
	const nameWatcher = watch("yarnName", "");
	const existingYarn = useSelector(state => selectYarnsByFullName(state, {brand: brandWatcher, name: nameWatcher}))[0];
	const existingYarnIsNotThisOne = existingYarn && existingYarn.id !== yarnID;

	const hasAnyError = errors.yarnBrand || errors.yarnName || existingYarnIsNotThisOne;

	const handleFormSubmit = data => {
		if(hasAnyError) return;
		dispatch(yarnEditModalSubmitted(yarnID, {
			brand: data.yarnBrand,
			name: data.yarnName,
			comment: data.yarnComment,
			images: data.yarnImages
		}));
	};

	return (
		<div className="YarnEditWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={EditIcon}>Edit Yarn</Button>
			<Modal modalName={modalName} options={{closeOnOverlayClick: false}}>
				<h3>Edit Yarn</h3>
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
						Comment (<a href="https://commonmark.org/help/" target="_blank" rel="noreferrer">markdown supported</a>)
						<textarea name="yarnComment" ref={register} defaultValue={currentYarn.comment} />
					</label>
					<label>
						Image URLs (separate with line breaks)
						<textarea name="yarnImages" ref={register} defaultValue={currentYarn.images} />
					</label>
					{existingYarnIsNotThisOne && <p className="error">Other yarn with that name already exists</p>}
					<input type="submit" value="Update" disabled={hasAnyError} />
				</form>
			</Modal>
		</div>
	);
}