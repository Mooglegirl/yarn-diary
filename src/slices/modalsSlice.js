import {createSlice, createAction, nanoid} from "@reduxjs/toolkit";

const modalsSlice = createSlice({
	name: "modals",
	initialState: {
		yarnEdit: false,
		yarnAdd: false,
		yarnDelete: false,
		colorwayAdd: false,
		colorwayEdit: false,
		colorwayDelete: false,
		optionsUpdate: false,
		backupRestore: false,
		tagsEdit: false,
		tagMetaEdit: false
	},
	reducers: {
		modalOpened(state, action) {
			state[action.payload] = true;
		},
		modalClosed(state, action) {
			state[action.payload] = false;
		}
	},
	extraReducers: builder => {
		builder.addMatcher(
			action => action.type.endsWith("ModalSubmitted"),
			(state, action) => { 
				const modalName = action.type.replace(/.*\//, "").replace("ModalSubmitted", "");
				state[modalName] = false;
			}
		)
	}
});

export const {modalOpened, modalClosed} = modalsSlice.actions;
export default modalsSlice.reducer;
export const selectModalStateByName = (state, name) => state.modals[name];

/*
	while most of these actions are more relevant to other slices (yarns, colorways, etc),
	some of them have ramifications in multiple, so putting them in those respective slices
	causes circular dependencies; putting them all here seems to be the cleanest even
	though this reducer doesn't do anything besides open/close them
*/

export const optionsUpdateModalSubmitted = createAction("modals/optionsUpdateModalSubmitted");

export const yarnAddModalSubmitted = createAction("modals/yarnAddModalSubmitted", 
	(brand, name, comment, images) => ({
		payload: {
			id: nanoid(),
			brand,
			name,
			comment,
			images,
			dateAdded: new Date().toISOString(),
			lastUpdated: new Date().toISOString()
		}
	})
);

export const colorwayAddModalSubmitted = createAction("modals/colorwayAddModalSubmitted",
	(yarnID, name, comment, images) => ({
		payload: {
			id: nanoid(),
			yarnID,
			name,
			comment,
			images,
			dateAdded: new Date().toISOString(),
			lastUpdated: new Date().toISOString()
		}
	})
);

export const yarnEditModalSubmitted = createAction("modals/yarnEditModalSubmitted", 
	(id, changes) => ({
		payload: {
			id,
			changes: {
				...changes,
				lastUpdated: new Date().toISOString()
			}
		}
	})
);

export const colorwayEditModalSubmitted = createAction("modals/colorwayEditModalSubmitted",
	(id, changes) => ({
		payload: {
			id,
			changes: {
				...changes,
				lastUpdated: new Date().toISOString()
			}
		}
	})
);

export const yarnDeleteModalSubmitted = createAction("modals/yarnDeleteModalSubmitted");
export const colorwayDeleteModalSubmitted = createAction("modals/colorwayDeleteModalSubmitted");

export const tagsEditModalSubmitted = createAction("modals/tagsEditModalSubmitted",
	(tags, yarnID, colorwayID) => ({
		payload: {
			tags: tags || [],
			yarnID: yarnID || null,
			colorwayID: colorwayID || null,
			timestamp: new Date().toISOString()
		}
	})
);

export const tagMetaEditModalSubmitted = createAction("modals/tagMetaEditModalSubmitted",
	(tagID, tagComment, tagColor) => ({
		payload: {
			id: tagID,
			changes: {
				comment: tagComment,
				color: tagColor
			}
		}
	})
);