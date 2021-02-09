import {useDispatch} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {yarnNameSortToggled} from "../slices/sortsSlice";

import "./App.scss";
import YarnList from "./YarnList";
import YarnPage from "./YarnPage";
import YarnAddWidget from "./YarnAddWidget";

function App(props) {
  const dispatch = useDispatch();

	const handleYarnSortClick = () => {
    dispatch(yarnNameSortToggled());
	};

  return (
    <Router>
      <div className="App">
      	<Switch>
          <Route exact path="/">
            <YarnAddWidget />
            <YarnList />
            <button onClick={handleYarnSortClick}>Toggle Yarn Name Sort</button>
          </Route>
          <Route path="/yarns/:yarnID">
            <YarnPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
