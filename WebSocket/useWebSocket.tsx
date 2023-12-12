/** @format */

import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setAddConversationToList,
	setUpdateTopMessage,
} from "../store/conversationListSlice";
import { setSingleConversationMessage } from "../store/conversationMessagesSlice";
import { RootState } from "../store/rootStore";

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

const useWebSocket = (user_sub: string | null) => {
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const dispatch = useDispatch();

	const createConversation = useCallback(
		(data: createConversationData) => {
			if (socket && socket.readyState === WebSocket.OPEN) {
				socket.send(JSON.stringify({ action: "CreateConversation", ...data }));
			}
		},
		[socket]
	);

	useEffect(() => {
		if (user_sub === null) return;

		// Create WebSocket connectionb
		const socket = new WebSocket(
			`wss://lv8i9i8a2i.execute-api.us-east-2.amazonaws.com/Dev?user_sub=${user_sub}`
		);

		setSocket(socket);

		// Connection opened
		socket.addEventListener("open", (event) => {
			console.log("Connection Established");

			// Send a heartbeat message every 2 minutes
			const intervalId = setInterval(() => {
				const data = {
					action: "heartbeat",
					user_sub: user_sub,
				};
				socket.send(JSON.stringify(data));
				console.log("ba-bumm");
			}, 6000); // 120000 ms = 2 minutes

			// Clear interval on connection close or error
			socket.addEventListener("close", () => clearInterval(intervalId));
			socket.addEventListener("error", () => clearInterval(intervalId));
		});

		// Listen for messages
		socket.addEventListener("message", (event) => {
			console.log("Message from server ", event.data);
			const eventData = JSON.parse(event.data);

			if (eventData && eventData.new_reaction) {
				const newReactionData = eventData.new_reaction;

				console.log("newReactionData", newReactionData);

				const senderName = newReactionData.sender_name;

				const newTopMessage = `${senderName} reacted to: "${newReactionData.message}"`;
				const messageKey = newReactionData.request_primary_key;

				dispatch(
					setUpdateTopMessage({
						sub: newReactionData.senderSub,
						topMessage: newTopMessage,
						timestamp: newReactionData.currentTimestamp,
						unOpened: true,
					})
				);

				dispatch(
					setSingleConversationMessage({
						senderReciver: messageKey,
						timestamp: newReactionData.timestamp,
						message: newReactionData.message,
						reaction: newReactionData.reaction,
					})
				);
			}

			if (eventData && eventData.new_message) {
				const newMessageData = eventData.new_message;

				const themToMe = `${newMessageData.senderSub}-${user_sub}`;

				console.log("newMessageData", newMessageData);
				dispatch(
					setUpdateTopMessage({
						sub: newMessageData.senderSub,
						topMessage: newMessageData.topMessage,
						timestamp: newMessageData.timestamp,
						unOpened: true,
					})
				);

				dispatch(
					setSingleConversationMessage({
						senderReciver: themToMe,
						timestamp: newMessageData.timestamp,
						message: newMessageData.topMessage,
						reaction: { sender: null, reciver: null },
					})
				);
			}

			if (eventData && eventData.new_conversation) {
				const newConversation = eventData.new_conversation;
				console.log("New conversation data: ", newConversation);
				dispatch(
					setAddConversationToList({
						sub: newConversation.senderSub,
						name: newConversation.name,
						type: newConversation.type,
						roleId: newConversation.roleId,
						DND: false,
						pinned: false,
						timestamp: newConversation.timestamp,
						topMessage: newConversation.topMessage,
						unOpened: true,
					})
				);
			}
		});

		// Connection closed
		socket.addEventListener("close", (event) => {
			console.log("Connection closed ", event);
		});

		// Connection error
		socket.addEventListener("error", (event) => {
			console.log("Connection error ", event);
		});

		return () => {
			socket.close();
		};
	}, [user_sub]);

	return { createConversation };
};

export default useWebSocket;
