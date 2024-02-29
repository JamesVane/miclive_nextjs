"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "lodash";

const createAccountSliceDefault = {
	imageFile: null,	
	tagline: "",
	imageDisplayHelp: {
		imageSelected: false,
		displayName: null,
		displayURL: null,
		confirmImage: false,
	},
	phone: "",
	email: "",
	password: "",	
	username: "",
	usernameError: "",
	passwordError: "",	
	phoneError: "",
	emailError: "",	
	userRoldId: null,
};

type createAccountSliceType = {
	imageFile: any;
	tagline: string;
	imageDisplayHelp: {
		imageSelected: boolean;
		displayName: string | null;
		displayURL: string | null;
		confirmImage: boolean;
	};
	phone: string;
	email: string;
	password: string;	 
	username: string;
	usernameError: string;
	passwordError: string;	
	phoneError: string;
	emailError: string;	
	userRoldId: number | null;
};

type imageDisplayHelpPayload = {
	key: "imageSelected" | "displayName" | "displayURL" | "confirmImage";
	value: boolean | string | null;
};
const createAccountSlice = createSlice({
	name: "createAccountSlice",
	initialState: createAccountSliceDefault as createAccountSliceType,
	reducers: {
		setCreateAccountDefault: (state) => {
			return {...createAccountSliceDefault};
		},		
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setPhone: (state, action: PayloadAction<string>) => {
			state.phone = action.payload;
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
		setUsernameError: (state, action: PayloadAction<string>) => {
			state.usernameError = action.payload;
		},
		setPasswordError: (state, action: PayloadAction<string>) => {
			state.passwordError = action.payload;
		},
		setPhoneError: (state, action: PayloadAction<string>) => {
			state.phoneError = action.payload;
		},
		setEmailError: (state, action: PayloadAction<string>) => {
			state.emailError = action.payload;
		},
		setImageDisplayHelp: (
			state,
			action: PayloadAction<imageDisplayHelpPayload>
		) => {
			const { key, value } = action.payload;
			state.imageDisplayHelp = {
				...state.imageDisplayHelp,
				[key]: value,
			};
		},
		setImageFile: (state, action: PayloadAction<any>) => {
			state.imageFile = action.payload;
		},
		setTagline: (state, action: PayloadAction<string>) => {
			state.tagline = action.payload;
		},	
		setUserRoleId: (state, action: PayloadAction<number>) => {
			state.userRoldId = action.payload;
		},
	},
});

export const {
	setUserRoleId,
	setCreateAccountDefault, 
	setUsername, 
	setPhone,
	setEmail,
	setPassword,	
	setUsernameError,
	setPasswordError,	
	setPhoneError,
	setEmailError,	
	setImageDisplayHelp,
	setImageFile,
	setTagline,
} = createAccountSlice.actions;
export default createAccountSlice.reducer;
  