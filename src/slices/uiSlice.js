import {createSlice} from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "ui",
	initialState: {
		screenWidth: window.innerwidth
	},
	reducers: {
		screenResized(state, action) {
			state.screenWidth = action.payload;
		}
	}
});

export const {screenResized} = uiSlice.actions;
export default uiSlice.reducer;
export const selectScreenWidth = state => state.ui.screenWidth;