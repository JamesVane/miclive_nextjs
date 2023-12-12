/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type followingEventObj = {
	event_name: string;
	event_tagline: string;
	base_event_id: number;
};

export type performerFollowingArrayV2Type = followingEventObj[];

const performerFollowingArrayV2Slice = createSlice({
	name: "performerFollowingArrayV2Slice",
	initialState: [] as performerFollowingArrayV2Type,
	reducers: {
		setPerformerFollowingArrayV2Slice: (
			state,
			action: PayloadAction<performerFollowingArrayV2Type>
		) => {
			return action.payload;
		},
	},
});

export const { setPerformerFollowingArrayV2Slice } =
	performerFollowingArrayV2Slice.actions;
export default performerFollowingArrayV2Slice.reducer;
