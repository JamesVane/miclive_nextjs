/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Promoter {
	promoter_sub: string;
	promoter_name: string;
	promoter_tagline: string;
	promoter_id: number;
	promoter_info: {
		city?: string;
		email?: string;
		phone?: string;
		ig?: string;
		link?: string;
	} | null;
}

export interface DJ {
	dj_sub: string;
	dj_name: string;
	dj_tagline: string;
	dj_id: number;
	dj_info: {
		city?: string;
		email?: string;
		phone?: string;
		ig?: string;
		link?: string;
	} | null;
}

type Performer = {
	performer_name: string;
	performer_tagline: string;
	performer_id: number;
	performer_info: {
		city?: string;
		email?: string;
		phone?: string;
		ig?: string;
		link?: string;
	} | null;
	cue_position: number;
};

type performerCurrentEventType = {
	event: {
		base_event_id: number;
		specific_event_id: number;
		event_name: string;
		event_tagline: string;
		base_event_description: string;
		date_description: string;
		start_time: number;
		end_time: number;
		location: { name: string; cords: { lat: number; lng: number } };
		promoter: Promoter;
		dj: DJ;
	};
	submitted_audio: {
		[key: string]: { audio_name: string; audio_key: string; length: number };
	} | null;
	my_cue_position: number;
	roster: { [key: number]: Performer };
	state: {
		current_cue_position: number;
		has_ended: boolean;
		event_state: string;
	};
};

const performerCurrentEventSlice = createSlice({
	name: "performerCurrentEventSlice",
	initialState: {} as performerCurrentEventType,
	reducers: {
		setPerformerCurrentEventState: (
			state,
			action: PayloadAction<performerCurrentEventType>
		) => {
			return action.payload;
		},
	},
});

export const { setPerformerCurrentEventState } =
	performerCurrentEventSlice.actions;
export default performerCurrentEventSlice.reducer;
