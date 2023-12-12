/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const defaultConversationMessages = {
    "sender-reciver": {
        0: {
            message: "",
            reaction: {sender: null, reciver: null}
        }
    }
} 

export type setAllConversationMessagesType = {
    [senderReciver : string] : {
        [timestamp : number] : {
            message : string,
            reaction: {sender : "Thumb" | "?" | "!" | null, reciver : "Thumb" | "?" | "!" | null}
        }
    }
}
type singleConversationMessageType = {
    senderReciver : string,
    timestamp : number,
    message : string,
    reaction : {sender : "Thumb" | "?" | "!" | null, reciver : "Thumb" | "?" | "!" | null}
}

const ConversationMessageSlice = createSlice({
	name: "conversationMessageSlice",
	initialState: defaultConversationMessages as setAllConversationMessagesType,
	reducers: {
		setAllConversationMessages: (
			state,
			action: PayloadAction<setAllConversationMessagesType>
		) => {
            return action.payload;
		}, 
        setSingleConversationMessage: (
            state,
            action: PayloadAction<singleConversationMessageType>
        ) => {
            const {senderReciver, timestamp, message, reaction} = action.payload;
            if(state[senderReciver] === undefined){
                state[senderReciver] = {};
            }
            state[senderReciver][timestamp] = {
                message,
                reaction
            }
        },
        setConversationMessagesDefault : () => { 
            return { ...defaultConversationMessages };
        }
	},
});

export const { setAllConversationMessages, setSingleConversationMessage, setConversationMessagesDefault } = ConversationMessageSlice.actions;
export default ConversationMessageSlice.reducer;
