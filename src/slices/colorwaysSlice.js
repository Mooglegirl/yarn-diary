import {createSlice, createEntityAdapter, createSelector} from "@reduxjs/toolkit";

import {
	optionsUpdateModalSubmitted,
	colorwayAddModalSubmitted,
	colorwayEditModalSubmitted,
	colorwayDeleteModalSubmitted,
	yarnDeleteModalSubmitted,
	tagsEditModalSubmitted
} from "./modalsSlice";
import {compareFuncs} from "../extras/utils";

const colorwaysAdapter = createEntityAdapter();
const initialState = colorwaysAdapter.getInitialState({
	sortMethod: "alphabetical_az",
	displayMode: "cards"
});

const colorwaysSlice = createSlice({
	name: "colorways",
	initialState: initialState,
	extraReducers: builder => {
		builder
			.addCase(colorwayAddModalSubmitted, colorwaysAdapter.addOne)
			.addCase(colorwayEditModalSubmitted, colorwaysAdapter.updateOne)
			.addCase(colorwayDeleteModalSubmitted, colorwaysAdapter.removeOne)
			.addCase(yarnDeleteModalSubmitted, (state, action) => {
				const colorwayIDsToDelete = state.ids.filter(cid => state.entities[cid].yarnID === action.payload);
				colorwaysAdapter.removeMany(state, colorwayIDsToDelete);
			}).addCase(optionsUpdateModalSubmitted, (state, action) => {
				state.sortMethod = action.payload.colorwaySort;
				state.displayMode = action.payload.colorwayDisplay;
			}).addCase(tagsEditModalSubmitted, (state, action) => {
				if(!action.payload.colorwayID) return;
				const colorway = state.entities[action.payload.colorwayID];
				colorway.tags = action.payload.tags;
				colorway.lastUpdated = action.payload.timestamp;
			});
	}
});

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

export const selectTagsByColorwayID = (state, colorwayID) => colorwayID ? state.colorways.entities[colorwayID].tags || [] : [];

export const selectTagNamesByColorwayID = createSelector(
	selectTagsByColorwayID,
	tags => tags.join(", ")
);

export const selectColorwayIDsByTag = createSelector(
	selectColorwayEntities,
	(state, tag) => tag,
	(colorways, tag) => Object.keys(colorways).filter(colorwayID => colorways[colorwayID].tags && colorways[colorwayID].tags.filter(t => t === tag).length > 0)
);