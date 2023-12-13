/** @format */
"use client";

import styles from "./styles.module.css";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { ConversationListDefault } from "@/store/conversationListSlice";
import _ from "lodash";
import ConversationRowHelperDesktop from "./ConversationRowHelperDesktop";

function MessagingPageDesktop() {
	const conversationList = useSelector((state: RootState) => {
		return state.conversationList;
	});

	console.log("conversationList", conversationList);

	return (
		<div className={styles.main_div}>
			<Paper
				square
				sx={{
					zIndex: 2500,
					width: "100%",
					height: "55px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					fontSize: "23px",
				}}>
				Direct Messaging
			</Paper>
			<div className={styles.list_div_scroll}>
				{_.isEqual(ConversationListDefault, conversationList) ? (
					<div className={styles.no_convos}>No Conversations Yet</div>
				) : (
					<ConversationRowHelperDesktop conversationObject={conversationList} />
				)}
			</div>
		</div>
	);
}

export default MessagingPageDesktop;
