/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubmittedAudioType } from "@/UniversalTypes";

export type PerformerObjectType = {
	cue_position: number;
	checked_in: boolean;
	performer_id: number;
	performer_name: string;
	performer_tagline: string;
	time_used: number;
	submitted_audio: SubmittedAudioType | {};
};

export type CueObjectType = {
	[cuePosition: number]: PerformerObjectType;
};

export type CueArraytype = PerformerObjectType[];

export type djManageEventSliceType = {
	base_event: number;
	specific_event_id: number;
	event_name: string;
	event_tagline: string;
	location: string;
	event_cue_position: number;
	start_time: number;
	end_time: number;
	tickets_can_be_sold: boolean;
	total_performers: number;
	time_per_performer: number;
	event_has_started: boolean;
	not_checked_in: CueArraytype;
	checked_in: CueObjectType;
	has_performed: CueObjectType;
};

export type swapPerformerCuePositionType = {
	thisCuePosition: number;
	targetCuePosition: number;
};

const djManageEventSlice = createSlice({
	name: "djManageEvent",
	initialState: {} as djManageEventSliceType,
	reducers: {
		setAllDjManageEventSlice: (
			state,
			action: PayloadAction<djManageEventSliceType>
		) => {
			return action.payload;
		},
		swapPerformerCuePositionReducer: (
			state,
			action: PayloadAction<swapPerformerCuePositionType>
		) => {
			const { thisCuePosition, targetCuePosition } = action.payload;
			const thisPerformer = state.checked_in[thisCuePosition];
			const targetPerformer = state.checked_in[targetCuePosition];
			state.checked_in[thisCuePosition] = {
				...targetPerformer,
				cue_position: thisCuePosition,
			};
			state.checked_in[targetCuePosition] = {
				...thisPerformer,
				cue_position: targetCuePosition,
			};
		},
		adjustQueuePositionFromDND: (
			state,
			action: PayloadAction<CueObjectType>
		) => {
			state.checked_in = action.payload;
		},
	},
});

export const {
	setAllDjManageEventSlice,
	swapPerformerCuePositionReducer,
	adjustQueuePositionFromDND,
} = djManageEventSlice.actions;
export default djManageEventSlice.reducer;
