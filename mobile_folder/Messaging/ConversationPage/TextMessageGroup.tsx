/** @format */

import { useRef, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Divider, IconButton } from "@mui/material";
import {
	ThumbUpAltRounded,
	QuestionMarkRounded,
	PriorityHighRounded,
} from "@mui/icons-material";
import ReactionBubble from "./ReactionBubble";
import { setSingleConversationMessage } from "@/store/conversationMessagesSlice";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { DateTime } from "luxon";
import { putMessageReaction } from "@/api_functions/putMessageReaction";
import { setUpdateTopMessage } from "@/store/conversationListSlice";
import { Auth } from "aws-amplify";

export interface TextMessageGroupProps {
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
	meToThemId: string;
	themToMeId: string;
	theirSub: string;
	mySub: string;
}
interface SingleMessageProps {
	top?: boolean;
	bottom?: boolean;
	message: {
		messageText: string;
		reaction: {
			sender: "Thumb" | "?" | "!" | null;
			reciver: "Thumb" | "?" | "!" | null;
		};
		timestamp: number;
	};
	reactionOpenId: number | null;
	setReactionOpenId: React.Dispatch<React.SetStateAction<number | null>>;
	index: number;
}
interface ReactionPopupProps {
	reaction: {
		sender: "Thumb" | "?" | "!" | null;
		reciver: "Thumb" | "?" | "!" | null;
	};
	handleReaction: (reaction: {
		sender: "Thumb" | "?" | "!" | null;
		reciver: "Thumb" | "?" | "!" | null;
	}) => void;
}

const formatDate = (timestamp: number) => {
	const date = DateTime.fromMillis(timestamp, { zone: "UTC" });
	const formattedDate = date.toFormat("yyyy-MM-dd | hh:mm a");

	return formattedDate;
};

