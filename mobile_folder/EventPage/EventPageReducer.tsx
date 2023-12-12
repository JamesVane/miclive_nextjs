/** @format */

export interface Promoter {
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

export interface DJ {
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
	performer_has_ticket: boolean;
};

export type AuthEventPageData = {
	base_event_id: number;
	event_name: string;
	event_description: string;
	event_tagline: string;
	promoter: Promoter | null;
	dj: DJ | null;
	upcomingDates: DateType[];
	previousDates: DateType[];
};

export type eventPageStateType = "loading" | "performer auth" | "not performer";

export const defaultEventPageData = {
	data: {
		base_event_id: 0,
		event_name: "",
		event_description: "",
		event_tagline: "",
		promoter: null,
		dj: null,
		upcomingDates: [],
		previousDates: [],
	},
	pageState: "loading" as eventPageStateType,
};

export type EventPageReducerStateType = {
	data: AuthEventPageData;
	pageState: eventPageStateType;
};

export type EventPageReducerType = {
	type: "performer auth" | "not performer";
	data: AuthEventPageData;
};

export function eventPageReducer(
	state: EventPageReducerStateType,
	action: EventPageReducerType
) {
	switch (action.type) {
		case "performer auth": {
			const dispatchData = action.data;
			return {
				data: dispatchData,
				pageState: "performer auth" as eventPageStateType,
			};
		}
		case "not performer": {
			const dispatchData = action.data;
			return {
				data: dispatchData,
				pageState: "not performer" as eventPageStateType,
			};
		}
	}
}
