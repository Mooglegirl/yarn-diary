import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import "./App.scss";
import HomePage from "./general//HomePage";
import YarnPage from "./yarns/YarnPage";
import ColorwayPage from "./colorways/ColorwayPage";
import Navbar from "./general/Navbar";

function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar />
      	<Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/yarns/:yarnID" component={YarnPage} />
          <Route path="/yarns/:yarnID/colorways/:colorwayID" component={ColorwayPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
