/** @format */

import { DateTime } from "luxon";
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

type promoterCreateEventType = {
	baseEventId: number | null;	
	isOpen: boolean;
	locationHelper: PlaceType | null; 
	imageDisplayHelp: { 
		imageSelected: boolean;
		displayName: string | null;
		displayURL: string | null;
		confirmImage: boolean;
	};
	banner3X10DisplayHelp: {
		imageSelected: boolean;
		displayName: string | null;
		displayURL: string | null;
		confirmImage: boolean;
	};
	banner4X10DisplayHelp: {
		imageSelected: boolean;
		displayName: string | null;
		displayURL: string | null;
		confirmImage: boolean;
	};
	page: "baseEvent" | "Banner" | "baseEventDescription" |  "specificEvent" | "specificEventDesc" | "DjInvite";
	baseEvent: {
		name: string;
		tagline: string;
		imageFile: any;		
		banner3X10: any;
		banner4X10: any;
	};
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
	dateImageArray: string[];
	baseEventImageArray: string[];
	baseEventDescription: string | null;
	description: string | null;
};

export const initialState: promoterCreateEventType = {
	baseEventId: null,	
	isOpen: false,
	locationHelper: null,
	imageDisplayHelp: {
		imageSelected: false,
		displayName: null,
		displayURL: null,
		confirmImage: false, 
	},
	banner3X10DisplayHelp: {
		imageSelected: false,
		displayName: null,
		displayURL: null,
		confirmImage: false,
	}, 
	banner4X10DisplayHelp: {
		imageSelected: false,
		displayName: null,
		displayURL: null,
		confirmImage: false,
	},
	page: "baseEvent",
	baseEvent: {
		name: "",
		tagline: "",
		imageFile: null,	
		banner3X10: null,
		banner4X10: null,	
	},
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
	dateImageArray: [],
	baseEventImageArray: [],
	baseEventDescription: null,
	description: null,
};
type imageDisplayHelpPayload = {
	key: "imageSelected" | "displayName" | "displayURL" | "confirmImage";
	value: boolean | string | null;
};

type banner3X10DisplayHelpPayload = {
	key: "imageSelected" | "displayName" | "displayURL" | "confirmImage";
	value: boolean | string | null;
};

type banner4X10DisplayHelpPayload = {
	key: "imageSelected" | "displayName" | "displayURL" | "confirmImage";
	value: boolean | string | null;
};
 
type descriptionPayload = {
	description: string;
};

type baseEventDescriptionPayload = {
	description: string;
};

type baseEventPayload = {
	key: "name" | "tagline" | "imageFile" | "banner3X10" | "banner4X10";
	value: any;
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
	page: "baseEvent" | "Banner" | "baseEventDescription" | "specificEvent" | "specificEventDesc" | "DjInvite";
};

const promoterCreateEventSlice = createSlice({
	name: "promoterCreateEventStore",
	initialState: initialState,
	reducers: {
		setBaseEvent: (state, action: PayloadAction<baseEventPayload>) => {
			const { key, value } = action.payload;
			state.baseEvent[key] = value;
		},
		setSpecificEvent: (state, action: PayloadAction<specificEventPayload>) => {
			state.specificEvent = {
				...state.specificEvent,
				[action.payload.specificKey]: action.payload.specificValue,
			};
		},
		switchPage: (state, action: PayloadAction<switchPagePayload>) => {
			state.page = action.payload.page;
		},
		setDescription: (state, action: PayloadAction<descriptionPayload>) => {
			state.description = action.payload.description;
		},
		setBaseEventDescription: (state, action: PayloadAction<baseEventDescriptionPayload>) => {
			state.baseEventDescription = action.payload.description;
		},
		setImageDisplayHelp: (
			state,
			action: PayloadAction<imageDisplayHelpPayload>
		) => {
			const { key, value } = action.payload;
			state.imageDisplayHelp = {
				...state.imageDisplayHelp,
				[key]: value,
			};
		},
		setBanner3X10DisplayHelp: (
			state,
			action: PayloadAction<banner3X10DisplayHelpPayload>
		) => {
			const { key, value } = action.payload;
			state.banner3X10DisplayHelp = {
				...state.banner3X10DisplayHelp,
				[key]: value,
			};
		},
		setBanner4X10DisplayHelp: (
			state,
			action: PayloadAction<banner4X10DisplayHelpPayload>
		) => {
			const { key, value } = action.payload;
			state.banner4X10DisplayHelp = {
				...state.banner4X10DisplayHelp,
				[key]: value,
			};
		},
		setLocationHelper: (state, action: PayloadAction<PlaceType | null>) => {
			state.locationHelper = action.payload;
		},
		setToDefault: (state) => {
			Object.assign(state, initialState);
		},

		openClose: (state) => {
			state.isOpen = !state.isOpen;
		},
		addToBaseEventImageArray: (state, action: PayloadAction<string>) => {
			state.baseEventImageArray = [
				...state.baseEventImageArray,
				action.payload,
			]
		},
		addToDateImageArray: (state, action: PayloadAction<string>) => {
			state.dateImageArray = [...state.dateImageArray, action.payload];
		}
	},
});

export const {
	addToDateImageArray,
	addToBaseEventImageArray,
	setBaseEventDescription,
	setBaseEvent,
	switchPage,
	setSpecificEvent,
	setDescription,
	setImageDisplayHelp,
	setToDefault,
	setLocationHelper,
	openClose,	
	setBanner3X10DisplayHelp,
	setBanner4X10DisplayHelp,
} = promoterCreateEventSlice.actions;

export default promoterCreateEventSlice.reducer;
