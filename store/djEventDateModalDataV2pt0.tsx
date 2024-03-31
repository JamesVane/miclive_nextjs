/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotPerformerEvent } from "../api_functions_no_auth/getSingleDateForNotPerformer";

export interface PromoterType {
	promoter_sub: string;
	promoter_name: string;
	promoter_tagline: string;
	promoter_id: number;
	promoter_info: {
		City?: string;
		Email?: string;
		Phone?: string;
		IG?: string;
		Link?: string;
	} | null;
}

export interface DjType {
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

export type DjEventDateModalDataV2pt0Type = {
	isDjForEvent: boolean;
	specific_event_id: number;
	event_name: string;
	base_event_id: number;
	start_time: number;
	end_time: number;
	location: { name: string; cords: { lat: number; lng: number } };
	date_description: string;
	has_ended: boolean;
	promoter: PromoterType;
	dj: DjType | null;
	roster: PerformerInRoster[] | null;
};

const djEventDateModalDataV2pt0 = createSlice({
	name: "djEventDateModalDataV2pt0",
	initialState: {} as DjEventDateModalDataV2pt0Type,
	reducers: {
		setDjEventDateModalDataV2pt0ForTheirEvent: (
			state,
			action: PayloadAction<DjEventDateModalDataV2pt0Type>
		) => {
			return {
				isDjForEvent: true,
				event_name: action.payload.event_name,
				specific_event_id: action.payload.specific_event_id,
				base_event_id: action.payload.base_event_id,
				start_time: action.payload.start_time,
				end_time: action.payload.end_time,
				location: action.payload.location,
				date_description: action.payload.date_description,
				has_ended: action.payload.has_ended,
				promoter: action.payload.promoter,
				roster: action.payload.roster,
				dj: null,
			};
		},
		setDjEventDateModalDataV2pt0ForNOTTheirEvent: (
			state,
			action: PayloadAction<NotPerformerEvent>
		) => {
			return {
				isDjForEvent: false,
				event_name: action.payload.event_name,
				specific_event_id: action.payload.specific_event_id,
				base_event_id: action.payload.base_event_id,
				start_time: action.payload.start_time,
				end_time: action.payload.end_time,
				location: action.payload.location,
				date_description: action.payload.date_description,
				has_ended: action.payload.has_ended,
				promoter: action.payload.promoter,
				dj: action.payload.dj,
				roster: null,
			};
		},
	},
});

export const {
	setDjEventDateModalDataV2pt0ForTheirEvent,
	setDjEventDateModalDataV2pt0ForNOTTheirEvent,
} = djEventDateModalDataV2pt0.actions;
export default djEventDateModalDataV2pt0.reducer;
