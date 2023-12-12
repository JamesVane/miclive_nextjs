/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type desktopPerformerTicketSelectedType = {
	selectedUpcoming: number;
	selectedPrevious: number;
};

export const desktopPerformerTicketSelectedDefault: desktopPerformerTicketSelectedType =
	{
		selectedUpcoming: 0,
		selectedPrevious: 0,
	};

type desktopPerformerTicketSelectedPayload = {
	selectedUpcoming?: number;
	selectedPrevious?: number;
};

const desktopPerformerTicketSelectedSlice = createSlice({
	name: "desktopPerformerTicketSelectedSlice",
	initialState: desktopPerformerTicketSelectedDefault,
	reducers: {
		setDesktopPerformerTicketSelected: (
			state,
			action: PayloadAction<desktopPerformerTicketSelectedPayload>
		) => {
			if (action.payload.selectedUpcoming) {
				state.selectedUpcoming = action.payload.selectedUpcoming;
			}
			if (action.payload.selectedPrevious) {
				state.selectedPrevious = action.payload.selectedPrevious;
			}
		},
	},
});

export const { setDesktopPerformerTicketSelected } =
	desktopPerformerTicketSelectedSlice.actions;
export default desktopPerformerTicketSelectedSlice.reducer;
