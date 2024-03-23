/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Avatar, Box, Divider } from "@mui/material";
import AvatarSimpleMobile from "@/mobile_folder/small_components/AvatarSimpleMobile";

interface PerformerCurrentEventRosterPaperProps {
	isSticky?: boolean;
	performerName: string;
	queuePosition: number;
	realQueuePosition: number;
	performerRoleId: number;
}

function PerformerCurrentEventRosterPaper({
	isSticky,
	performerName,
	queuePosition,
	realQueuePosition,
	performerRoleId,
}: PerformerCurrentEventRosterPaperProps) {
	return (
		<>
			<div
				className={
					isSticky
						? styles.roster_paper_main_div_sticky
						: styles.roster_paper_main_div
				}>
				<div className={styles.roster_pic_numberc_wrapper}>
					<AvatarSimpleMobile
						ninety
						id={performerRoleId}
						username={performerName}
						type="performer"
					/>
				</div>
				<Box
					className={styles.roster_middle}
					sx={{
						color: isSticky ? "success.main" : "secondary.main",
					}}>
					{performerName}
				</Box>
				<div className={styles.roster_pic_numberc_wrapper}>
					<Avatar
						sx={{
							width: "80%",
							height: "80%",
							backgroundColor: "transparent",
							border: isSticky ? "1px solid #66bb69" : "1px solid #f8dca1ff",
							color: isSticky ? "success.main" : "#f8dca1ff",
							fontSize: "30px",
						}}>
						{queuePosition}
					</Avatar>
				</div>
			</div>
			<div className={styles.divider_div}>
				<Divider sx={{ backgroundColor: "#757575ff" }} variant="middle" />
			</div>
		</>
	);
}

export default PerformerCurrentEventRosterPaper;
