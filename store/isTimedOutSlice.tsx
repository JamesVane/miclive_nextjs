/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const isTimedOutSlice = createSlice({
	name: "isTimedOutSlice",
	initialState: false,
	reducers: {
		setIsTimedOutState: (state, action: PayloadAction<boolean>) => {
			// Return the new state value
			return action.payload;
		},
	},
});

export const { setIsTimedOutState } = isTimedOutSlice.actions;
export default isTimedOutSlice.reducer;
