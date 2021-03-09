import {useDispatch, useSelector} from "react-redux";

import {modalOpened} from "../../slices/modalsSlice";
import {selectAllTags} from "../../slices/tagsSlice";

import Button from "../general/Button";
import {ReactComponent as TagIcon} from "../../resources/tag.svg";
import Modal from "../general/Modal";
import TagButton from "./TagButton";
import Markdown from "../general/Markdown";
import "./AllTagsWidget.scss";

export default function AllTagsWidget(props) {
	const dispatch = useDispatch();
	const modalName = "allTags";
	const tags = useSelector(selectAllTags);
	tags.sort((a, b) => a.id.localeCompare(b.id));

	return (
		<div className="AllTagsWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={TagIcon}>All Tags</Button>
			<Modal modalName={modalName} options={{showOKButton: true, okButtonText: "Close"}}>
				<h3>All Tags</h3>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Comment</th>
						</tr>
					</thead>
					<tbody>
						{tags.map(tag => (
							<tr key={tag.id}>
								<td><TagButton tagID={tag.id} /></td>
								<td><Markdown isInCard={true}>{tag.comment}</Markdown></td>
							</tr>
						))}
					</tbody>
				</table>
			</Modal>
		</div>
	);
}