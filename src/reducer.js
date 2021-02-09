import { combineReducers } from "redux";

import yarnsReducer from "./slices/yarnsSlice";
import sortsReducer from "./slices/sortsSlice";
import colorwaysReducer from "./slices/colorwaysSlice";
import modalsReducer from "./slices/modalsSlice";

const rootReducer = combineReducers({
	yarns: yarnsReducer,
	colorways: colorwaysReducer,
	sorts: sortsReducer,
	modals: modalsReducer
});

export default rootReducer;