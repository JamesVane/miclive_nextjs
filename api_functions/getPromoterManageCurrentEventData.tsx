/** @format */

import {
	PromoterManageEventStateType,
	PerformerType,
} from "../store/PromoterManageEventState";

export async function getPromoterManageCurrentEventData(
	request_specific_event_id: string
): Promise<PromoterManageEventStateType> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getpromotermanagecurrenteventdata";
	const queryParam = `?request_specific_event_id=${request_specific_event_id}`;
	const fullUrl = endpoint + queryParam;

	try {
		const response = await fetch(fullUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const rawData = await response.json();
		const mappedData = {
			event_state: rawData.event_state || "not_started",
			event_cue_position: rawData.event_cue_position || 0,
			tickets_can_be_sold: rawData.tickets_can_be_sold || true,
			check_in_id: rawData.check_in_id || "",
			qr_code_uuid: rawData.qr_code_uuid || "",
			event: {
				base_event_id: rawData.event.base_event_id || 0,
				specific_event_id: rawData.event.specific_event_id || 0,
				event_name: rawData.event.event_name || "",
				event_tagline: rawData.event.event_tagline || "",
				base_event_description: rawData.event.base_event_description || "",
				date_description: rawData.event.date_description || "",
				start_time: rawData.event.start_time || 0,
				end_time: rawData.event.end_time || 0,
				location: {
					name: rawData.event.location.name || "",
					cords: {
						lat: rawData.event.location.cords.lat || 0,
						lng: rawData.event.location.cords.lng || 0,
					},
				},
				ticket_price: rawData.event.ticket_price || "0.00",
				early_bird_ticket_price:
					rawData.event.early_bird_ticket_price || "0.00",
				tickets_for_sale: rawData.event.tickets_for_sale || 0,
				tickets_sold: rawData.event.tickets_sold || null,
				total_performers: rawData.event.total_performers || 0,
				time_per_performer: rawData.event.time_per_performer || "",
				tracks_per_performer: rawData.event.tracks_per_performer || 0,
				dj: {
					dj_id: rawData.event.dj.dj_id || 0,
					dj_sub: rawData.event.dj.dj_sub || "",
					dj_name: rawData.event.dj.dj_name || "",
					dj_tagline: rawData.event.dj.dj_tagline || "",
					dj_info: rawData.event.dj.dj_info || {},
				},
			},
			roster: parseRawDataRosterToRosterObjects(
				parseRawDataRoster(rawData.roster),
				rawData
			) || [[{}]],
		};
		return mappedData;
	} catch (error: any) {
		console.error(
			"There was a problem with the fetch operation:",
			error.message
		);
		throw error;
	}
}

function performerArrayToPerformerType(
	performerArray: string[]
): PerformerType {
	let performerInfo = {};
	if (performerArray[4] && performerArray[4] !== "") {
		const correctedJsonString = performerArray[4].replace(/\"\"/g, '"');

		const sanitizedString = correctedJsonString.slice(1, -1);

		try {
			performerInfo = JSON.parse(sanitizedString);
		} catch (error) {
			console.error("Error parsing JSON string:", error);
		}
	}
	const performerType: PerformerType = {
		performer_id: parseInt(performerArray[0]),
		performer_name: performerArray[1].slice(1, -1),
		performer_tagline: performerArray[2],
		performer_sub: performerArray[3],
		performer_info: performerInfo,
		has_audio: performerArray[5] === "t",
		cue_position: parseInt(performerArray[6]),
		checked_in: performerArray[7] === "t",
	};
	return performerType;
}

function parseStringToArray(str: string): string[] {
	const trimmedStr = str.slice(1, -1);
	const arr = trimmedStr.split(",");
	const trimmedArr = arr.map((elem) => elem.trim());
	return trimmedArr;
}

function parseRawDataRoster(rawDataRoster: string[]): PerformerType[] {
	let parsedRosterString: string[][] = [];
	let parsedRosterObjects: PerformerType[] = [];
	for (let item of rawDataRoster) {
		const parsedItem = item;
		parsedRosterString.push(parseStringToArray(parsedItem));
	}
	for (let item of parsedRosterString) {
		parsedRosterObjects.push(performerArrayToPerformerType(item));
	}
	return parsedRosterObjects;
}

function parseRawDataRosterToRosterObjects(
	inputArray: PerformerType[],
	rawData: any
) {
	const currentCuePosition: number = rawData.event_cue_position;

	let returnObject = {
		not_checked_in: [] as PerformerType[],
		checked_in: {} as {
			[key: number]: PerformerType;
		},
		has_performed: {} as {
			[key: number]: PerformerType;
		},
	};

	for (let item of inputArray) {
		if (item.checked_in === false) {
			returnObject.not_checked_in.push(item);
		} else if (item.cue_position >= currentCuePosition) {
			returnObject.has_performed[item.cue_position] = item;
		} else if (item.cue_position < currentCuePosition) {
			returnObject.checked_in[item.cue_position] = item;
		}
	}

	return returnObject;
}
