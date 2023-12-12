/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const ConversationListDefault = {
    "None": {
        name: "None",
        type: "dj",
        roleId: 0,
        DND: false,
        pinned: false,
        timestamp: 0,
        topMessage: "",
        unOpened: false,
    }
} 

export type InnerObjectType = {
    name: string;
    type: "performer" | "promoter" | "dj";
    roleId: number;
    DND: boolean;
    pinned: boolean;
    timestamp: number;
    topMessage: string;
    unOpened: boolean;
}

export type ConversationListType = {
    [userSub: string]: InnerObjectType
}
export type addConversationToListType = {
    sub: string;
    name: string;
    type: "performer" | "promoter" | "dj";
    roleId: number;
    DND: boolean;
    pinned: boolean;
    timestamp: number;
    topMessage: string;
    unOpened: boolean;
}

type UpdateStatusType = {
    sub: string;
    DND: boolean; 
    pinned: boolean;
} 

type UpdateTopMessageType = {
    sub: string;
    topMessage: string; 
    timestamp: number;
    unOpened: boolean;
}
 
const ConversationListSlice = createSlice({
	name: "ConversationListSlice",
	initialState: ConversationListDefault as ConversationListType,
	reducers: {
		setAllConversationListSlice: (state, action: PayloadAction<ConversationListType>) => {
            return action.payload;			
		},
        setAddConversationToList: (state, action: PayloadAction<addConversationToListType>) => {
            state[action.payload.sub] = {
                name: action.payload.name,
                type: action.payload.type,
                roleId: action.payload.roleId,
                DND: action.payload.DND,
                pinned: action.payload.pinned, 
                timestamp: action.payload.timestamp, 
                topMessage: action.payload.topMessage,
                unOpened: action.payload.unOpened
            }
        },
        setUpdateStatus: (state, action: PayloadAction<UpdateStatusType>) => {
            state[action.payload.sub].DND = action.payload.DND;
            state[action.payload.sub].pinned = action.payload.pinned;
        },
        setUpdateTopMessage: (state, action: PayloadAction<UpdateTopMessageType>) => {
            state[action.payload.sub].topMessage = action.payload.topMessage;
            state[action.payload.sub].timestamp = action.payload.timestamp;
            state[action.payload.sub].unOpened = action.payload.unOpened;
        },
        setIsOpened: (state, action: PayloadAction<string>) => {
            state[action.payload].unOpened = false;
        }

	},
});

export const { setAllConversationListSlice, setAddConversationToList, setUpdateStatus, setUpdateTopMessage, setIsOpened } = ConversationListSlice.actions;
export default ConversationListSlice.reducer;