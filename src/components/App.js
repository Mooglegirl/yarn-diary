import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

import {screenResized} from "../slices/uiSlice";

import "./App.scss";
import HomePage from "./general//HomePage";
import YarnPage from "./yarns/YarnPage";
import ColorwayPage from "./colorways/ColorwayPage";
import Navbar from "./general/Navbar";

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleWindowResize = () => dispatch(screenResized(window.innerWidth));
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [dispatch]);

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
