import {createSlice, createEntityAdapter, createSelector} from "@reduxjs/toolkit";

import {tagsEditModalSubmitted, tagMetaEditModalSubmitted, tagDeleteModalSubmitted} from "./modalsSlice";

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
						color: state.entities[tagName] ? state.entities[tagName].color : "#e4effd"
					});

					return tagEntities;
				}, []);

				tagsAdapter.upsertMany(state, tagEntities);
			})
			.addCase(tagMetaEditModalSubmitted, tagsAdapter.updateOne)
			.addCase(tagDeleteModalSubmitted, tagsAdapter.removeOne);
	}
});

export default tagsSlice.reducer;

export const {
	selectEntities: selectTagEntities,
	selectAll: selectAllTags
} = tagsAdapter.getSelectors(state => state.tags);

export const selectTagColorByID = createSelector(
	selectTagEntities,
	(state, tagID) => tagID,
	(tagEntities, tagID) => tagEntities[tagID].color
);
