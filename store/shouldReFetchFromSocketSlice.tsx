/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const defaultShouldReFetchFromSocket = {
	stamp: "",
};

type shouldReFetchFromSocket = {
	stamp: string;
};

const shouldReFetchFromSocketSlice = createSlice({
	name: "shouldReFetchFromSocketSlice",
	initialState: defaultShouldReFetchFromSocket as shouldReFetchFromSocket,
	reducers: {
		setShouldReFetchSocket: (state, action: PayloadAction<string>) => {
			state.stamp = action.payload;
		},
	},
});

export const { setShouldReFetchSocket } = shouldReFetchFromSocketSlice.actions;
export default shouldReFetchFromSocketSlice.reducer;
