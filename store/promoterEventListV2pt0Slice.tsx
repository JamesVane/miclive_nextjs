/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventData } from "../api_functions/getPromoterEventListV2pt0";

export type PromoterEventListV2pv0Type = EventData[];

const promoterEventListV2pt0Slice = createSlice({
	name: "promoterEventListV2pt0Slice",
	initialState: [] as PromoterEventListV2pv0Type,
	reducers: {
		setPromoterEventListV2pt0Slice: (
			state,
			action: PayloadAction<PromoterEventListV2pv0Type>
		) => {
			return action.payload;
		},
	},
});

export const { setPromoterEventListV2pt0Slice } =
	promoterEventListV2pt0Slice.actions;
export default promoterEventListV2pt0Slice.reducer;
