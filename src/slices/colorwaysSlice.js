import {createSlice, createEntityAdapter, nanoid, createSelector} from "@reduxjs/toolkit";

import {yarnDeleteModalSubmitted} from "./yarnsSlice";

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
		},
		colorwayEditModalSubmitted: {
			prepare: (id, changes) => ({
				payload: {
					id,
					changes: {
						...changes,
						lastUpdated: new Date().toISOString()
					}
				}
			}),
			reducer: colorwaysAdapter.updateOne
		},
		colorwayDeleteModalSubmitted: colorwaysAdapter.removeOne
	},
	extraReducers: {
		[yarnDeleteModalSubmitted]: (state, action) => {
			const colorwayIDsToDelete = state.ids.filter(cid => state.entities[cid].yarnID === action.payload);
			colorwaysAdapter.removeMany(state, colorwayIDsToDelete);
		}
	}
});

export const {colorwayAddModalSubmitted, colorwayEditModalSubmitted, colorwayDeleteModalSubmitted} = colorwaysSlice.actions;
export default colorwaysSlice.reducer;

export const {
	selectAll: selectAllColorways,
	selectById: selectColorwayByID,
	selectEntities: selectColorwayEntities,
	selectIds: selectColorwayIDs
} = colorwaysAdapter.getSelectors(state => state.colorways);

export const selectColorwaysByYarnID = createSelector(
	selectAllColorways,
	(state, yarnID) => yarnID,
	(colorways, yarnID) => colorways.filter(c => c.yarnID === yarnID)
);

export const selectColorwayIDsByYarnID = createSelector(
	selectColorwayEntities,
	selectColorwayIDs,
	(state, yarnID) => yarnID,
	(colorwayEntities, colorwayIDs, yarnID) => colorwayIDs.filter(cid => colorwayEntities[cid].yarnID === yarnID)
);