/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export type DateType = {
	has_ended: boolean;
	specific_event_id: number;
	start_time: number;
	end_time: number;
	location: { name: string; cords: { lat: number; lng: number } };
};

export type EventPageData = {
	base_event_id: number;
	event_name: string;
	event_tagline: string;
	event_description: string;
	image_array: string[];
	primary_dj: DJType | null;
	upcoming_dates: DateType[];
	previous_dates: DateType[];
};

export type PromoterEventPageV2pt0SliceType = {
	selected_specific_event: number | null;
	event_data: EventPageData;
};

const PromoterEventPageV2pt0Slice = createSlice({
	name: "PromoterEventPageV2pt0Slice",
	initialState: {} as PromoterEventPageV2pt0SliceType,
	reducers: {
		setSelectedSpecificEvent: (state, action: PayloadAction<number | null>) => {
			state.selected_specific_event = action.payload;
		},
		setPageData: (state, action: PayloadAction<EventPageData>) => {
			state.event_data = action.payload;
		},
		setRemoveEventDj: (state) => {
			state.event_data.primary_dj = null;
		},
	},
});

export const { setSelectedSpecificEvent, setPageData, setRemoveEventDj } =
	PromoterEventPageV2pt0Slice.actions;
export default PromoterEventPageV2pt0Slice.reducer;
