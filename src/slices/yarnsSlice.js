import {createSelector, createSlice, createEntityAdapter} from "@reduxjs/toolkit";

import {
	optionsUpdateModalSubmitted,
	yarnAddModalSubmitted,
	yarnEditModalSubmitted,
	yarnDeleteModalSubmitted,
	colorwayAddModalSubmitted
} from "./modalsSlice";
import {compareFuncs} from "../extras/utils";

const yarnsAdapter = createEntityAdapter();
const initialState = yarnsAdapter.getInitialState({
	searchValue: "",
	sortMethod: "alphabetical_az",
	displayMode: "cards"
});

const yarnsSlice = createSlice({
	name: "yarns",
	initialState: initialState,
	reducers: {
		yarnSearchSubmitted(state, action) {
			state.searchValue = action.payload;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(yarnAddModalSubmitted, yarnsAdapter.addOne)
			.addCase(yarnEditModalSubmitted, yarnsAdapter.updateOne)
			.addCase(yarnDeleteModalSubmitted, yarnsAdapter.removeOne)
			.addCase(optionsUpdateModalSubmitted, (state, action) => {
				state.sortMethod = action.payload.yarnSort;
				state.displayMode = action.payload.yarnDisplay;
			}).addCase(colorwayAddModalSubmitted, (state, action) => {
				state.entities[action.payload.yarnID].lastUpdated = action.payload.lastUpdated;
			});
	}
});

export const {
	yarnSearchSubmitted
} = yarnsSlice.actions;
export default yarnsSlice.reducer;

export const {
	selectEntities: selectYarnEntities,
	selectById: selectYarnByID,
	selectAll: selectAllYarns
} = yarnsAdapter.getSelectors(state => state.yarns);

export const selectDisplayedYarnIDs = createSelector(
	selectYarnEntities,
	state => state.yarns.searchValue.toLowerCase(),
	state => state.yarns.sortMethod,
	(yarns, searchValue, sortMethod) => {
		const brandSearch = searchValue.match(/(?<=brand\[)[^\]]*(?=\])/);
		const nameSearch = searchValue.match(/(?<=name\[)[^\]]*(?=\])/);
		const regularSearch = searchValue.replace(`brand[${brandSearch}]`, "").replace(`name[${nameSearch}]`, "").trim();

		const filteredYarnIDs = Object.keys(yarns).filter(yarnID => {
			const yarn = yarns[yarnID];
			const yarnFullName = `${yarn.brand} ${yarn.name}`.toLowerCase();

			const matchesBrand = !!brandSearch ? yarn.brand.toLowerCase().indexOf(brandSearch[0]) > -1 : true;
			const matchesName = !!nameSearch ? yarn.name.toLowerCase().indexOf(nameSearch[0]) > -1 : true;
			const matchesRegularSearch = yarnFullName.indexOf(regularSearch) > -1;

			return matchesBrand && matchesName && matchesRegularSearch;
		});

		const compareFunc = compareFuncs[sortMethod];
		if(!compareFunc) {
			return filteredYarnIDs;
		}

		return filteredYarnIDs.sort((a, b) => {
			const aYarn = yarns[a];
			const bYarn = yarns[b];
			return compareFunc(aYarn, bYarn);
		});
	}
);

export const selectYarnsByFullName = createSelector(
	selectAllYarns,
	(state, yarnData) => yarnData,
	(yarns, yarnData) => {
		const {brand, name} = yarnData;
		return yarns.filter(y => y.brand.toLowerCase() === brand.toLowerCase() && y.name.toLowerCase() === name.toLowerCase());
	}
);