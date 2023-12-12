/** @format */

// performerAudioKeysStore.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PerformerRoleAudioKeys = {
	audio_id: number;
	name: string;
	audio_length: string;
	performer_id: number;
	isInUse: boolean;
}[];

const performerAudioKeysSlice = createSlice({
	name: "performerAudioKeys",
	initialState: [] as PerformerRoleAudioKeys,
	reducers: {
		setPerformerAudioKey: (
			state,
			action: PayloadAction<PerformerRoleAudioKeys>
		) => {
			return action.payload;
		},
	},
});

export const { setPerformerAudioKey } = performerAudioKeysSlice.actions;
export default performerAudioKeysSlice.reducer;
 