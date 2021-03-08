import {createSelector, createSlice, createEntityAdapter} from "@reduxjs/toolkit";

import {
	optionsUpdateModalSubmitted,
	yarnAddModalSubmitted,
	yarnEditModalSubmitted,
	yarnDeleteModalSubmitted,
	colorwayAddModalSubmitted,
	tagsEditModalSubmitted,
	tagDeleteModalSubmitted
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
			}).addCase(tagsEditModalSubmitted, (state, action) => {
				if(!action.payload.yarnID) return;
				const yarn = state.entities[action.payload.yarnID];
				yarn.tags = action.payload.tags;
				yarn.lastUpdated = action.payload.timestamp;
			}).addCase(tagDeleteModalSubmitted, (state, action) => {
				const tagID = action.payload;
				Object.keys(state.entities).forEach(yarnID => {
					const yarn = state.entities[yarnID];
					if(!yarn.tags) return;
					const index = yarn.tags.indexOf(tagID);
					if(index !== -1) yarn.tags.splice(index, 1);
				});
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

function sortYarnIDs(yarnIDs, allYarns, sortMethod) {
	const compareFunc = compareFuncs[sortMethod];

	if(!compareFunc) {
		return yarnIDs;
	}

	return yarnIDs.sort((a, b) => {
		const aYarn = allYarns[a];
		const bYarn = allYarns[b];
		return compareFunc(aYarn, bYarn);
	});
}

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

		return sortYarnIDs(filteredYarnIDs, yarns, sortMethod);
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

export const selectTagsByYarnID = (state, yarnID) => yarnID ? state.yarns.entities[yarnID].tags || [] : [];

export const selectTagNamesByYarnID = createSelector(
	selectTagsByYarnID,
	tags => tags.join(", ")
);

export const selectYarnIDsByTag = createSelector(
	selectYarnEntities,
	(state, tag) => tag,
	state => state.yarns.sortMethod,
	(yarns, tag, sortMethod) => {
		const filteredYarnIDs = Object.keys(yarns).filter(yarnID => yarns[yarnID].tags && yarns[yarnID].tags.filter(t => t === tag).length > 0);
		return sortYarnIDs(filteredYarnIDs, yarns, sortMethod);
	}
);