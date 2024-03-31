/** @format */

import { DateTime } from "luxon";
import { putEditSpecificEventInfo } from "./putEditSpecificEventInfo";
import { DateTimeComponents } from "../../store/promoterEditEventSlice";

type incomingEventInfo = {
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

export async function putEditSpecificEventInfoContainer(
	specificEventId: number,
	eventInfo: incomingEventInfo
) {
	console.log("request specific id", specificEventId);
	const {
		start_date,
		start_time,
		end_time,
		location,
		total_performers,
		time_per_performer,
		performer_track_limit,
		total_ticket_amount,
		regular_ticket_price,
		early_bird_ticket_price,
		early_bird_end_time,
	} = eventInfo;
	const newDatesObj = adjustTime(start_date!, start_time!, end_time!);
	const { newStart, newEnd } = newDatesObj;
	const newEventInfo = {
		start_time: newStart,
		end_time: newEnd,
		location: location,
		total_performers: total_performers!,
		time_per_performer: time_per_performer!,
		songs_per_performer: performer_track_limit!,
		ticket_amount: total_ticket_amount!,
		regular_ticket_price: regular_ticket_price!,
		early_bird_ticket_price: early_bird_ticket_price!,
		early_bird_end_time: early_bird_end_time!,
	};
	const response = await putEditSpecificEventInfo(
		specificEventId,
		newEventInfo
	);
	return response;
}
