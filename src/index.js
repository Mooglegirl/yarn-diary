import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/lib/integration/react";

import "./index.scss";
import App from "./components/App";
import {store, persistor} from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    	<PersistGate loading={null} persistor={persistor}>
    		<App />
    	</PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
