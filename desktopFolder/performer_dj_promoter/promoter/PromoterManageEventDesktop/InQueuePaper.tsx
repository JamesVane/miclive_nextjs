/** @format */

import React from "react";
import styles from "./styles.module.css";
import PaperWrapper from "./PaperWrapper";
import { Button } from "@mui/material";
import { MessageRounded } from "@mui/icons-material";

interface InQueuePaperProps {
	performerId: number;
	performerName: string;
	isTempAccount: boolean;
	queuePosition: number;
	isDragging: boolean;
}

function InQueuePaper({
	performerId,
	performerName,
	isTempAccount,
	queuePosition,
	isDragging,
}: InQueuePaperProps) {
	return (
		<PaperWrapper
			queuePosition={queuePosition}
			performerName={performerName}
			isTempAccount={isTempAccount}
			performerId={performerId}>
			<div className={styles.name_div}>{performerName}</div>
			<div className={styles.bottom_paper}>
				<Button
					disabled={true}
					sx={{ marginRight: "10px" }}
					size="small"
					variant="outlined"
					startIcon={<MessageRounded />}>
					message
				</Button>
			</div>
		</PaperWrapper>
	);
}

export default InQueuePaper;
