/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PersonInfoType = {
	City?: string;
	Email?: string;
	Phone?: string;
	IG?: string;
	Link?: string;
} | null;

export type PerformerType = {
	performer_id: number;
	performer_name: string;
	performer_account_phone_number: string;
	performer_tagline: string;
	performer_sub: string;
	performer_info: PersonInfoType;
	has_audio: boolean;
	cue_position: number;
	checked_in: boolean;
	is_temp_account: boolean;
};

type DjType = {
	dj_id: number;
	dj_sub: string;
	dj_name: string;
	dj_tagline: string;
	dj_info: PersonInfoType;
};

export type EventInfoType = {
	base_event_id: number;
	specific_event_id: number;
	event_name: string;
	event_tagline: string;
	date_description: string;
	start_time: number;
	end_time: number;
	location: { name: string; cords: { lat: number; lng: number } };
	ticket_price: number;
	early_bird_ticket_price: number;
	tickets_for_sale: number;
	tickets_sold: number;
	total_performers: number;
	time_per_performer: number;
	tracks_per_performer: number;
	dj: DjType;
};

export type PromoterCueObjectType = {
	[key: number]: PerformerType;
};

export type PromoterManageEventStateType = {
	intermission_timer_stamp: string | null;
	event_has_started: boolean;
	event_cue_position: number;
	has_ended: boolean;
	tickets_can_be_sold: boolean;
	check_in_id: string;
	qr_code_uuid: string;
	event: EventInfoType;
	roster: {
		not_checked_in: PerformerType[];
		checked_in: PromoterCueObjectType;
		has_performed: PromoterCueObjectType;
	};
};

const PromoterManageEventState = createSlice({
	name: "PromoterManageEventState",
	initialState: {} as PromoterManageEventStateType,
	reducers: {
		setPromoterManageState: (
			state,
			action: PayloadAction<PromoterManageEventStateType>
		) => {
			return action.payload;
		},
		promoterManageAdjustQueuePositionFromDND: (
			state,
			action: PayloadAction<PromoterCueObjectType>
		) => {
			state.roster.checked_in = action.payload;
		},
		setImtermissionTimestamp: (state, action: PayloadAction<string | null>) => {
			state.intermission_timer_stamp = action.payload;
		},
		setUpdateDNDFromSocketPromoter: (
			state,
			action: PayloadAction<
				[
					{
						request_performer_role_id: number;
						request_cue_position: number;
					}
				]
			>
		) => {
			let returnObj: PromoterCueObjectType = state.roster.checked_in;
			const inputArray = action.payload;
			let valueObjectLookupFromPerformerId: {
				value: PerformerType;
				queuePos: number;
			}[] = [];
			for (let x of inputArray) {
				const loopedPerformerId = x.request_performer_role_id;
				const loopedCuePosition = x.request_cue_position;
				Object.entries(state.roster.checked_in).map(([key, mappedObj]) => {
					if (mappedObj.performer_id == loopedPerformerId) {
						const returnMappedObject = {
							...mappedObj,
							cue_position: loopedCuePosition,
						};
						valueObjectLookupFromPerformerId.push({
							value: returnMappedObject,
							queuePos: loopedCuePosition,
						});
					}
				});
			}
			for (let x of valueObjectLookupFromPerformerId) {
				returnObj[x.queuePos] = x.value;
			}
			state.roster.checked_in = returnObj;
		},
		setNextPerformer: (state, action: PayloadAction<number>) => {
			const newQueuePos = Number(action.payload) - 1;
			console.log("action.payload:", action.payload);
			console.log(
				"state.roster.checked_in[Number(newQueuePos)]:",
				state.roster.checked_in[Number(newQueuePos)]
			);
			state.roster.has_performed[Number(newQueuePos)] =
				state.roster.checked_in[Number(newQueuePos)];
			delete state.roster.checked_in[Number(newQueuePos)];
			state.event_cue_position = Number(action.payload);
		},
		setEventhasStarted: (state, action: PayloadAction<boolean>) => {
			if (action.payload === true) {
				state.event_cue_position = 1;
			}
			state.event_has_started = action.payload;
		},
		setEventHasEnded: (state, action: PayloadAction<boolean>) => {
			state.has_ended = action.payload;
		},
		setCuePositionPlusOnePromoter: (state) => {
			state.roster.has_performed[state.event_cue_position] =
				state.roster.checked_in[state.event_cue_position];
			delete state.roster.checked_in[state.event_cue_position];
			state.event_cue_position = state.event_cue_position + 1;
		},
	},
});

export const {
	setCuePositionPlusOnePromoter,
	setEventHasEnded,
	setEventhasStarted,
	setNextPerformer,
	setUpdateDNDFromSocketPromoter,
	setImtermissionTimestamp,
	setPromoterManageState,
	promoterManageAdjustQueuePositionFromDND,
} = PromoterManageEventState.actions;
export default PromoterManageEventState.reducer;
