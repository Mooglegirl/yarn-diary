import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {modalOpened, tagsEditModalSubmitted} from "../../slices/modalsSlice";
import {selectTagNamesByYarnID} from "../../slices/yarnsSlice";
import {selectTagNamesByColorwayID} from "../../slices/colorwaysSlice";

import Modal from "../general/Modal";
import Button from "../general/Button";
import {ReactComponent as TagIcon} from "../../resources/tag.svg";

export default function TagsEditWidget(props) {
	const dispatch = useDispatch();
	const {register, handleSubmit} = useForm();
	const modalName = "tagsEdit";

	const existingYarnTags = useSelector(state => selectTagNamesByYarnID(state, props.yarnID));
	const existingColorwayTags = useSelector(state => selectTagNamesByColorwayID(state, props.colorwayID));

	const handleEditFormSubmit = data => {
		dispatch(tagsEditModalSubmitted(
			data.tags.split(",").map(tag => tag.trim()).filter(tag => !!tag),
			props.yarnID,
			props.colorwayID
		));
	};

	return (
		<div className="TagsEditWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={TagIcon}>Edit Tags</Button>
			<Modal modalName={modalName} options={{closeOnOverlayClick: false}}>
				<h3>Edit Tags</h3>
				<form onSubmit={handleSubmit(handleEditFormSubmit)}>
					<label>
						Separate tags with commas
						<textarea name="tags" ref={register} defaultValue={existingYarnTags || existingColorwayTags} />
					</label>
					<input type="submit" value="Update" />
				</form>
			</Modal>
		</div>
	);
}