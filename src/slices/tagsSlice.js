import {createSlice, createEntityAdapter} from "@reduxjs/toolkit";

import {tagsEditModalSubmitted} from "./modalsSlice";

const tagsAdapter = createEntityAdapter();
const initialState = tagsAdapter.getInitialState();

// this is just to handle mapping tags to descriptions
// what tags a yarn or color has is handled in those respective slices

const tagsSlice = createSlice({
	name: "tags",
	initialState,
	extraReducers: builder => {
		builder.addCase(tagsEditModalSubmitted, (state, action) => {
			const tagEntities = action.payload.tags.reduce((tagEntities, tagName) => {
				tagEntities.push({
					id: tagName,
					comment: state.entities[tagName] ? state.entities[tagName].comment : ""
				});

				return tagEntities;
			}, []);

			tagsAdapter.upsertMany(state, tagEntities);
		});
	}
});

export default tagsSlice.reducer;
