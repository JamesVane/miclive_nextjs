/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ViewUserInfoModalSliceType {
	isOpen: boolean;
	roleId: number;
	userType: "performer" | "promoter" | "dj";
	name: string;
	tagline: string;
	userSub: string;
	info: {
		City?: string;
		Email?: string;
		Phone?: string;
		IG?: string;
		Link?: string;
	} | null;
}

export interface SetViewUserInfoModalSliceType {
	roleId: number;
	userType: "performer" | "promoter" | "dj";
	name: string;
	tagline: string;
	userSub: string;
	info: {
		City?: string;
		Email?: string;
		Phone?: string;
		IG?: string;
		Link?: string;
	} | null;
}

export const defaultViewUserInfoModalSlice = {
	isOpen: false,
	roleId: 0,
	userType: "performer",
	userSub: "",
	name: "",
	tagline: "",
	info: null,
};

const viewUserInfoModalSlice = createSlice({
	name: "viewUserInfoModalSlice",
	initialState: defaultViewUserInfoModalSlice as ViewUserInfoModalSliceType,
	reducers: {
		setViewUserInfoModalSlice: (
			state,
			action: PayloadAction<SetViewUserInfoModalSliceType>
		) => {
			state.isOpen = true;
			state.roleId = action.payload.roleId;
			state.userType = action.payload.userType;
			state.name = action.payload.name;
			state.tagline = action.payload.tagline;
			state.info = action.payload.info;
			state.userSub = action.payload.userSub;
		},
		setViewUserInfoModalSliceDefault: (state) => {
			state.isOpen = false;
			state.roleId = 0;
			state.userType = "performer";
			state.name = "";
			state.tagline = "";
			state.info = null;
		},
	},
});

export const { setViewUserInfoModalSlice, setViewUserInfoModalSliceDefault } =
	viewUserInfoModalSlice.actions;
export default viewUserInfoModalSlice.reducer;
