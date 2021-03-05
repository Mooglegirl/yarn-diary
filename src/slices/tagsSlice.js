import {createSlice, createEntityAdapter, createSelector} from "@reduxjs/toolkit";

import {tagsEditModalSubmitted, tagMetaEditModalSubmitted} from "./modalsSlice";

const tagsAdapter = createEntityAdapter();
const initialState = tagsAdapter.getInitialState();

// this is just to handle mapping tags to descriptions
// what tags a yarn or color has is handled in those respective slices

const tagsSlice = createSlice({
	name: "tags",
	initialState,
	extraReducers: builder => {
		builder
			.addCase(tagsEditModalSubmitted, (state, action) => {
				const tagEntities = action.payload.tags.reduce((tagEntities, tagName) => {
					tagEntities.push({
						id: tagName,
						comment: state.entities[tagName] ? state.entities[tagName].comment : "",
						color: state.entities[tagName] ? state.entities[tagName].color : ""
					});

					return tagEntities;
				}, []);

				tagsAdapter.upsertMany(state, tagEntities);
			})
			.addCase(tagMetaEditModalSubmitted, tagsAdapter.updateOne);
	}
});

export default tagsSlice.reducer;

export const {
	selectEntities: selectTagEntities
} = tagsAdapter.getSelectors(state => state.tags);

export const selectTagColorsByIDs = createSelector(
	selectTagEntities,
	(state, tagIDs) => tagIDs,
	(tagEntities, tagIDs) => tagIDs.reduce((result, tagID) => {
		result[tagID] = tagEntities[tagID].color;
		return result;
	}, {})
);