/** @format */

import React from "react";
import styles from "./styles.module.css";
import PaperWrapper from "./PaperWrapper";
import { Button } from "@mui/material";
import { MessageRounded } from "@mui/icons-material";

interface AlreadyPerformedPaperProps {
	performerId: number;
}

function AlreadyPerformedPaper({ performerId }: AlreadyPerformedPaperProps) {
	return (
		<PaperWrapper performerId={performerId}>
			<div className={styles.name_div}>Performer Name Here</div>
			<div className={styles.bottom_paper}>
				<Button
					disabled={true}
					size="small"
					variant="outlined"
					startIcon={<MessageRounded />}>
					message
				</Button>
			</div>
		</PaperWrapper>
	);
}

export default AlreadyPerformedPaper;
