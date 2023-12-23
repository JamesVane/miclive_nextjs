/** @format */

import React from "react";
import styles from "./styles.module.css";
import PaperWrapper from "./PaperWrapper";
import { Button } from "@mui/material";
import { MessageRounded } from "@mui/icons-material";

interface NotCheckedInPaperProps {
	performerId: number;
}

function NotCheckedInPaper({ performerId }: NotCheckedInPaperProps) {
	return (
		<PaperWrapper noNumber performerId={performerId}>
			<div className={styles.name_div}>Not Check In Perfor</div>
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

export default NotCheckedInPaper;
