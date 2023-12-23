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
}

function InQueuePaper({ performerId }: InQueuePaperProps) {
	return (
		<PaperWrapper performerId={performerId}>
			<div className={styles.name_div}>Thouxanbanfauno</div>
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
