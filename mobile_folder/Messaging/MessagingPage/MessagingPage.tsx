/** @format */

import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { Paper, Button } from "@mui/material";
import { ClearRounded } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { ConversationListDefault } from "@/store/conversationListSlice";
import _ from "lodash";
import ConversationRowHelper from "./ConversationRowHelper";

function MessagingPage() {
	const router = useRouter();

	const handleGoBackOneStep = () => {
		router.back();
	};

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
					position: "fixed",
					top: "0",
					left: "0",
					right: "0",
					width: "100%",
					height: "55px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					fontSize: "23px",
				}}>
				<Button
					onClick={handleGoBackOneStep}
					startIcon={<ClearRounded />}
					color="secondary"
					sx={{
						position: "fixed",
						top: "0",
						left: "0",
					}}>
					exit
				</Button>
				Direct Messaging
			</Paper>
			<div className={styles.top_bumper} />
			{_.isEqual(ConversationListDefault, conversationList) ? (
				<div className={styles.no_convos}>No Conversations Yet</div>
			) : (
				<ConversationRowHelper conversationObject={conversationList} />
			)}
		</div>
	);
}

export default MessagingPage;
