import {BrowserRouter as Router, Switch, Route, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

import {screenResized} from "../slices/uiSlice";

import "./App.scss";
import HomePage from "./general//HomePage";
import YarnPage from "./yarns/YarnPage";
import ColorwayPage from "./colorways/ColorwayPage";
import Navbar from "./general/Navbar";
import BackToTop from "./general/BackToTop";

function AutoScrollToTopOnNav() {
  const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleWindowResize = () => dispatch(screenResized(window.innerWidth));
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [dispatch]);

  return (
    <Router>
      <AutoScrollToTopOnNav />
      <div className="App">
        <Navbar />
      	<Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/yarns/:yarnID" component={YarnPage} />
          <Route path="/yarns/:yarnID/colorways/:colorwayID" component={ColorwayPage} />
        </Switch>
        <BackToTop />
      </div>
    </Router>
  );
}
