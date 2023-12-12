/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DjPrimaryEvent } from "../api_functions/getDjPrimaryEventsV2pt0";

const DjPrimaryEventsListV2pt0Slice = createSlice({
	name: "DjPrimaryEventsListV2pt0Slice",
	initialState: [] as DjPrimaryEvent[],
	reducers: {
		setPrimaryDjEventList: (state, action: PayloadAction<DjPrimaryEvent[]>) => {
			return (state = action.payload);
		},
	},
});

export const { setPrimaryDjEventList } = DjPrimaryEventsListV2pt0Slice.actions;
export default DjPrimaryEventsListV2pt0Slice.reducer;
