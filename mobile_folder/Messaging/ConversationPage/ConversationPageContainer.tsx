/** @format */
"use client";
import { useState } from "react";
import ConversationPage from "./ConversationPage";
import SplashPage from "@/SplashPage";
import {
	setAllConversationMessages,
	defaultConversationMessages,
	setAllConversationMessagesType,
} from "@/store/conversationMessagesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { useEffect } from "react";
import _ from "lodash";
import { conversationObject } from "./ConversationPage";
import { usePathname } from "next/navigation";
import { getFirstMessages } from "@/api_functions/getFirstMessages";
// import { useSessionState } from "@/custom_hooks/useSessionState";
import { Auth } from "aws-amplify";

function ConversationPageContainer() {
	const dispatch = useDispatch();
	const locationPathname = usePathname();

	const [transformedDataState, setTransformedDataState] = useState<
		conversationObject[]
	>([]);
	/* const [transformedDataState, setTransformedDataState] = useSessionState<
		conversationObject[]
	>("transformedDataState", []); */

	const UrlConversationSub =
		locationPathname.split("/")[locationPathname.split("/").length - 1];

	const conversationMessages = useSelector(
		(state: RootState) => state.conversationMessages
	);

	const conversationList = useSelector(
		(state: RootState) => state.conversationList
	);

	const conversationHold = useSelector(
		(state: RootState) => state.holdNewConversation
	);

	function parsedPersonData() {
		if (conversationList[UrlConversationSub]) {
			const returnName = conversationList[UrlConversationSub].name;
			const returnType = conversationList[UrlConversationSub].type;
			const returnId = conversationList[UrlConversationSub].roleId;
			const returnSub = UrlConversationSub;
			return {
				name: returnName,
				type: returnType,
				roleId: returnId,
				sub: returnSub,
			};
		} else {
			const returnName = conversationHold[UrlConversationSub].name;
			const returnType = conversationHold[UrlConversationSub].type;
			const returnId = conversationHold[UrlConversationSub].roleId;
			const returnSub = UrlConversationSub;
			return {
				name: returnName,
				type: returnType,
				roleId: returnId,
				sub: returnSub,
			};
		}
	}

	useEffect(() => {
		setTransformedDataState([]);
		const { sub: theirSub } = parsedPersonData();

		async function fetchMessages() {
			const user = await Auth.currentAuthenticatedUser();
			const mySub = user.attributes.sub;

			const meToThem = `${mySub}-${UrlConversationSub}`;
			const themToMe = `${UrlConversationSub}-${mySub}`;

			await getFirstMessages(mySub, theirSub).then((res) => {
				console.log("res", res);
				let returnObject = {} as any;
				if (res[meToThem] && Object.keys(res[meToThem]).length !== 0) {
					returnObject[meToThem] = res[meToThem];
				}
				if (res[themToMe] && Object.keys(res[themToMe]).length !== 0) {
					returnObject[themToMe] = res[themToMe];
				}
				if (!returnObject[meToThem] && !returnObject[themToMe]) {
					dispatch(
						setAllConversationMessages({
							Empty: { 0: { message: "No messages yet", reaction: "none" } },
						} as any)
					);
				} else {
					dispatch(setAllConversationMessages(returnObject));
				}
			});
		}
		fetchMessages();
	}, []);

	useEffect(() => {
		console.log("rennn");
		async function transformData(inputData: setAllConversationMessagesType) {
			const user = await Auth.currentAuthenticatedUser();
			const mySub = user.attributes.sub;

			const meToThem = `${mySub}-${UrlConversationSub}`;

			let transformedArray: conversationObject[] = [];
			console.log("inputData", inputData);

			for (const senderReceiver in inputData) {
				for (const timestamp in inputData[senderReceiver]) {
					let whoSent: "me" | "user";
					if (senderReceiver === meToThem) {
						whoSent = "me";
					} else {
						whoSent = "user";
					}
					console.log("timestamp", timestamp);

					const messageObj: conversationObject = {
						whoSent: whoSent,
						timestamp: parseInt(timestamp),
						message: inputData[senderReceiver][timestamp].message,
						reaction: inputData[senderReceiver][timestamp].reaction,
					};

					transformedArray.push(messageObj);
				}
			}

			transformedArray.sort((a, b) => a.timestamp - b.timestamp);

			console.log("transformedArray", transformedArray);

			setTransformedDataState(transformedArray);
		}

		transformData(conversationMessages);
	}, [conversationMessages]);

	return (
		<>
			{_.isEqual(conversationMessages, defaultConversationMessages) ? (
				<SplashPage />
			) : (
				<ConversationPage
					personData={parsedPersonData()}
					conversationArray={transformedDataState}
				/>
			)}
		</>
	);
}

export default ConversationPageContainer;
