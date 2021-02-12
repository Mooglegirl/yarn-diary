import {createSlice, createEntityAdapter, nanoid, createSelector} from "@reduxjs/toolkit";

import {yarnDeleteModalSubmitted} from "./yarnsSlice";
import {optionsUpdateModalSubmitted} from "./modalsSlice";
import {compareFuncs} from "../extras/utils";

const colorwaysAdapter = createEntityAdapter();
const initialState = colorwaysAdapter.getInitialState({
	sortMethod: "alphabetical_az",
	displayMode: "cards"
});

const colorwaysSlice = createSlice({
	name: "colorways",
	initialState: initialState,
	reducers: {
		colorwayAddModalSubmitted: {
			prepare(yarnID, name, comment, images) {
				return {
					payload: {
						id: nanoid(),
						yarnID,
						name,
						comment,
						images,
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
	extraReducers: builder => {
		builder.addCase(yarnDeleteModalSubmitted, (state, action) => {
			const colorwayIDsToDelete = state.ids.filter(cid => state.entities[cid].yarnID === action.payload);
			colorwaysAdapter.removeMany(state, colorwayIDsToDelete);
		}).addCase(optionsUpdateModalSubmitted, (state, action) => {
			state.sortMethod = action.payload.colorwaySort;
			state.displayMode = action.payload.colorwayDisplay;
		});
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

export const selectSortedColorwaysByYarnID = createSelector(
	selectAllColorways,
	(state, yarnID) => yarnID,
	state => state.colorways.sortMethod,
	(colorways, yarnID, sortMethod) => {
		const selectedColorways = colorways.filter(c => c.yarnID === yarnID);
		const compareFunc = compareFuncs[sortMethod];
		if(!compareFunc) return selectedColorways;
		return selectedColorways.sort(compareFunc);
	}
);

export const selectSortedColorwayIDsByYarnID = createSelector(
	selectSortedColorwaysByYarnID,
	colorways => colorways.reduce((result, current) => {
		result.push(current.id);
		return result;
	}, [])
);

export const selectColorwaysByYarnIDAndName = createSelector(
	selectAllColorways,
	(state, colorwayData) => colorwayData,
	(colorways, colorwayData) => {
		const {yarnID, name} = colorwayData;
		return colorways.filter(c => c.name.toLowerCase() === name.toLowerCase() && c.yarnID === yarnID);
	}
);