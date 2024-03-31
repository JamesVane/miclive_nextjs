/** @format */

import {
	BaseEvent,
	SpecificEvent,
	RequestBody,
	createEvent,
	ResponseData,
} from "./postCreateBaseAndSpecificEvent";
import { DateTime } from "luxon";

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

interface PromoterCreateEventType {
	page:
		| "baseEvent"
		| "Banner"
		| "baseEventDescription"
		| "specificEvent"
		| "specificEventDesc"
		| "DjInvite";
	baseEvent: {
		name: string;
		tagline: string;
		imageFile: any;
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
	baseEventDescription: string | null;
	description: string | null;
}
type newDatesObj = {
	newStart: string;
	newEnd: string;
};

const adjustTime = (
	date: string,
	startTime: DateTimeComponents,
	endTime: DateTimeComponents
): newDatesObj => {
	let newStart = DateTime.fromObject({
		year: parseInt(date.split("-")[0]),
		month: parseInt(date.split("-")[1]),
		day: parseInt(date.split("-")[2]),
		hour: startTime.hour,
		minute: startTime.minute,
		second: startTime.second,
	});
	let newEnd = DateTime.fromObject({
		year: parseInt(date.split("-")[0]),
		month: parseInt(date.split("-")[1]),
		day: parseInt(date.split("-")[2]),
		hour: endTime.hour,
		minute: endTime.minute,
		second: endTime.second,
	});
	if (newStart > newEnd) {
		newEnd = newEnd.plus({ days: 1 });
	}
	const newDatesObj = {
		newStart: newStart.toISO()!,
		newEnd: newEnd.toISO()!,
	};
	console.log("newDatesObj", newDatesObj);
	return newDatesObj;
};

export const createBaseAndSpecificEventContainer = async (
	event_data: PromoterCreateEventType
): Promise<ResponseData> => {
	const baseEvent: BaseEvent = {
		name: event_data.baseEvent.name,
		tagline: event_data.baseEvent.tagline,
		baseEventDescription: event_data.baseEventDescription || "",
	};

	const specificEvent: SpecificEvent = {
		start_time: adjustTime(
			event_data.specificEvent.start_date!,
			event_data.specificEvent.start_time!,
			event_data.specificEvent.end_time!
		).newStart,
		end_time: adjustTime(
			event_data.specificEvent.start_date!,
			event_data.specificEvent.start_time!,
			event_data.specificEvent.end_time!
		).newEnd,
		location: event_data.specificEvent.location,
		total_performers: event_data.specificEvent.total_performers || 0,
		time_per_performer: event_data.specificEvent.time_per_performer,
		songs_per_performer: event_data.specificEvent.performer_track_limit || 2,
		ticket_amount: event_data.specificEvent.total_ticket_amount || 0,
		regular_ticket_price: event_data.specificEvent.regular_ticket_price || 0,
		early_bird_ticket_price:
			event_data.specificEvent.early_bird_ticket_price || 0,
		early_bird_end_time: event_data.specificEvent.early_bird_end_time || "",
		description: event_data.description || "",
	};

	const requestBody: RequestBody = {
		baseEvent: baseEvent,
		specificEvent: specificEvent,
	};

	return createEvent(requestBody);
};
