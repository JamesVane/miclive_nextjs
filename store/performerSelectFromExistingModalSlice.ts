/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface performerSelectFromExistingModalType {
	selectFromSongOpen: number;
	specificEventId: number;
	currentSongLength: number;
	totalAudioLength: number;
	allowedLength: number;
}

export const defaultPerformerSelectFromExistingModal = {
	selectFromSongOpen: 0,
	specificEventId: 0,
	currentSongLength: 0,
	totalAudioLength: 0,
	allowedLength: 0,
};

const performerSelectFromExistingModalSlice = createSlice({
	name: "performerSelectFromExistingModal",
	initialState: defaultPerformerSelectFromExistingModal,
	reducers: {
		setSelectFromExisting: (
			state,
			action: PayloadAction<performerSelectFromExistingModalType>
		) => {
			return action.payload;
		},
	},
});

export const { setSelectFromExisting } =
	performerSelectFromExistingModalSlice.actions;
export default performerSelectFromExistingModalSlice.reducer;
