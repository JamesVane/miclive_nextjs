/** @format */

"use client";
import { useEffect } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
// import { getConversationList } from "@/api_functions/getConversationList";
import { setAllConversationListSlice } from "@/store/conversationListSlice";
import { setCurrentEventSpecificEventId } from "@/store/currentEventSpecificEventIdSlice";
import { setConversationMessagesDefault } from "@/store/conversationMessagesSlice";
import { setCurrentSub as setCurrentSubSlice } from "@/store/currentSubStore";
// import useWebSocket from "@/WebSocket/useWebSocket";
import { RootState } from "@/app/LocalizationProviderHelper";
// import { SocketContext } from "@/SocketContext";
import PusherLogic from "./PusherLogic";
import { usePathname } from "next/navigation";

function SocketWrapperHelper({ children }: { children: React.ReactNode }) {
	const dispatch = useDispatch();
	const pathname = usePathname();

	const { userSub: currentSub } = useSelector(
		(state: RootState) => state.CurrentSubStore
	);

	function handleSetCurrentSub(value: string | null) {
		dispatch(setCurrentSubSlice(value));
	}

	/* const { createConversation, tickFunction } = useWebSocket(currentSub); */

	function handleVisibilityChange() {
		if (currentSub === null) {
			checkUser();
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
			if (!currentSub) {
				if (currentUser.attributes) {
					handleSetCurrentSub(currentUser.attributes.sub);
				}
			}
		} catch {
			if (currentSub) {
				handleSetCurrentSub(null);
			}
		}
	}

	useEffect(() => {
		checkUser();
	}, [currentSub, pathname]);

	async function handleSetConversations() {
		dispatch(setConversationMessagesDefault());

		if (currentSub) {
			// const fetchedConversationList = await getConversationList(currentSub);
			// console.log("fetchedConversationList", fetchedConversationList);
			/* if (fetchedConversationList !== false) {
				dispatch(setAllConversationListSlice(fetchedConversationList));
			} */
		}
	}

	useEffect(() => {
		handleSetConversations();
	}, [currentSub]);

	function extractSegment(inputString: string) {
		const segments = inputString.split("/");

		const manageEventIndex = segments.findIndex(
			(segment) => segment === "manage_event"
		);

		if (manageEventIndex >= 0 && manageEventIndex < segments.length - 1) {
			return segments[manageEventIndex + 1];
		}
		return null;
	}

	useEffect(() => {
		if (pathname.startsWith("/promoter/manage_event/")) {
			const specificeventIdString = extractSegment(pathname);
			if (specificeventIdString) {
				const specificEventIdNumber = Number(specificeventIdString);
				dispatch(setCurrentEventSpecificEventId(specificEventIdNumber));
			} else {
				dispatch(setCurrentEventSpecificEventId(null));
			}
		} else {
			dispatch(setCurrentEventSpecificEventId(null));
		}
	}, [pathname]);

	return (
		<>
			{currentSub ? <PusherLogic /> : null}
			{children}
		</>
	);
}

export default SocketWrapperHelper;
