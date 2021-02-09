import {createSlice, createEntityAdapter, nanoid, createSelector} from "@reduxjs/toolkit";

const colorwaysAdapter = createEntityAdapter();
const initialState = colorwaysAdapter.getInitialState();

const colorwaysSlice = createSlice({
	name: "colorways",
	initialState: initialState,
	reducers: {
		colorwayAddModalSubmitted: {
			prepare(yarnID, name, comment) {
				return {
					payload: {
						id: nanoid(),
						yarnID,
						name,
						comment: comment,
						dateAdded: new Date().toISOString(),
						lastUpdated: new Date().toISOString()
					}
				}
			},
			reducer: colorwaysAdapter.addOne
		}
	}
});

export const {colorwayAddModalSubmitted} = colorwaysSlice.actions;
export default colorwaysSlice.reducer;

export const {
	selectAll: selectAllColorways
} = colorwaysAdapter.getSelectors(state => state.colorways);

export const selectColorwaysByYarnID = createSelector(
	selectAllColorways,
	(state, yarnID) => yarnID, // pass through yarnID param
	(colorways, yarnID) => colorways.filter(c => c.yarnID === yarnID)
);
