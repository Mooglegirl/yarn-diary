import {Switch, Route, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

import {yarnSearchSubmitted} from "../slices/yarnsSlice";
import {screenResized} from "../slices/uiSlice";
import {allModalsClosed} from "../slices/modalsSlice";

import "./App.scss";
import HomePage from "./general//HomePage";
import YarnPage from "./yarns/YarnPage";
import ColorwayPage from "./colorways/ColorwayPage";
import TagPage from "./tags/TagPage";
import Navbar from "./general/Navbar";
import BackToTop from "./general/BackToTop";

export default function App(props) {
  const dispatch = useDispatch();
  const location = useLocation();

  // update screen size in store
  useEffect(() => {
    const handleWindowResize = () => dispatch(screenResized(window.innerWidth));
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [dispatch]);

  // wipe search query when leaving the site
  // this is a substitute for using nested persist reducers to blacklist this part of the store, two layers deep
  // (this way we have just one storage entry to make backup/restore simple)
  useEffect(() => {
    const wipeSearch = () => {
      document.body.style.display = "none"; // reduce flicker
      dispatch(yarnSearchSubmitted(""));
    };

    window.addEventListener("beforeunload", wipeSearch);
    return () => window.removeEventListener("beforeunload", wipeSearch);
  });

  // scroll to top and close all modals when route changes
  // if more stuff gets added here, should probably refactor it into a single action that many reducers handle
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(allModalsClosed());
  }, [location, dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/yarns/:yarnID" component={YarnPage} />
        <Route path="/yarns/:yarnID/colorways/:colorwayID" component={ColorwayPage} />
        <Route path="/tags/:tagID" component={TagPage} />
      </Switch>
      <BackToTop />
    </div>
  );
}
