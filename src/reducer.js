import { combineReducers } from "redux";

import yarnsReducer from "./slices/yarnsSlice";
import colorwaysReducer from "./slices/colorwaysSlice";
import modalsReducer from "./slices/modalsSlice";

const rootReducer = combineReducers({
	yarns: yarnsReducer,
	colorways: colorwaysReducer,
	modals: modalsReducer
});

export default rootReducer;