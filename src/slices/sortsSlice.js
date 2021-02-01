import {createSlice} from "@reduxjs/toolkit";

const sortsSlice = createSlice({
	name: "sorts",
	initialState: {
		yarnName: false
	},
	reducers: {
		yarnNameSortToggled(state, action) {
			state.yarnName = !state.yarnName;
		}
	}
})

export const {yarnNameSortToggled} = sortsSlice.actions;
export default sortsSlice.reducer;