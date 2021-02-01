import { combineReducers } from "redux";

import yarnsReducer from "./slices/yarnsSlice";
import sortsReducer from "./slices/sortsSlice";
import colorwaysReducer from "./slices/colorwaysSlice";

const rootReducer = combineReducers({
	yarns: yarnsReducer,
	colorways: colorwaysReducer,
	sorts: sortsReducer
});

export default rootReducer;