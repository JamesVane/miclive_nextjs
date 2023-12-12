/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const HoldNewConversationDefault = {
    "None": {
        name: "None",
        type: "dj",
        roleId: 0,
    }
}

export type HoldNewConversationSliceType = {
    [userSub: string]: {
        name: string;
        type: "performer" | "promoter" | "dj";
        roleId: number;
    }
}

export type setConversationHold = 
    {
        userSub: string;
        name: string;
        type: "performer" | "promoter" | "dj";
        roleId: number;
    }


const HoldNewConversationSlice = createSlice({
	name: "HoldNewConversationSlice",
	initialState: HoldNewConversationDefault as HoldNewConversationSliceType,
	reducers: {
		setHoldNewConversationSlice: (state, action: PayloadAction<setConversationHold>) => {
            state[action.payload.userSub] = {
                name: action.payload.name,
                type: action.payload.type,
                roleId: action.payload.roleId,
            }
		},
	},
});

export const { setHoldNewConversationSlice } = HoldNewConversationSlice.actions;
export default HoldNewConversationSlice.reducer;