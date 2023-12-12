/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	DjEventDateV2pt0Type,
	upPrevObj,
} from "../api_functions/getDjEventDateList";

const DjEventDateListV2pt0Slice = createSlice({
	name: "DjEventDateListV2pt0Slice",
	initialState: {} as DjEventDateV2pt0Type,
	reducers: {
		setDjEventDateList: (state, action: PayloadAction<upPrevObj>) => {
			return {
				isDj: true,
				modalIsOpen: state.modalIsOpen,
				datesObj: action.payload,
			};
		},
		setModalNumberIsDj: (state, action: PayloadAction<number | null>) => {
			return {
				isDj: true,
				modalIsOpen: action.payload,
				datesObj: state.datesObj,
			};
		},
		setModalNumberNotDj: (state, action: PayloadAction<number | null>) => {
			return {
				isDj: false,
				modalIsOpen: action.payload,
				datesObj: state.datesObj,
			};
		},
	},
});

export const { setDjEventDateList, setModalNumberIsDj, setModalNumberNotDj } =
	DjEventDateListV2pt0Slice.actions;
export default DjEventDateListV2pt0Slice.reducer;
