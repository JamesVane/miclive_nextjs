/** @format */

import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setAddConversationToList,
	setUpdateTopMessage,
} from "../store/conversationListSlice";
import { setSingleConversationMessage } from "../store/conversationMessagesSlice";
import { RootState } from "../store/rootStore";
import { setCurrentSub as setCurrentSubSlice } from "@/store/currentSubStore";
import { setShouldReFetchSocket } from "@/store/shouldReFetchFromSocketSlice";
import { setImtermissionTimestamp } from "@/store/PromoterManageEventState";

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

	const getCurrentTimestamp = (): string => {
		return new Date().toISOString();
	};

	const createConversation = useCallback(
		(data: createConversationData) => {
			if (socket && socket.readyState === WebSocket.OPEN) {
				socket.send(JSON.stringify({ action: "CreateConversation", ...data }));
			}
		},
		[socket]
	);

	function initWebsocket() {
		if (user_sub === null) {
			setSocket(null);
		} else {
			const socket = new WebSocket(
				`wss://lv8i9i8a2i.execute-api.us-east-2.amazonaws.com/Dev?user_sub=${user_sub}`
			);

			socket.addEventListener("open", (event: any) => {
				console.log("Connection Established", event);

				const intervalId = setInterval(() => {
					const data = {
						action: "heartbeat",
						user_sub: user_sub,
					};
					socket.send(JSON.stringify(data));
					console.log("ba-bumm");
				}, 40000); // 40000 ms = 40 seconds

				socket.addEventListener("close", () => clearInterval(intervalId));
				socket.addEventListener("error", () => clearInterval(intervalId));
			});

			socket.addEventListener("message", (event) => {
				console.log("Message from server ", event.data);
				const eventData = JSON.parse(event.data);

				if (eventData) {
					if (eventData.new_reaction) {
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

					if (eventData.new_message) {
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

					if (eventData.new_conversation) {
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

					if (eventData.intermission_has_started) {
						const intermissionStamp = eventData.intermission_has_started;
						dispatch(setImtermissionTimestamp(intermissionStamp));
					}
				}
			});

			socket.addEventListener("close", (event) => {
				console.log("Connection closed ", event);
				dispatch(setCurrentSubSlice(null));
			});

			socket.addEventListener("error", (event) => {
				console.log("Connection error ", event);
			});

			setSocket(socket);

			dispatch(setShouldReFetchSocket(getCurrentTimestamp()));
		}
	}

	useEffect(() => {
		initWebsocket();

		return () => {
			socket?.close();
		};
	}, [user_sub]);

	function tickFunction() {
		if (socket && socket.readyState === WebSocket.OPEN) {
			const data = {
				action: "heartbeat",
				user_sub: user_sub,
			};
			socket.send(JSON.stringify(data));
			console.log("ba-bummmmmm");
		} else {
			initWebsocket();
		}
	}

	return { createConversation, tickFunction };
};

export default useWebSocket;
