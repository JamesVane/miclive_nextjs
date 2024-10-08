/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import PaperWrapper from "./PaperWrapper";
import { Button } from "@mui/material";
import { MessageRounded } from "@mui/icons-material";

interface AlreadyPerformedPaperProps {
	performerId: number;
	performerName: string;
	isTempAccount: boolean;
	queuePosition: number;
}

function AlreadyPerformedPaper({
	performerId,
	performerName,
	isTempAccount,
	queuePosition,
}: AlreadyPerformedPaperProps) {
	const [isHovering, setIsHovering] = useState(false);

	return (
		<PaperWrapper
			setIsHovering={setIsHovering}
			queuePosition={queuePosition}
			performerName={performerName}
			isTempAccount={isTempAccount}
			performerId={performerId}>
			<div
				className={styles.name_div}
				style={{
					marginTop: isHovering ? "4px" : "18px",
				}}>
				{performerName}
			</div>
			{isHovering ? (
				<div className={styles.bottom_paper}>
					<Button
						disabled={true}
						size="small"
						variant="outlined"
						startIcon={<MessageRounded />}>
						msg
					</Button>
				</div>
			) : null}
		</PaperWrapper>
	);
}

export default AlreadyPerformedPaper;
