/** @format */

"use client";
import { useEffect, useRef, useCallback } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { getConversationList } from "@/api_functions/getConversationList";
import { debounce } from "lodash";
import { setAllConversationListSlice } from "@/store/conversationListSlice";
import { setConversationMessagesDefault } from "@/store/conversationMessagesSlice";
import { setCurrentSub as setCurrentSubSlice } from "@/store/currentSubStore";
import useWebSocket from "@/WebSocket/useWebSocket";
import { RootState } from "@/store/rootStore";
import { setIsTimedOutState } from "@/store/isTimedOutSlice";
import { SocketContext } from "@/SocketContext";

function SocketWrapperHelper({ children }: { children: React.ReactNode }) {
	const dispatch = useDispatch();

	const activityTimeoutId = useRef<NodeJS.Timeout | null>(null);

	const { userSub: currentSub } = useSelector(
		(state: RootState) => state.CurrentSubStore
	);

	function handleSetCurrentSub(value: string | null) {
		dispatch(setCurrentSubSlice(value));
	}

	const { createConversation } = useWebSocket(currentSub);

	const resetTimer = useCallback(() => {
		if (activityTimeoutId.current) {
			clearTimeout(activityTimeoutId.current);
		}
		activityTimeoutId.current = setTimeout(() => {
			console.log("activity timeout");
			dispatch(setIsTimedOutState(true));
			handleSetCurrentSub(null);
		}, 120000);
	}, []);

	const handleUserActivity = useCallback(
		debounce(() => {
			if (currentSub) {
				console.log("activity detected");
				resetTimer();
			}
		}, 200),
		[resetTimer, currentSub]
	);

	useEffect(() => {
		window.addEventListener("mousemove", handleUserActivity);
		window.addEventListener("keypress", handleUserActivity);
		window.addEventListener("touchstart", handleUserActivity);
		window.addEventListener("mousedown", handleUserActivity);
		window.addEventListener("keydown", handleUserActivity);

		return () => {
			window.removeEventListener("mousemove", handleUserActivity);
			window.removeEventListener("keypress", handleUserActivity);
			window.removeEventListener("touchstart", handleUserActivity);
			window.removeEventListener("mousedown", handleUserActivity);
			window.removeEventListener("keydown", handleUserActivity);
		};
	}, [handleUserActivity]);

	useEffect(() => {
		if (currentSub) {
			console.log("interacted");
			resetTimer();
		}
	}, [currentSub, resetTimer]);

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
	}, []);

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
