/** @format */

import React from "react";
import styles from "./styles.module.css";
import AvatarSimple from "@/desktopFolder/AvatarSimple";

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
	return (
		<div
			className={styles.roster_paper}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}>
			<div className={styles.avatar_div}>
				<AvatarSimple
					id={performerId}
					type="performer"
					username={performerName}
					ninety
				/>
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
