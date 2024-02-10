/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import PaperWrapper from "./PaperWrapper";
import { Button } from "@mui/material";
import { MessageRounded, ChangeCircleRounded } from "@mui/icons-material";

interface InQueuePaperProps {
	performerId: number;
	performerName: string;
	isTempAccount: boolean;
	queuePosition: number;
	isDragging: boolean;
	setChangeAudioModal: React.Dispatch<
		React.SetStateAction<{
			performerId: number;
			performerName: string;
		}>
	>;
}

function InQueuePaper({
	performerId,
	performerName,
	isTempAccount,
	queuePosition,
	isDragging,
	setChangeAudioModal,
}: InQueuePaperProps) {
	const [isHovering, setIsHovering] = useState(false);

	function handleChangeAudio() {
		setChangeAudioModal({
			performerId: performerId,
			performerName: performerName,
		});
	}
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
						sx={{ marginRight: "10px" }}
						size="small"
						variant="outlined"
						startIcon={<MessageRounded />}>
						msg
					</Button>
					<Button
						onClick={handleChangeAudio}
						size="small"
						variant="outlined"
						startIcon={<ChangeCircleRounded />}>
						change audio
					</Button>
				</div>
			) : null}
		</PaperWrapper>
	);
}

export default InQueuePaper;
