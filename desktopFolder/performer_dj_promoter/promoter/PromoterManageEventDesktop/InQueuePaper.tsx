/** @format */

import React from "react";
import styles from "./styles.module.css";
import PaperWrapper from "./PaperWrapper";
import { Button, ButtonGroup } from "@mui/material";
import {
	MessageRounded,
	ArrowUpwardRounded,
	ArrowDownwardRounded,
} from "@mui/icons-material";

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
				<ButtonGroup size="small">
					<Button>
						<ArrowUpwardRounded />
					</Button>
					<Button>
						<ArrowDownwardRounded />
					</Button>
				</ButtonGroup>
			</div>
		</PaperWrapper>
	);
}

export default InQueuePaper;
