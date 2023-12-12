/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EditProfileInfoMobileSliceType = {
	picture: string;
	pictureDisplayURL: string;
	pictureDisplayName: string;
	name: string;
	tagline: string;
	links: {
		City: string;
		Email: string;
		IG: string;
		Link: string;
		Phone: string;
	};
};

export const editProfileInfoMobileDefault = {
	picture: "None",
	pictureDisplayURL: "None",
	pictureDisplayName: "None",
	name: "None",
	tagline: "None",
	links: {
		City: "None",
		Email: "None",
		IG: "None",
		Link: "None",
		Phone: "None",
	},
};

type setPicNameTaglinePayload = {
	key:
		| "picture"
		| "name"
		| "tagline"
		| "pictureDisplayURL"
		| "pictureDisplayName";
	value: string;
};

type setLinksPayload = {
	key: "City" | "Email" | "IG" | "Link" | "Phone";
	value: string;
};

type InitInfo = {
	picture: string;
	pictureDisplayURL: string;
	pictureDisplayName: string;
	name: string;
	tagline: string;
	links: {
		City: string;
		Email: string;
		IG: string;
		Link: string;
		Phone: string;
	};
};

const EditProfileInfoMobileSlice = createSlice({
	name: "EditProfileInfoMobileSlice",
	initialState: editProfileInfoMobileDefault,
	reducers: {
		setPicNameTagline: (
			state,
			action: PayloadAction<setPicNameTaglinePayload>
		) => {
			state[action.payload.key] = action.payload.value;
		},
		setLinks: (state, action: PayloadAction<setLinksPayload>) => {
			state.links[action.payload.key] = action.payload.value;
		},
		setInitInfo: (state, action: PayloadAction<InitInfo>) => {
			state.picture = action.payload.picture;
			state.pictureDisplayURL = action.payload.pictureDisplayURL;
			state.pictureDisplayName = action.payload.pictureDisplayName;
			state.name = action.payload.name;
			state.tagline = action.payload.tagline;
			state.links = action.payload.links;
		},
	},
});

export const { setPicNameTagline, setLinks, setInitInfo } =
	EditProfileInfoMobileSlice.actions;
export default EditProfileInfoMobileSlice.reducer;
