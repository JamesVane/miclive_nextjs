/** @format */
"use client";

import { useEffect, useState, useContext, useRef } from "react";
import styles from "./styles.module.css";
import { Paper, Button, Divider, TextField } from "@mui/material";
import {
	ArrowBackIosNewRounded,
	SearchRounded,
	SendRounded,
} from "@mui/icons-material";
import AvatarSimple from "@desk/AvatarSimple";
import TextMessageGroupDesktop from "./TextMessageGroupDesktop";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import {
	setAddConversationToList,
	setUpdateTopMessage,
} from "@/store/conversationListSlice";
import {
	setSingleConversationMessage,
	setAllConversationMessages,
} from "@/store/conversationMessagesSlice";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { SocketContext } from "@/SocketContext";
import { postNewMessage } from "@/api_functions/postNewMessage";
import { Auth } from "aws-amplify";

export type conversationObject = {
	whoSent: "me" | "user";
	timestamp: number;
	message: string;
	reaction: {
		sender: "Thumb" | "?" | "!" | null;
		reciver: "Thumb" | "?" | "!" | null;
	};
};

interface ConversationPageProps {
	conversationArray: conversationObject[];
	personData: {
		name: string;
		type: "performer" | "promoter" | "dj";
		roleId: number;
		sub: string;
	};
	handleCloseConversation: () => void;
}

interface TextMessageGroupProps {
	messages: {
		messageText: string;
		reaction: {
			sender: "Thumb" | "?" | "!" | null;
			reciver: "Thumb" | "?" | "!" | null;
		};
		timestamp: number;
	}[];
	time: number;
	whoSent: "me" | "them";
}

