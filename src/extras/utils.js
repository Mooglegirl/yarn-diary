import { useState } from "react";

export function useInputValues(defautlValues) {
	const [inputValues, setInputValues] = useState(defautlValues);

	const handleInputChange = e => setInputValues({
	  ...inputValues,
	  [e.target.name]: e.target.value
	});

	return [inputValues, setInputValues, handleInputChange];
}
