/** @format */

import React from "react";
import styles from "./styles.module.css";
import AvatarSimple from "@/desktopFolder/AvatarSimple";
import { Avatar } from "@mui/material";
import { letterToHexcodeObject, TwoLetterKey } from "@/lettersToHexcodesObject";

interface PaperWrapperProps {
	children: React.ReactNode;
	performerId: number;
	noNumber?: boolean;
	performerName: string;
	isTempAccount: boolean;
	queuePosition?: number;
	setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;
}

function PaperWrapper({
	children,
	performerId,
	noNumber,
	isTempAccount,
	performerName,
	queuePosition,
	setIsHovering,
}: PaperWrapperProps) {
	const firstTwoLettersOfPerformerNameCapitolized = performerName[0]
		? ((performerName[0].toUpperCase() +
				performerName[1].toUpperCase()) as TwoLetterKey)
		: ("" as TwoLetterKey);

	const noPicColor =
		letterToHexcodeObject[firstTwoLettersOfPerformerNameCapitolized];

	return (
		<div
			className={styles.roster_paper}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}>
			<div className={styles.avatar_div}>
				<Avatar
					sx={{
						height: "85%",
						width: "85%",
						backgroundColor: noPicColor,
					}}>
					{isTempAccount ? (
						firstTwoLettersOfPerformerNameCapitolized
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
