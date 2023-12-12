/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TicketEvent } from "../api_functions/getPerformerTicketEventsV2pt0";

export type performerTicketsV2pt0Type = {
	upcoming: TicketEvent[];
	previous: TicketEvent[];
};

const performerTicketsV2pt0 = createSlice({
	name: "performerTicketsV2pt0",
	initialState: {} as performerTicketsV2pt0Type,
	reducers: {
		setPerformerTicketsV2pt0: (
			state,
			action: PayloadAction<performerTicketsV2pt0Type>
		) => {
			return action.payload;
		},
	},
});

export const { setPerformerTicketsV2pt0 } = performerTicketsV2pt0.actions;
export default performerTicketsV2pt0.reducer;
