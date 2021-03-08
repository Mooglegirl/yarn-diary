import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {modalOpened, tagMetaEditModalSubmitted} from "../../slices/modalsSlice";

import Button from "../general/Button";
import {ReactComponent as EditIcon} from "../../resources/edit.svg";
import Modal from "../general/Modal";

export default function TagCommentEditWidget(props) {
	const {tagID} = props;
	const dispatch = useDispatch();
	const currentTag = useSelector(state => state.tags.entities[tagID]);
	const modalName = "tagMetaEdit";
	const {register, handleSubmit} = useForm();

	const handleFormSubmit = data => {
		dispatch(tagMetaEditModalSubmitted(tagID, data.tagComment, data.tagColor));
	};

	return (
		<div className="TagCommentEditWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={EditIcon}>Edit Tag</Button>
			<Modal modalName={modalName} options={{closeOnOverlayClick: false}}>
				<h3>Edit Tag</h3>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<label>
						Comment (<a href="https://commonmark.org/help/" target="_blank" rel="noreferrer">markdown supported</a>)
						<textarea name="tagComment" ref={register} defaultValue={currentTag.comment} />
					</label>
					<label>
						Color
						<input type="color" name="tagColor" ref={register} defaultValue={currentTag.color} />
					</label>
					<input type="submit" value="Update" />
				</form>
			</Modal>
		</div>
	);
}