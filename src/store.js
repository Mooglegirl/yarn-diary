import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {
	persistStore, persistReducer,
	FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import rootReducer from "./reducer";
export const PERSIST_KEY = "yarnDiary";

const persistConfig = {
	key: PERSIST_KEY,
	storage,
	stateReconciler: autoMergeLevel2,
	whitelist: ["yarns", "colorways"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
		}
	})
});

export const persistor = persistStore(store);