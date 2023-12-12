/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface openConversationDesktopType {
	openConversationSub: string;
	drawerIsOpen: boolean;
}

export const openConversationDesktopDefault = {
	openConversationSub: "None",
	drawerIsOpen: false,
};

const openConversationDesktopSlice = createSlice({
	name: "openConversationDesktopSlice",
	initialState: openConversationDesktopDefault,
	reducers: {
		setOpenConversationDesktop: (state, action: PayloadAction<string>) => {
			state.openConversationSub = action.payload;
		},
		setDrawerIsOpen: (state, action: PayloadAction<boolean>) => {
			state.drawerIsOpen = action.payload;
		},
	},
});

export const { setOpenConversationDesktop, setDrawerIsOpen } =
	openConversationDesktopSlice.actions;
export default openConversationDesktopSlice.reducer;
