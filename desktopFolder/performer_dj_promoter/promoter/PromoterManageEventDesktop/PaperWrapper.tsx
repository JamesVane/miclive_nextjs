/** @format */

import React from "react";
import styles from "./styles.module.css";
import AvatarSimple from "@/desktopFolder/AvatarSimple";
import { Avatar } from "@mui/material";

interface PaperWrapperProps {
	children: React.ReactNode;
	performerId: number;
	noNumber?: boolean;
	performerName: string;
	isTempAccount: boolean;
	queuePosition?: number;
}

function PaperWrapper({
	children,
	performerId,
	noNumber,
	isTempAccount,
	performerName,
	queuePosition,
}: PaperWrapperProps) {
	return (
		<div className={styles.roster_paper}>
			<div className={styles.avatar_div}>
				<Avatar
					sx={{
						height: "85%",
						width: "85%",
					}}>
					{isTempAccount ? (
						performerName
					) : (
						<img
							src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/performer_pictures/performer_${performerId}.jpg`}
							style={{
								width: "100%",
								height: "100%",
							}}
						/>
					)}
				</Avatar>
			</div>
			<div
				className={styles.middle_div}
				style={{
					width: noNumber ? "calc(100% - 90px)" : "calc(100% - 155px)",
				}}>
				{children}
			</div>
			{noNumber ? null : (
				<div className={styles.number_div}>{queuePosition}</div>
			)}
		</div>
	);
}

export default PaperWrapper;
