/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaceType } from "../google_maps/SearchLocationInput";

interface DateTimeComponents {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
	millisecond: number;
	zone?: string;
}

export type promoterCreateDate = {
	locationHelper: PlaceType | null;
	imageDisplayHelp: {
		imageSelected: boolean;
		displayName: string | null;
		displayURL: string | null;
		confirmImage: boolean;
	};
	page: "specificEvent" | "specificEventDesc" | "DjInvite";
	specificEvent: {
		start_date: string | null;
		start_time: DateTimeComponents | null;
		end_time: DateTimeComponents | null;
		location: { name: string; cords: { lat: number; lng: number } };
		total_performers: number | null;
		time_per_performer: number;
		performer_track_limit: number | null;
		total_ticket_amount: number | null;
		regular_ticket_price: number | null;
		early_bird_ticket_price: number | null;
		early_bird_end_time: string | null;
	};
	description: string | null;
};

export const initialState: promoterCreateDate = {
	locationHelper: null,
	imageDisplayHelp: {
		imageSelected: false,
		displayName: null,
		displayURL: null,
		confirmImage: false,
	},
	page: "specificEvent",
	specificEvent: {
		start_date: null,
		start_time: null,
		end_time: null,
		location: { name: "", cords: { lat: 0, lng: 0 } },
		total_performers: 0,
		time_per_performer: 0,
		performer_track_limit: 1,
		total_ticket_amount: 0,
		regular_ticket_price: 0,
		early_bird_ticket_price: 0,
		early_bird_end_time: null,
	},
	description: null,
};

type descriptionPayload = {
	description: string;
};
type specificEventPayload = {
	specificKey:
		| "start_date"
		| "start_time"
		| "end_time"
		| "location"
		| "total_performers"
		| "time_per_performer"
		| "performer_track_limit"
		| "total_ticket_amount"
		| "regular_ticket_price"
		| "early_bird_ticket_price"
		| "early_bird_end_time";
	specificValue:
		| { name: string; cords: { lat: number; lng: number } }
		| number
		| string
		| null;
};

type switchPagePayload = {
	page: "specificEvent" | "specificEventDesc" | "DjInvite";
};

const promoterCreateDate = createSlice({
	name: "promoterCreateDate",
	initialState: initialState,
	reducers: {
		setSpecificEventDate: (
			state,
			action: PayloadAction<specificEventPayload>
		) => {
			state.specificEvent = {
				...state.specificEvent,
				[action.payload.specificKey]: action.payload.specificValue,
			};
		},
		switchPageDate: (state, action: PayloadAction<switchPagePayload>) => {
			state.page = action.payload.page;
		},
		setDescriptionDate: (state, action: PayloadAction<descriptionPayload>) => {
			state.description = action.payload.description;
		},
		setLocationHelperDate: (state, action: PayloadAction<PlaceType | null>) => {
			state.locationHelper = action.payload;
		},
		setToDefaultDate: (state) => {
			Object.assign(state, initialState);
		},
	},
});

export const {
	switchPageDate,
	setSpecificEventDate,
	setDescriptionDate,
	setToDefaultDate,
	setLocationHelperDate,
} = promoterCreateDate.actions;

export default promoterCreateDate.reducer;
