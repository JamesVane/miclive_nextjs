/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const desktopSelectedBaseEventSlice = createSlice({
	name: "desktopSelectedBaseEventSlice",
	initialState: 0,
	reducers: {
		setDesktopSelectedBaseEvent: (state, action: PayloadAction<number>) => {
			return action.payload;
		},
	},
});

export const { setDesktopSelectedBaseEvent } =
	desktopSelectedBaseEventSlice.actions;
export default desktopSelectedBaseEventSlice.reducer;
