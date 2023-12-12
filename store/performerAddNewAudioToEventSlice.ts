/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PerformerAddNewAudioToEventType {
	addNewOpen: number;
	specificEventId: number;
}

export const defaultPerformerAddNewAudioToEventType = {
	addNewOpen: 0,
	specificEventId: 0,
};

const performerAddNewAudioToEventSlice = createSlice({
	name: "performerAddNewAudioToEvent",
	initialState: defaultPerformerAddNewAudioToEventType,
	reducers: {
		setAddNewAudioToEvent: (
			state,
			action: PayloadAction<PerformerAddNewAudioToEventType>
		) => {
			return action.payload;
		},
        resetAddNewAudioToEvent : () => {
            return defaultPerformerAddNewAudioToEventType
        }
	},
});

export const { setAddNewAudioToEvent, resetAddNewAudioToEvent } =
performerAddNewAudioToEventSlice.actions;
export default performerAddNewAudioToEventSlice.reducer;
