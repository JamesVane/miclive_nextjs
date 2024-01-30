/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const shouldReFetchFromSocketSlice = createSlice({
	name: "shouldReFetchFromSocketSlice",
	initialState: "",
	reducers: {
		setShouldReFetchSocket: (state, action: PayloadAction<string>) => {
			state = action.payload;
		},
	},
});

export const { setShouldReFetchSocket } = shouldReFetchFromSocketSlice.actions;
export default shouldReFetchFromSocketSlice.reducer;