function ConversationPageDesktop({
	conversationArray,
	personData,
	handleCloseConversation,
}: ConversationPageProps) {
	const dispatch = useDispatch();
	const [mySub, setMySub] = useState("");

	const listDivRef = useRef<HTMLDivElement | null>(null);

	async function handleSetSub() {
		const user = await Auth.currentAuthenticatedUser();
		const userId = user.attributes.sub;
		setMySub(userId);
	}

	useEffect(() => {
		handleSetSub();
	}, []);

	const { createConversation: socketCreateConversation } =
		useContext(SocketContext);

	const [currentText, setCurrentText] = useState("");

	const [messageGroutState, setMessageGroupState] = useState<
		TextMessageGroupProps[]
	>([]);

	const conversationList = useSelector(
		(state: RootState) => state.conversationList
	);
	const usersStateSlice = useSelector((state: RootState) => state.usersState);

	const theirSub = personData.sub;

	const meToThem = `${mySub}-${theirSub}`;
	const themToMe = `${theirSub}-${mySub}`;

	const inputDisabled = currentText.replaceAll(/\s/g, "") === "";

	async function handleSocketCreateConversation() {
		socketCreateConversation({
			userSub: mySub,
			reciverSub: theirSub,
			reciverName: personData.name,
			senderName: usersStateSlice!.username,
			reciverType: personData.type,
			senderType: "performer",
			reciverRoleId: personData.roleId.toString(),
			senderRoleId: usersStateSlice!.primary_key,
			message: currentText,
		});
	}

	async function createConversation() {
		await handleSocketCreateConversation().then((res) => {
			dispatch(
				setAddConversationToList({
					sub: theirSub,
					name: personData.name,
					type: personData.type,
					roleId: personData.roleId,
					DND: false,
					pinned: false,
					timestamp: DateTime.utc().toMillis(),
					topMessage: currentText,
					unOpened: false,
				})
			);
			dispatch(
				setAllConversationMessages({
					[meToThem]: {
						[DateTime.utc().toMillis()]: {
							message: currentText,
							reaction: {
								sender: null,
								reciver: null,
							},
						},
					},
				})
			);
			setCurrentText("");
		});
	}

	function handleSendMessage() {
		if (inputDisabled) {
			return;
		}
		if (!conversationList[theirSub]) {
			createConversation();
		} else {
			postNewMessage({
				my_sub: mySub,
				their_sub: theirSub,
				_request_timestamp: DateTime.utc().toMillis(),
				request_message: currentText,
			}).then((res) => {
				dispatch(
					setSingleConversationMessage({
						senderReciver: meToThem,
						timestamp: DateTime.utc().toMillis(),
						message: currentText,
						reaction: {
							sender: null,
							reciver: null,
						},
					})
				);
				dispatch(
					setUpdateTopMessage({
						sub: theirSub,
						topMessage: currentText,
						timestamp: DateTime.utc().toMillis(),
						unOpened: false,
					})
				);
				setCurrentText("");
			});
		}
	}

	useEffect(() => {
		let messageGroups = [] as TextMessageGroupProps[];
		let currentGroup = [] as conversationObject[];
		let prevTimestamp = conversationArray[0].timestamp;
		let prevWhoSent = conversationArray[0].whoSent;
		conversationArray.forEach((messageObj, index) => {
			if (conversationArray.length === 1) {
				const messageGroup: TextMessageGroupProps = {
					messages: [
						{
							messageText: messageObj.message,
							reaction: messageObj.reaction,
							timestamp: messageObj.timestamp,
						},
					],
					time: messageObj.timestamp,
					whoSent: messageObj.whoSent === "me" ? "me" : "them",
				};
				messageGroups.push(messageGroup);
			} else {
				if (
					messageObj.whoSent === prevWhoSent &&
					messageObj.timestamp - prevTimestamp <= 120000 // Within a minute
				) {
					currentGroup.push(messageObj);
				} else {
					const averageTimestamp =
						currentGroup.reduce((total, curr) => total + curr.timestamp, 0) /
						currentGroup.length;
					const messagePushFirst: TextMessageGroupProps = {
						messages: currentGroup.map((messageObj) => {
							return {
								messageText: messageObj.message,
								reaction: messageObj.reaction,
								timestamp: messageObj.timestamp,
							};
						}),
						time: Math.round(averageTimestamp),
						whoSent: prevWhoSent === "me" ? "me" : "them",
					};
					messageGroups.push(messagePushFirst);
					currentGroup = [messageObj];
					prevWhoSent = messageObj.whoSent;
				}

				prevTimestamp = messageObj.timestamp;

				// If it's the last message, push the current group into messageGroups
				if (index === conversationArray.length - 1) {
					const averageTimestamp =
						currentGroup.reduce((total, curr) => total + curr.timestamp, 0) /
						currentGroup.length;
					const messageGroupSecond: TextMessageGroupProps = {
						messages: currentGroup.map((messageObj) => {
							return {
								messageText: messageObj.message,
								reaction: messageObj.reaction,
								timestamp: messageObj.timestamp,
							};
						}),
						time: Math.round(averageTimestamp),
						whoSent: prevWhoSent === "me" ? "me" : "them",
					};
					messageGroups.push(messageGroupSecond);
				}
			}
		});
		messageGroups.reverse();

		setMessageGroupState(messageGroups);
	}, [conversationArray]);

	return (
		<div className={styles.main_div}>
			<Paper square className={styles.paper_header}>
				<Button
					size="large"
					onClick={handleCloseConversation}
					startIcon={<ArrowBackIosNewRounded />}
					color="secondary"
					sx={{
						position: "absolute",
						top: "0",
						left: "0",
					}}>
					back
				</Button>
				<div className={styles.pic_div}>
					<AvatarSimple type={personData.type} id={personData.roleId} ninety />
				</div>
				{personData.name}
			</Paper>
			<div className={styles.messages_list_div} ref={listDivRef}>
				{conversationArray[0].timestamp === 0 ? (
					<div className={styles.no_messages_text}>Send A Message</div>
				) : null}
				{conversationArray[0].timestamp === 0
					? null
					: messageGroutState.map((group, index) => {
							if (index !== 0) {
								const previousTimestamp = messageGroutState[index - 1].time;
								const currentTimestamp = group.time;

								// If the time difference is within 2 minutes, set the time of current group as an empty string
								if (currentTimestamp - previousTimestamp <= 300000) {
									group.time = 0;
								}
							}
							return (
								<TextMessageGroupDesktop
									{...group}
									meToThemId={meToThem}
									themToMeId={themToMe}
									key={index}
									theirSub={theirSub}
									mySub={mySub}
								/>
							);
					  })}
				<div className={styles.divider_horiz}>
					<Divider variant="middle" flexItem />
				</div>
				<div className={styles.into_div}>
					<div className={styles.intro_picture}>
						<AvatarSimple type={personData.type} id={personData.roleId} />
					</div>
					{personData.name}
					<Button
						sx={{ marginTop: "5px" }}
						startIcon={<SearchRounded />}
						variant="outlined">
						View Profile
					</Button>
				</div>
			</div>
			<Paper className={styles.bottom_paper} square>
				<div className={styles.text_field_div}>
					<TextField
						onChange={(e) => setCurrentText(e.target.value)}
						value={currentText}
						maxRows={2}
						minRows={2}
						multiline
						size="small"
						sx={{ width: "95%" }}
					/>
				</div>
				<div className={styles.send_button_div}>
					<Button
						disabled={inputDisabled}
						onClick={handleSendMessage}
						variant="outlined"
						sx={{
							width: "85%",
							height: "85%",
						}}>
						<SendRounded
							sx={{
								width: "45px",
								height: "45px",
							}}
						/>
					</Button>
				</div>
			</Paper>
		</div>
	);
}

export default ConversationPageDesktop;
