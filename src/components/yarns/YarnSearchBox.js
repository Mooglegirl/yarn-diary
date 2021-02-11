import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import {yarnSearchSubmitted} from "../../slices/yarnsSlice";

import "./YarnSearchBox.scss";
import Button from "../general/Button";
import {ReactComponent as SearchIcon} from "../../resources/search.svg";

export default function YarnSearchBox(props) {
	const dispatch = useDispatch();
	const {register, handleSubmit, setValue} = useForm();
	const defaultSearchValue = useSelector(state => state.yarns.searchValue);

	const handleSearchSubmit = data => {
		dispatch(yarnSearchSubmitted(data.yarnSearch));
	}

	const handleInputKeyPress = e => {
		if(e.key === "Enter") {
			handleSubmit(handleSearchSubmit)();
		}
	};

	const handleSearchClear = () => {
		setValue("yarnSearch", "");
		handleSubmit(handleSearchSubmit)();
	};

	return (
		<div className="YarnSearchBox">
			<input type="text" name="yarnSearch" ref={register} defaultValue={defaultSearchValue} placeholder="Search yarns" onKeyPress={handleInputKeyPress} />
			<Button handleClick={handleSubmit(handleSearchSubmit)} icon={SearchIcon} />
			<Button handleClick={handleSearchClear}>Clear</Button>
		</div>
	);
}