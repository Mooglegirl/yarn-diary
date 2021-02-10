import {createSlice} from "@reduxjs/toolkit";

// if you need a new modal, just add it here and use it in a Modal component's modalName prop
// then have your action name be formatted like ${modalName}ModalSubmitted
export const ModalNames = Object.freeze({
	yarnEdit: "yarnEdit",
	yarnAdd: "yarnAdd",
	yarnDelete: "yarnDelete",
	colorwayAdd: "colorwayAdd",
	colorwayEdit: "colorwayEdit",
	colorwayDelete: "colorwayDelete"
});

const modalsSlice = createSlice({
	name: "modals",
	initialState: Object.values(ModalNames).reduce((names, key) => ({
		...names,
		[key]: false
	}), {}),
	reducers: {
		modalOpened(state, action) {
			state[action.payload] = true;
		},
		modalClosed(state, action) {
			state[action.payload] = false;
		}
	},
	extraReducers: builder => {
		builder.addMatcher(
			action => action.type.endsWith("ModalSubmitted"),
			(state, action) => { 
				const modalName = action.type.replace(/.*\//, "").replace("ModalSubmitted", "");
				state[modalName] = false;
			}
		)
	}
});

export const {modalOpened, modalClosed} = modalsSlice.actions;
export default modalsSlice.reducer;

export const selectModalStateByName = (state, name) => state.modals[name];