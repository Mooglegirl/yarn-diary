import {nanoid} from "nanoid";
import {createSelector, createSlice, createEntityAdapter} from "@reduxjs/toolkit";

const yarnsAdapter = createEntityAdapter();
const initialState = yarnsAdapter.getInitialState();

const yarnsSlice = createSlice({
	name: "yarns",
	initialState: initialState,
	reducers: {
		yarnAdded: {
			prepare(brand, name) {
				return { 
					payload: {
						id: nanoid(),
						brand,
						name,
						comment: ""
					}
				}
			},
			reducer: yarnsAdapter.addOne
		}
	}
});

export const {yarnAdded} = yarnsSlice.actions;
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
