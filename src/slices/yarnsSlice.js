import {createSelector, createSlice, createEntityAdapter, nanoid} from "@reduxjs/toolkit";

const yarnsAdapter = createEntityAdapter();
const initialState = yarnsAdapter.getInitialState({
	searchValue: ""
});

const yarnsSlice = createSlice({
	name: "yarns",
	initialState: initialState,
	reducers: {
		yarnAddModalSubmitted: {
			prepare: (brand, name, comment, images) => ({ 
				payload: {
					id: nanoid(),
					brand,
					name,
					comment,
					images,
					dateAdded: new Date().toISOString(),
					lastUpdated: new Date().toISOString()
				}
			}),
			reducer: (state, action) => {
				yarnsAdapter.addOne(state, action);
			}
		},
		yarnEditModalSubmitted: {
			prepare: (id, changes) => ({
				payload: {
					id,
					changes: {
						...changes,
						lastUpdated: new Date().toISOString()
					}
				}
			}),
			reducer: yarnsAdapter.updateOne
		},
		yarnDeleteModalSubmitted: yarnsAdapter.removeOne,
		yarnSearchSubmitted(state, action) {
			state.searchValue = action.payload;
		}
	}
});

export const {
	yarnAddModalSubmitted, 
	yarnEditModalSubmitted, 
	yarnDeleteModalSubmitted,
	yarnSearchSubmitted
} = yarnsSlice.actions;
export default yarnsSlice.reducer;

export const {
	selectEntities: selectYarnEntities,
	selectById: selectYarnByID
} = yarnsAdapter.getSelectors(state => state.yarns);

export const selectDisplayedYarnIDs = createSelector(
	selectYarnEntities,
	state => state.yarns.searchValue.toLowerCase(),
	(yarns, searchValue) => {
		return Object.keys(yarns).filter(yarnID => {
			const yarnFullName = `${yarns[yarnID].brand} ${yarns[yarnID].name}`.toLowerCase();
			return yarnFullName.indexOf(searchValue) > -1;
		});
	}
);