function TextMessageGroup({
	messages,
	time,
	whoSent,
	meToThemId,
	themToMeId,
	theirSub,
	mySub,
}: TextMessageGroupProps) {
	const [reactionOpenId, setReactionOpenId] = useState<number | null>(null);

	const ref = useRef<any>(null);

	const handleClickOutside = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setReactionOpenId(null);
		}
	};

	useEffect(() => {
		// Add event listeners for both mouse and touch events
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);
		return () => {
			// Remember to clean up both event listeners
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, []);

	function ReactionPopup({ reaction, handleReaction }: ReactionPopupProps) {
		function handleThumb(event: any) {
			event.stopPropagation();
			if (whoSent === "me") {
				handleReaction({ sender: "Thumb", reciver: reaction.reciver });
			} else {
				handleReaction({ sender: reaction.sender, reciver: "Thumb" });
			}
			setReactionOpenId(null);
		}
		function handleExalaim(event: any) {
			event.stopPropagation();
			if (whoSent === "me") {
				handleReaction({ sender: "!", reciver: reaction.reciver });
			} else {
				handleReaction({ sender: reaction.sender, reciver: "!" });
			}
			setReactionOpenId(null);
		}
		function handleQuestion(event: any) {
			event.stopPropagation();
			if (whoSent === "me") {
				handleReaction({ sender: "?", reciver: reaction.reciver });
			} else {
				handleReaction({ sender: reaction.sender, reciver: "?" });
			}
			setReactionOpenId(null);
		}

		const iconStyles = {
			height: "20px",
			width: "20px",
		};

		const meColor = "#f8dca1ff";
		const themColor = "#9ca1a3ff";

		return (
			<div className={styles.reaction_popup}>
				<IconButton
					onClick={handleThumb}
					sx={{ height: "30px", width: "30px" }}>
					<ThumbUpAltRounded
						sx={{
							...iconStyles,
							color:
								whoSent === "me" && reaction.reciver === "Thumb"
									? themColor
									: whoSent === "me" && reaction.sender === "Thumb"
									? meColor
									: whoSent === "them" && reaction.reciver === "Thumb"
									? meColor
									: whoSent === "them" && reaction.sender === "Thumb"
									? themColor
									: "white",
						}}
					/>
				</IconButton>
				<IconButton
					onClick={handleQuestion}
					sx={{ height: "30px", width: "30px" }}>
					<QuestionMarkRounded
						sx={{
							...iconStyles,
							color:
								whoSent === "me" && reaction.reciver === "?"
									? themColor
									: whoSent === "me" && reaction.sender === "?"
									? meColor
									: whoSent === "them" && reaction.reciver === "?"
									? meColor
									: whoSent === "them" && reaction.sender === "?"
									? themColor
									: "white",
						}}
					/>
				</IconButton>
				<IconButton
					onClick={handleExalaim}
					sx={{ height: "30px", width: "30px" }}>
					<PriorityHighRounded
						sx={{
							...iconStyles,
							color:
								whoSent === "me" && reaction.reciver === "!"
									? themColor
									: whoSent === "me" && reaction.sender === "!"
									? meColor
									: whoSent === "them" && reaction.reciver === "!"
									? meColor
									: whoSent === "them" && reaction.sender === "!"
									? themColor
									: "white",
						}}
					/>
				</IconButton>
			</div>
		);
	}

	function SingleMessage({
		top,
		bottom,
		message,
		reactionOpenId,
		setReactionOpenId,
		index,
	}: SingleMessageProps) {
		const dispatch = useDispatch();

		async function handleReaction(reaction: {
			sender: "Thumb" | "?" | "!" | null;
			reciver: "Thumb" | "?" | "!" | null;
		}) {
			const user = await Auth.currentAuthenticatedUser();
			const displayName = user.attributes["custom:DisplayUsername"];
			console.log("displayName", displayName);

			const parsedReaction =
				whoSent === "me" && reaction.sender === message.reaction.sender
					? { sender: null, reciver: message.reaction.reciver }
					: whoSent === "them" && reaction.reciver === message.reaction.reciver
					? { sender: message.reaction.sender, reciver: null }
					: reaction;

			await putMessageReaction({
				my_sub: mySub,
				their_sub: theirSub,
				request_primary_key: whoSent === "me" ? meToThemId : themToMeId,
				request_timestamp: message.timestamp,
				request_reaction: parsedReaction,
				sender_name: displayName,
			}).then((res) => {
				dispatch(
					setSingleConversationMessage({
						senderReciver: whoSent === "me" ? meToThemId : themToMeId,
						timestamp: message.timestamp,
						message: message.messageText,
						reaction: parsedReaction,
					})
				);
				dispatch(
					setUpdateTopMessage({
						sub: theirSub,
						topMessage: `You reacted to: ${message.messageText}`,
						timestamp: DateTime.utc().toMillis(),
						unOpened: false,
					})
				);
			});
		}

		return (
			<div
				onClick={(event: any) => {
					if (reactionOpenId === null) {
						setReactionOpenId(index);
					} else if (reactionOpenId == index) {
						setReactionOpenId(null);
					} else {
						setReactionOpenId(index);
					}
				}}
				className={styles.single_message_wrapper}
				style={{
					justifyContent: whoSent === "me" ? "flex-end" : "flex-start",
				}}>
				{whoSent === "me" && reactionOpenId === index ? (
					<ReactionPopup
						handleReaction={handleReaction}
						reaction={message.reaction}
					/>
				) : null}
				<div
					className={styles.single_message}
					style={{
						backgroundColor: whoSent === "me" ? "#f8dca1ff" : "#9ca1a3ff",
						borderTopRightRadius:
							whoSent === "me" && top
								? "10px"
								: whoSent === "them"
								? "10px"
								: "0px",
						borderBottomRightRadius:
							whoSent === "me" && bottom
								? "10px"
								: whoSent === "them"
								? "10px"
								: "0px",
						borderTopLeftRadius:
							whoSent === "them" && top
								? "10px"
								: whoSent === "me"
								? "10px"
								: "0px",
						borderBottomLeftRadius:
							whoSent === "them" && bottom
								? "10px"
								: whoSent === "me"
								? "10px"
								: "0px",
					}}>
					<ReactionBubble
						rightOrLeft={whoSent === "me" ? "left" : "right"}
						type={message.reaction}
					/>
					{message.messageText}
				</div>
				{whoSent === "them" && reactionOpenId === index ? (
					<ReactionPopup
						handleReaction={handleReaction}
						reaction={message.reaction}
					/>
				) : null}
			</div>
		);
	}

	return (
		<>
			{time === 0 ? null : (
				<>
					<div className={styles.divider_horiz} style={{ width: "45vw" }}>
						<Divider variant="middle" flexItem />
					</div>
					<div className={styles.message_time}>{formatDate(time)}</div>
				</>
			)}
			<div className={styles.message_group} ref={ref}>
				{messages.map((message, index) => (
					<SingleMessage
						reactionOpenId={reactionOpenId}
						setReactionOpenId={setReactionOpenId}
						index={index}
						key={index}
						message={message}
						top={index === 0}
						bottom={index === messages.length - 1}
					/>
				))}
			</div>
		</>
	);
}

export default TextMessageGroup;
