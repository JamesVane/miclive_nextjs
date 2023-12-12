/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "lodash";

const createAccountSliceDefault = {
	imageFile: null,
	banner3X10: null,
		banner4X10: null,	
	tagline: "",
	imageDisplayHelp: {
		imageSelected: false,
		displayName: null,
		displayURL: null,
		confirmImage: false,
	},
	banner3X10DisplayHelp: {
		imageSelected: false,
		displayName: null,
		displayURL: null,
		confirmImage: false,
	}, 
	banner4X10DisplayHelp: {
		imageSelected: false,
		displayName: null,
		displayURL: null,
		confirmImage: false,
	},
	phone: "",
	email: "",
	password: "",
	confirmPassword: "",	
	username: "",
	usernameError: "",
	passwordError: "",
	confirmPasswordError: "",
	phoneError: "",
	emailError: "",	
	links: {
		city: "",
		email: "",
		IG: "",
		website: "",
		phone: "",
	},
	linkErrors: {		
		email: "",
		IG: "", 
		website: "",
		phone: "",
	},
};

type createAccountSliceType = {
	imageFile: any;
	banner3X10: any;
	banner4X10: any;
	tagline: string;
	imageDisplayHelp: {
		imageSelected: boolean;
		displayName: string | null;
		displayURL: string | null;
		confirmImage: boolean;
	};
	banner3X10DisplayHelp: {
		imageSelected: boolean;
		displayName: string | null;
		displayURL: string | null;
		confirmImage: boolean;
	};
	banner4X10DisplayHelp: {
		imageSelected: boolean;
		displayName: string | null;
		displayURL: string | null;
		confirmImage: boolean;
	};
	phone: string;
	email: string;
	password: string;
	confirmPassword: string;	 
	username: string;
	usernameError: string;
	passwordError: string;
	confirmPasswordError: string;
	phoneError: string;
	emailError: string;	
	links: {
		city: string;
		email: string;
		IG: string;
		website: string;
		phone: string;
	}
	linkErrors: {		
		email: string;
		IG: string;
		website: string;
		phone: string;
	}
};

type SetSingeLinkPayload = {
	key: "city" | "email" | "IG" | "website" | "phone";
	value: string;
};

type setSingleLinkErrorPayload = {
	key: "email" | "IG" | "website" | "phone";
	value: string;
};

type imageDisplayHelpPayload = {
	key: "imageSelected" | "displayName" | "displayURL" | "confirmImage";
	value: boolean | string | null;
};

type banner3X10DisplayHelpPayload = {
	key: "imageSelected" | "displayName" | "displayURL" | "confirmImage";
	value: boolean | string | null;
};

type banner4X10DisplayHelpPayload = {
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
		setConfirmPassword: (state, action: PayloadAction<string>) => {
			state.confirmPassword = action.payload;
		},
		setUsernameError: (state, action: PayloadAction<string>) => {
			state.usernameError = action.payload;
		},
		setPasswordError: (state, action: PayloadAction<string>) => {
			state.passwordError = action.payload;
		},
		setConfirmPasswordError: (state, action: PayloadAction<string>) => {
			state.confirmPasswordError = action.payload;
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
		setBanner3X10DisplayHelp: (
			state,
			action: PayloadAction<banner3X10DisplayHelpPayload>
		) => {
			const { key, value } = action.payload;
			state.banner3X10DisplayHelp = {
				...state.banner3X10DisplayHelp,
				[key]: value,
			};
		},
		setBanner4X10DisplayHelp: (
			state,
			action: PayloadAction<banner4X10DisplayHelpPayload>
		) => {
			const { key, value } = action.payload;
			state.banner4X10DisplayHelp = {
				...state.banner4X10DisplayHelp,
				[key]: value,
			};
		},
		setImageFile: (state, action: PayloadAction<any>) => {
			state.imageFile = action.payload;
		},
		setBanner3X10: (state, action: PayloadAction<any>) => {
			state.banner3X10 = action.payload;
		},
		setBanner4X10: (state, action: PayloadAction<any>) => {
			state.banner4X10 = action.payload;
		},
		setTagline: (state, action: PayloadAction<string>) => {
			state.tagline = action.payload;
		},
		setSingleLink: (state, action: PayloadAction<SetSingeLinkPayload>) => {
			const { key, value } = action.payload;
			set(state.links, key, value);
		},
		setSingleLinkError: (
			state,
			action: PayloadAction<setSingleLinkErrorPayload>
		) => {
			const { key, value } = action.payload;
			set(state.linkErrors, key, value);
		}		
	},
});

export const {
	setCreateAccountDefault, 
	setUsername,
	setPhone,
	setEmail,
	setPassword,
	setConfirmPassword,	
	setUsernameError,
	setPasswordError,
	setConfirmPasswordError,
	setPhoneError,
	setEmailError,	
	setImageDisplayHelp,
	setImageFile,
	setTagline,
	setSingleLink,
	setSingleLinkError,
	setBanner3X10DisplayHelp,
	setBanner4X10DisplayHelp,
	setBanner3X10,
	setBanner4X10,
} = createAccountSlice.actions;
export default createAccountSlice.reducer;
