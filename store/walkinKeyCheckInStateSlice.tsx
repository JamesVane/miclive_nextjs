/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type KeyEventData = {
	name: string;
	tagline: string;
	specificEventId: number;
	baseEventId: number;
	startTime: string;
	endTime: string;
	songs_per_performer: number;
	time_per_performer: number;
	location: string;
};

type accountTypeType = "performer" | "promoter" | "dj" | null;

export interface WalkinKeyCheckInStateType {
	accountType: accountTypeType;
	eventData: KeyEventData | null;
}
const walkinKeyCheckInStateSlice = createSlice({
	name: "walkinKeyCheckInStateSlice",
	initialState: {} as WalkinKeyCheckInStateType,
	reducers: {
		setAccountType(state, action: PayloadAction<accountTypeType>) {
			state.accountType = action.payload;
		},
		setEventData(state, action: PayloadAction<KeyEventData | null>) {
			state.eventData = action.payload;
		},
	},
});

export const { setAccountType, setEventData } =
	walkinKeyCheckInStateSlice.actions;
export default walkinKeyCheckInStateSlice.reducer;
