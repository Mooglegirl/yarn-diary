import { combineReducers } from "redux";

import yarnsReducer from "./slices/yarnsSlice";
import colorwaysReducer from "./slices/colorwaysSlice";
import modalsReducer from "./slices/modalsSlice";
import uiReducer from "./slices/uiSlice";

const rootReducer = combineReducers({
	yarns: yarnsReducer,
	colorways: colorwaysReducer,
	modals: modalsReducer,
	ui: uiReducer
});

export default rootReducer;