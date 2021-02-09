import {createSelector, createSlice, createEntityAdapter, nanoid} from "@reduxjs/toolkit";

const yarnsAdapter = createEntityAdapter();
const initialState = yarnsAdapter.getInitialState();

const yarnsSlice = createSlice({
	name: "yarns",
	initialState: initialState,
	reducers: {
		yarnAddModalSubmitted: {
			prepare: (brand, name, comment) => ({ 
				payload: {
					id: nanoid(),
					brand,
					name,
					comment: comment,
					dateAdded: new Date().toISOString(),
					lastUpdated: new Date().toISOString()
				}
			}),
			reducer: yarnsAdapter.addOne
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
		}
	}
});

export const {yarnAddModalSubmitted, yarnEditModalSubmitted} = yarnsSlice.actions;
export default yarnsSlice.reducer;

export const {
	selectEntities: selectYarnEntities,
	selectById: selectYarnByID
} = yarnsAdapter.getSelectors(state => state.yarns);


// memoized selector
export const selectSortedYarnIDs = createSelector(
	selectYarnEntities,
	state => state.sorts.yarnName,
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
