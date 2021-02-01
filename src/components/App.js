import { useInputValues } from "../extras/utils";
import { useDispatch } from "react-redux";

import {yarnAdded} from "../slices/yarnsSlice";
import {yarnNameSortToggled} from "../slices/sortsSlice";

import "./App.scss";
import YarnList from "./YarnList";

function App(props) {
  const dispatch = useDispatch();
  const [inputValues, setInputValues, handleInputChange] = useInputValues({
    yarnBrand: "",
    yarnName: ""
  });

	const handleAddBtnClick = () => {
    dispatch(yarnAdded(inputValues.yarnBrand, inputValues.yarnName));
    setInputValues({
      yarnBrand: "",
      yarnName: ""
    });
	};

	const handleYarnSortClick = () => {
    dispatch(yarnNameSortToggled());
	};

  return (
    <div className="App">
    	<YarnList />
      <label>
      	Brand
      	<input type="text" name="yarnBrand" onChange={handleInputChange} value={inputValues.yarnBrand} />
      </label>
      <label>
      	Name
      	<input type="text" name="yarnName" onChange={handleInputChange} value={inputValues.yarnName} />
      </label>
      <button onClick={handleAddBtnClick}>Add Yarn</button><br/>
      <button onClick={handleYarnSortClick}>Toggle Yarn Name Sort</button>
    </div>
  );
}

export default App;
