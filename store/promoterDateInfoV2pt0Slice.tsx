/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventData } from "../api_functions/getPromoterEventListV2pt0";

export interface DJType {
	dj_sub: string;
	dj_name: string;
	dj_tagline: string;
	dj_id: number;
	dj_info: {
		City?: string;
		Email?: string;
		Phone?: string;
		IG?: string;
		Link?: string;
	} | null;
}

export type PerformerInRoster = {
	cue_position: number;
	checked_in: number;
	has_submitted_audio: boolean;
	performer_id: number;
	performer_sub: string;
	performer_name: string;
	performer_tagline: string;
	performer_info: {
		City?: string;
		Email?: string;
		Phone?: string;
		IG?: string;
		Link?: string;
	} | null;
};

export type PromoterDateInfoV2pt0Type = {
	specific_event_id: number;
	base_event_id: number;
	start_time: number;
	end_time: number;
	location: { name: string; cords: { lat: number; lng: number } };
	date_description: string;
	ticket_price: number;
	early_bird_ticket_price: number;
	early_bird_end_time: number;
	tickets_for_sale: number;
	tickets_sold: number;
	total_performers: number;
	time_per_performer: number;
	tracks_per_performer: number;
	total_submitted: number;
	total_audio_time: number;
	has_ended: boolean;
	dj: DJType | null;
	roster: PerformerInRoster[];
};

const promoterDateInfoV2pt0Slice = createSlice({
	name: "promoterDateInfoV2pt0Slice",
	initialState: {} as PromoterDateInfoV2pt0Type,
	reducers: {
		setPromoterDateInfoV2pt0: (
			state,
			action: PayloadAction<PromoterDateInfoV2pt0Type>
		) => {
			return action.payload;
		},
		setRemoveDj: (state) => {
			state.dj = null;
		},
	},
});

export const { setPromoterDateInfoV2pt0, setRemoveDj } =
	promoterDateInfoV2pt0Slice.actions;
export default promoterDateInfoV2pt0Slice.reducer;
