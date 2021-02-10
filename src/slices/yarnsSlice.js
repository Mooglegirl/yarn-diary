import {createSelector, createSlice, createEntityAdapter, nanoid} from "@reduxjs/toolkit";

const yarnsAdapter = createEntityAdapter();
const initialState = yarnsAdapter.getInitialState();

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
		yarnDeleteModalSubmitted: yarnsAdapter.removeOne
	}
});

export const {yarnAddModalSubmitted, yarnEditModalSubmitted, yarnDeleteModalSubmitted} = yarnsSlice.actions;
export default yarnsSlice.reducer;

export const {
	selectEntities: selectYarnEntities,
	selectById: selectYarnByID
} = yarnsAdapter.getSelectors(state => state.yarns);


// TODO
export const selectSortedYarnIDs = createSelector(
	selectYarnEntities,
	state => true,
	(yarns, areYarnsSorted) => {
		const yarnIDs = Object.keys(yarns);
		if(areYarnsSorted) {
			return yarnIDs.sort((a, b) => {
				const aYarn = yarns[a];
				const bYarn = yarns[b];
				return (aYarn.brand + " " + aYarn.name).localeCompare(bYarn.brand + " " + bYarn.name);
			});
		} else {
			return yarnIDs;
		}
	}
);
