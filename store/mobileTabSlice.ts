/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MobileTabType = {
	tab: number;
}
export const defaultMobileTab = {
    tab: 1,
}

const mobileTabSlice = createSlice({
	name: "mobileTab",
	initialState: defaultMobileTab,
	reducers: {
		setMobileTab: (state, action: PayloadAction<number>) => {
			return { tab: action.payload };
		},
	},
});

export const { setMobileTab } = mobileTabSlice.actions;
export default mobileTabSlice.reducer;