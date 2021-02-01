import {nanoid} from "nanoid";
import {createSlice, createEntityAdapter} from "@reduxjs/toolkit";

const colorwaysAdapter = createEntityAdapter();
const initialState = colorwaysAdapter.getInitialState();

const colorwaysSlice = createSlice({
	name: "colorways",
	initialState: initialState,
	reducers: {
		colorwayAdded: {
			prepare(yarnID, name) {
				return {
					payload: {
						id: nanoid(),
						yarnID,
						name,
						comment: ""
					}
				}
			},
			reducer: colorwaysAdapter.addOne
		}
	}
});

export const {colorwayAdded} = colorwaysSlice.actions;
export default colorwaysSlice.reducer;

// regular selector
// can't memoize due to needing the yarnID param
// if performance is a concern, could move this into YarnCard and use the prop instead
export const selectColorwaysByYarnID = (state, yarnID) => {
	const colorwayIDs = Object.keys(state.colorways.entities).filter(colorwayID => {
		return parseInt(state.colorways.entities[colorwayID].yarnID) === parseInt(yarnID);
	});

	const result = [];
	colorwayIDs.forEach(colorwayID => {
		result.push({
			id: colorwayID,
			...state.colorways.entities[colorwayID]
		});
	});

	return result;
};
