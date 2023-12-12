/** @format */
import { useState } from "react";
import ConversationPageDesktop from "./ConversationPageDesktop";
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
import { conversationObject } from "./ConversationPageDesktop";
import { getFirstMessages } from "@/api_functions/getFirstMessages";
// import { useSessionState } from "@/custom_hooks/useSessionState";
import { Auth } from "aws-amplify";
import { setOpenConversationDesktop } from "@/store/openConversationDesktopSlice";

interface ConversationPageDesktopContainerProps {
	openConversationSub: string;
}

function ConversationPageDesktopContainer({
	openConversationSub,
}: ConversationPageDesktopContainerProps) {
	const dispatch = useDispatch();

	/* const [transformedDataState, setTransformedDataState] = useSessionState<
		conversationObject[]
	>("transformedDataState", []); */

	const [transformedDataState, setTransformedDataState] = useState<
		conversationObject[]
	>([]);

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
		if (conversationList[openConversationSub]) {
			const returnName = conversationList[openConversationSub].name;
			const returnType = conversationList[openConversationSub].type;
			const returnId = conversationList[openConversationSub].roleId;
			const returnSub = openConversationSub;
			return {
				name: returnName,
				type: returnType,
				roleId: returnId,
				sub: returnSub,
			};
		} else {
			const returnName = conversationHold[openConversationSub].name;
			const returnType = conversationHold[openConversationSub].type;
			const returnId = conversationHold[openConversationSub].roleId;
			const returnSub = openConversationSub;
			return {
				name: returnName,
				type: returnType,
				roleId: returnId,
				sub: returnSub,
			};
		}
	}

	function handleCloseConversation() {
		dispatch(setOpenConversationDesktop("None"));
	}

	useEffect(() => {
		setTransformedDataState([]);
		const { sub: theirSub } = parsedPersonData();

		async function fetchMessages() {
			const user = await Auth.currentAuthenticatedUser();
			const mySub = user.attributes.sub;

			const meToThem = `${mySub}-${openConversationSub}`;
			const themToMe = `${openConversationSub}-${mySub}`;

			console.log("meToThem", meToThem);

			await getFirstMessages(mySub, theirSub).then((res) => {
				console.log("res", res);
				const returnObject = {} as any;
				if (res[meToThem] && Object.keys(res[meToThem]).length !== 0) {
					returnObject[meToThem] = res[meToThem];
				}
				if (res[themToMe] && Object.keys(res[themToMe]).length !== 0) {
					returnObject[themToMe] = res[themToMe];
				}
				if (!returnObject[meToThem] && !returnObject[themToMe]) {
					console.log("THIS SHOULD RUN!!");
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
	}, [openConversationSub]);

	useEffect(() => {
		console.log("rennn");
		async function transformData(inputData: setAllConversationMessagesType) {
			const user = await Auth.currentAuthenticatedUser();
			const mySub = user.attributes.sub;

			const meToThem = `${mySub}-${openConversationSub}`;

			let transformedArray: conversationObject[] = [];

			for (const senderReceiver in inputData) {
				for (const timestamp in inputData[senderReceiver]) {
					let whoSent: "me" | "user";
					if (senderReceiver === meToThem) {
						whoSent = "me";
					} else {
						whoSent = "user";
					}

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

			setTransformedDataState(transformedArray);
		}

		transformData(conversationMessages);
	}, [conversationMessages]);

	return (
		<>
			{_.isEqual(conversationMessages, defaultConversationMessages) ? (
				<SplashPage />
			) : (
				<ConversationPageDesktop
					handleCloseConversation={handleCloseConversation}
					personData={parsedPersonData()}
					conversationArray={transformedDataState}
				/>
			)}
		</>
	);
}

export default ConversationPageDesktopContainer;
