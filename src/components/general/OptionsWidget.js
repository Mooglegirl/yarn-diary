import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {modalOpened, optionsUpdateModalSubmitted} from "../../slices/modalsSlice";

import "./OptionsWidget.scss";
import Button from "../general/Button";
import Modal from "../general/Modal";
import {ReactComponent as OptionsIcon} from "../../resources/options.svg";

export default function OptionsUpdateWidget(props) {
	const dispatch = useDispatch();
	const modalName = "optionsUpdate";
	const {register, handleSubmit} = useForm();

	const handleFormSubmit = data => {
		dispatch(optionsUpdateModalSubmitted(data));
	};

	const radioData = {
		yarnDisplay: {
			label: "Yarn display (on yarn list)",
			current: useSelector(state => state.yarns.displayMode),
			radios: [
				{
					value: "cards",
					label: "Cards"
				},
				{
					value: "list",
					label: "List"
				}
			]
		},
		colorwayDisplay: {
			label: "Colorway display (on yarn pages)",
			current: useSelector(state => state.colorways.displayMode),
			radios: [
				{
					value: "cards",
					label: "Cards"
				},
				{
					value: "list",
					label: "List"
				}
			]
		},
		yarnSort: {
			label: "Yarn sort method",
			current: useSelector(state => state.yarns.sortMethod),
			radios: [
				{
					value: "alphabetical_az",
					label: "Alphabetical (A-Z)"
				},
				{
					value: "alphabetical_za",
					label: "Alphabetical (Z-A)"
				},
				{
					value: "date_added_oldest_first",
					label: "By date added (oldest first)"
				},
				{
					value: "date_added_newest_first",
					label: "By date added (newest first)"
				},
				{
					value: "last_updated_oldest_first",
					label: "By last updated (oldest first)"
				},
				{
					value: "last_updated_newest_first",
					label: "By last updated (newest first)"
				}
			]
		},
		colorwaySort: {
			label: "Colorway sort method",
			current: useSelector(state => state.colorways.sortMethod),
			radios: [
				{
					value: "alphabetical_az",
					label: "Alphabetical (A-Z)"
				},
				{
					value: "alphabetical_za",
					label: "Alphabetical (Z-A)"
				},
				{
					value: "date_added_oldest_first",
					label: "By date added (oldest first)"
				},
				{
					value: "date_added_newest_first",
					label: "By date added (newest first)"
				},
				{
					value: "last_updated_oldest_first",
					label: "By last updated (oldest first)"
				},
				{
					value: "last_updated_newest_first",
					label: "By last updated (newest first)"
				}
			]
		}
	};

	return (
		<div className="OptionsWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={OptionsIcon}>Options</Button>
			<Modal modalName={modalName}>
				<h3>Options</h3>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					{Object.keys(radioData).map(radioGroupName => (
						<fieldset key={radioGroupName}>
							<legend>{radioData[radioGroupName].label}</legend>
							{radioData[radioGroupName].radios.map(individualRadio => (
								<label key={individualRadio.value}>
									<input ref={register} type="radio" name={radioGroupName} value={individualRadio.value} defaultChecked={radioData[radioGroupName].current === individualRadio.value} />
									{individualRadio.label}
								</label>
							))}
						</fieldset>
					))}
					<input type="submit" value="Save" />
				</form>
			</Modal>
		</div>
	);
}