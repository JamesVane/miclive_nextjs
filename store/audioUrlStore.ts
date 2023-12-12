/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

type AudioUrlType = {
	[key: string]: string;
};

type SetAudioUrlPayload = {
	path: string;
	url: string;
};

const audioUrlSlice = createSlice({
	name: "audioUrlStore",
	initialState: {} as AudioUrlType,
	reducers: {
		setAudioUrl: (state, action: PayloadAction<SetAudioUrlPayload>) => {
			const { path, url } = action.payload;
			state[path] = url;
		},
	},
});

export const { setAudioUrl } = audioUrlSlice.actions;

const persistConfig = {
	key: "root",
	storage,
};

export default audioUrlSlice.reducer;
