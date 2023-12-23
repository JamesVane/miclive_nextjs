/** @format */

import React from "react";
import styles from "./styles.module.css";
import AvatarSimple from "@/desktopFolder/AvatarSimple";

interface PaperWrapperProps {
	children: React.ReactNode;
	performerId: number;
	noNumber?: boolean;
}

function PaperWrapper({ children, performerId, noNumber }: PaperWrapperProps) {
	return (
		<div className={styles.roster_paper}>
			<div className={styles.avatar_div}>
				<AvatarSimple
					id={performerId}
					ninety
					type="performer"
					key={performerId}
				/>
			</div>
			<div
				className={styles.middle_div}
				style={{
					width: noNumber ? "calc(100% - 90px)" : "calc(100% - 155px)",
				}}>
				{children}
			</div>
			{noNumber ? null : <div className={styles.number_div}>88</div>}
		</div>
	);
}

export default PaperWrapper;
