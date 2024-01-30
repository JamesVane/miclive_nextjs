/** @format */

"use client";
import { useEffect } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { getConversationList } from "@/api_functions/getConversationList";
import { setAllConversationListSlice } from "@/store/conversationListSlice";
import { setConversationMessagesDefault } from "@/store/conversationMessagesSlice";
import { setCurrentSub as setCurrentSubSlice } from "@/store/currentSubStore";
import useWebSocket from "@/WebSocket/useWebSocket";
import { RootState } from "@/store/rootStore";
import { SocketContext } from "@/SocketContext";

function SocketWrapperHelper({ children }: { children: React.ReactNode }) {
	const dispatch = useDispatch();

	const { userSub: currentSub } = useSelector(
		(state: RootState) => state.CurrentSubStore
	);

	function handleSetCurrentSub(value: string | null) {
		dispatch(setCurrentSubSlice(value));
	}

	const { createConversation, tickFunction } = useWebSocket(currentSub);

	function handleVisibilityChange() {
		if (currentSub === null) {
			checkUser();
		} else {
			tickFunction();
		}
	}

	useEffect(() => {
		window.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			window.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	async function checkUser() {
		try {
			const currentUser = await Auth.currentAuthenticatedUser();
			if (currentUser.attributes) {
				handleSetCurrentSub(currentUser.attributes.sub);
			}
		} catch {
			handleSetCurrentSub(null);
		}
	}

	useEffect(() => {
		if (currentSub === null) {
			checkUser();
		}
	}, [currentSub]);

	async function handleSetConversations() {
		dispatch(setConversationMessagesDefault());

		if (currentSub) {
			const fetchedConversationList = await getConversationList(currentSub);

			console.log("fetchedConversationList", fetchedConversationList);

			if (fetchedConversationList !== false) {
				dispatch(setAllConversationListSlice(fetchedConversationList));
			}
		}
	}

	useEffect(() => {
		handleSetConversations();
	}, [currentSub]);

	return (
		<>
			<SocketContext.Provider value={{ createConversation }}>
				{children}
			</SocketContext.Provider>
		</>
	);
}

export default SocketWrapperHelper;
