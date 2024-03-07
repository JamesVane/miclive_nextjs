/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const currentEventSpecificEventIdSliceDefault = {
	specificEventId: null,
};

type CurrentEventSpecificEventIdSliceType = {
	specificEventId: number | null;
};

const currentEventSpecificEventIdSlice = createSlice({
	name: "currentEventSpecificEventIdSliceDefault",
	initialState:
		currentEventSpecificEventIdSliceDefault as CurrentEventSpecificEventIdSliceType,
	reducers: {
		setCurrentEventSpecificEventId: (
			state,
			action: PayloadAction<number | null>
		) => {
			state.specificEventId = action.payload;
		},
	},
});

export const { setCurrentEventSpecificEventId } =
	currentEventSpecificEventIdSlice.actions;
export default currentEventSpecificEventIdSlice.reducer;
