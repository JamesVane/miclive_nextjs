/** @format */

import {
	BaseEvent,
	SpecificEvent,
	RequestBody,
	createSpecificEvent,
	ResponseData,
} from "./postCreateSpecificEvent";
import { DateTime } from "luxon";
import { promoterCreateDate } from "../../store/CreateEventDateSlice";

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
type newDatesObj = {
	newStart: string;
	newEnd: string;
};

export const adjustTime = (
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
	return newDatesObj;
};

export const createSpecificEventContainer = async (
	event_data: promoterCreateDate,
	base_event_id: number,
	base_event_name: string,
	base_event_tagline: string
): Promise<ResponseData> => {
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
		base_event_id: base_event_id,
		specificEvent: specificEvent,
		base_event_name: base_event_name,
		base_event_tagline: base_event_tagline,
	};

	return createSpecificEvent(requestBody);
};
