import React from 'react';

interface createConversationData {
	userSub: string;
	reciverSub: string;
	reciverName: string;
	senderName: string;
	reciverType: string;
	senderType: string;
	reciverRoleId: string;
	senderRoleId: string;
	message: string;
}

export const SocketContext = React.createContext<{
	createConversation: (data: createConversationData) => void;
}>({
	createConversation: () => {}, // default value, will be overwritten by Provider
});