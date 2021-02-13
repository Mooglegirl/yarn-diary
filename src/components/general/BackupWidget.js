import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";

import {modalOpened} from "../../slices/modalsSlice";
import {PERSIST_KEY} from "../../store";

import "./BackupWidget.scss";
import Button from "../general/Button";
import Modal from "../general/Modal";
import {ReactComponent as BackupIcon} from "../../resources/backup.svg";

export default function BackupWidget(props) {
	const dispatch = useDispatch();
	const modalName = "backupRestore";
	const {register, handleSubmit} = useForm();
	const localStorageKey = "persist:" + PERSIST_KEY;

	const handleFormSubmit = data => {
		localStorage.setItem(localStorageKey, data.backupData);
		window.location.pathname = "/";
	};

	return (
		<div className="BackupWidget">
			<Button handleClick={() => dispatch(modalOpened(modalName))} icon={BackupIcon}>Backup</Button>
			<Modal modalName={modalName}>
				<h3>Backup/Restore</h3>
				<p>
					All yarn data is stored locally on your browser, so your data won't carry over to other
					devices/browsers and may be erased if you clear your site storage or use a browser cleaner.
				</p>
				<p>
					The box below contains all of your data. To back it up, copy and paste it into a separate
					document. To restore, replace the data below with your backup and click Submit.
				</p>
				<p>
					Restoring will overwrite all yarn data in your current browser and cannot be undone.
				</p>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<textarea name="backupData" ref={register} defaultValue={localStorage.getItem(localStorageKey)} />
					<input type="submit" value="Submit" />
				</form>
			</Modal>
		</div>
	);
}