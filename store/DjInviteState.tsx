/** @format */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type djInviteStateType = {
	accountType: "dj" | "promoter" | "performer" | "none";
	uuid: string;
	badUrl: boolean;
	dateObject: {
		specificEventId: number;
		baseEventId: number;
		baseEventTagline: string;
		baseEventName: string;
		startTime: string;
		location: string;
		endTime: string;
	};
};

const djInviteStateDefault = {
	accountType: "none",
	uuid: "",
	badUrl: false,
	dateObject: {
		specificEventId: 0,
		baseEventId: 0,
		baseEventTagline: "",
		baseEventName: "",
		startTime: "",
		location: "",
		endTime: "",
	},
};

const djInviteState = createSlice({
	name: "djInviteState",
	initialState: djInviteStateDefault,
	reducers: {
		setUuid: (state, action: PayloadAction<string>) => {
			state.uuid = action.payload;
		},
		setBadUrl: (state, action: PayloadAction<boolean>) => {
			state.badUrl = action.payload;
		},
		setDateObject: (
			state,
			action: PayloadAction<djInviteStateType["dateObject"]>
		) => {
			state.dateObject = action.payload;
		},
		setAccountType: (
			state,
			action: PayloadAction<djInviteStateType["accountType"]>
		) => {
			state.accountType = action.payload;
		},
	},
});

export const { setUuid, setBadUrl, setDateObject, setAccountType } =
	djInviteState.actions;
export default djInviteState.reducer;
