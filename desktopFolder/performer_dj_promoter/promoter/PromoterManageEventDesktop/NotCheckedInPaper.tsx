/** @format */

import React from "react";
import styles from "./styles.module.css";
import PaperWrapper from "./PaperWrapper";
import { Button } from "@mui/material";
import { MessageRounded } from "@mui/icons-material";

interface NotCheckedInPaperProps {
	performerId: number;
	performerName: string;
	isTempAccount: boolean;
}

function NotCheckedInPaper({
	performerId,
	performerName,
	isTempAccount,
}: NotCheckedInPaperProps) {
	return (
		<PaperWrapper
			performerName={performerName}
			isTempAccount={isTempAccount}
			noNumber
			performerId={performerId}>
			<div className={styles.name_div}>{performerName}</div>
			<div className={styles.bottom_paper}>
				<Button
					disabled={true}
					size="small"
					variant="outlined"
					startIcon={<MessageRounded />}>
					msg
				</Button>
			</div>
		</PaperWrapper>
	);
}

export default NotCheckedInPaper;
