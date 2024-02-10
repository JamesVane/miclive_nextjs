/** @format */

import { useState } from "react";
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
	const [isHovering, setIsHovering] = useState(false);
	return (
		<PaperWrapper
			setIsHovering={setIsHovering}
			performerName={performerName}
			isTempAccount={isTempAccount}
			noNumber
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

export default NotCheckedInPaper;
