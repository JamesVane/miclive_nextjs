/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaceType } from "../google_maps/SearchLocationInput";

export interface DateTimeComponents {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
	millisecond: number;
	zone?: string;
}

type promoterEditEventType = {
	baseEventId: number | null;
	specificEventId: number | null;
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
	page: "baseEvent" | "specificEvent" | "specificEventDesc";
	baseEvent: {
		name: string;
		tagline: string;
		imageFile: any;
	};
	banner3X10: any;
	banner4X10: any;
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
		total_submitted: number;
		total_audio_time: number;
		early_bird_end_time: string | null;
	};
	description: string | null;
	baseDescription: string | null;
};

export const initialState: promoterEditEventType = {
	baseEventId: null,
	specificEventId: null,
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
	},
	banner3X10: null,
	banner4X10: null,
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
		total_submitted: 0,
		total_audio_time: 0,
		early_bird_end_time: null,
	},
	description: null,
	baseDescription: null,
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

type baseDescriptionPayload = {
	description: string;
};

type baseEventPayload = {
	key: "name" | "tagline" | "imageFile";
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
	page: "baseEvent" | "specificEvent" | "specificEventDesc";
};

type baseEventInitPayload = {
	baseEventId: number | null;
	baseEvent: {
		name: string;
		tagline: string;
		imageFile: any;
	};
};
type specificEventInitPayload = {
	baseEventId: number | null;
	specificEventId: number | null;
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
		total_submitted: number;
		total_audio_time: number;
		early_bird_end_time: string | null;
	};
};
type descriptionEventInitPayload = {
	baseEventId: number | null;
	specificEventId: number | null;
	description: string | null;
};

type baseDescriptionEventInitPayload = {
	baseEventId: number | null;
	baseDescription: string | null;
};

const promoterEditEventSlice = createSlice({
	name: "promoterEditEventStore",
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
		setBaseDescription: (
			state,
			action: PayloadAction<baseDescriptionPayload>
		) => {
			state.baseDescription = action.payload.description;
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
		setEditBanner3X10DisplayHelp: (
			state,
			action: PayloadAction<banner3X10DisplayHelpPayload>
		) => {
			const { key, value } = action.payload;
			state.banner3X10DisplayHelp = {
				...state.banner3X10DisplayHelp,
				[key]: value,
			};
		},
		setEditBanner4X10DisplayHelp: (
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
			state.baseEventId = null;
			state.specificEventId = null;
			state.isOpen = false;
			state.locationHelper = null;
			state.imageDisplayHelp = {
				imageSelected: false,
				displayName: null,
				displayURL: null,
				confirmImage: false,
			};
			state.banner3X10DisplayHelp = {
				imageSelected: false,
				displayName: null,
				displayURL: null,
				confirmImage: false,
			};
			state.banner4X10DisplayHelp = {
				imageSelected: false,
				displayName: null,
				displayURL: null,
				confirmImage: false,
			};
			state.page = "baseEvent";
			state.baseEvent = {
				name: "",
				tagline: "",
				imageFile: null,
			};
			state.banner3X10 = null;
			state.banner4X10 = null;
			state.specificEvent = {
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
				total_submitted: 0,
				total_audio_time: 0,
				early_bird_end_time: null,
			};
			state.description = null;
			state.baseDescription = null;
		},
		openClose: (state) => {
			state.isOpen = !state.isOpen;
		},
		setExistingBase: (state, action: PayloadAction<baseEventInitPayload>) => {
			const { baseEventId, baseEvent } = action.payload;
			state.baseEventId = baseEventId;
			state.baseEvent = baseEvent;
		},
		setExistingBanners: (state) => {
			state.banner3X10 = null;
			state.banner4X10 = null;
		},
		setExistingSpecific: (
			state,
			action: PayloadAction<specificEventInitPayload>
		) => {
			const { baseEventId, specificEventId, specificEvent } = action.payload;
			state.baseEventId = baseEventId;
			state.specificEventId = specificEventId;
			state.specificEvent = specificEvent;
		},
		setExistingDescription: (
			state,
			action: PayloadAction<descriptionEventInitPayload>
		) => {
			const { baseEventId, specificEventId, description } = action.payload;
			state.baseEventId = baseEventId;
			state.specificEventId = specificEventId;
			state.description = description;
		},
		setExistingBaseDescription: (
			state,
			action: PayloadAction<baseDescriptionEventInitPayload>
		) => {
			const { baseEventId, baseDescription } = action.payload;
			state.baseEventId = baseEventId;
			state.baseDescription = baseDescription;
		},
		setBanner3X10: (state, action: PayloadAction<any>) => {
			state.banner3X10 = action.payload;
		},
		setBanner4X10: (state, action: PayloadAction<any>) => {
			state.banner4X10 = action.payload;
		},
	},
});

export const {
	setBaseDescription,
	setExistingBaseDescription,
	setBaseEvent,
	switchPage,
	setSpecificEvent,
	setDescription,
	setImageDisplayHelp,
	setToDefault,
	setLocationHelper,
	openClose,
	setExistingBase,
	setExistingSpecific,
	setExistingDescription,
	setExistingBanners,
	setEditBanner4X10DisplayHelp,
	setEditBanner3X10DisplayHelp,
	setBanner3X10,
	setBanner4X10,
} = promoterEditEventSlice.actions;

export default promoterEditEventSlice.reducer;
