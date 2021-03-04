import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {yarnSearchSubmitted} from "../../slices/yarnsSlice";

import "./YarnSearchBox.scss";
import Button from "../general/Button";
import {ReactComponent as SearchIcon} from "../../resources/search.svg";
import {ReactComponent as InfoIcon} from "../../resources/info.svg";

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
			<div className="YarnSearchBox__tooltip-wrap">
				<div className="YarnSearchBox__tooltip-icon"><InfoIcon /></div>
				<div className="YarnSearchBox__tooltip-popup">
					<p>Hints:</p>
					<ul>
						<li>lion brand basic</li>
						<li>brand[caron]</li>
						<li>name[simply soft]</li>
						<li>brand[red heart] name[solids]</li>
						<li>(Any brand/name tags besides the first are treated as regular search text)</li>
					</ul>
				</div>
			</div>
		</div>
	);
}