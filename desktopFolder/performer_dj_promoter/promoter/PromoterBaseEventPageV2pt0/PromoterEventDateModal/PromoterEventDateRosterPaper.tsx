/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Divider } from "@mui/material";
import AvatarSimple from "@desk/AvatarSimple";
import { AudiotrackRounded, MusicOffRounded } from "@mui/icons-material";

interface PromoterEventDateRosterPaperProps {
	performerName: string;
	performerRoleId: number;
	hasAudio: boolean;
}

function PromoterEventDateRosterPaper({
	performerName,
	performerRoleId,
	hasAudio,
}: PromoterEventDateRosterPaperProps) {
	return (
		<div className={styles.roster_paper}>
			<div className={styles.roster_paper_top}>
				<div className={styles.roster_pic_div}>
					<AvatarSimple
						username={performerName}
						ninety
						type="performer"
						id={performerRoleId}
					/>
				</div>
				<div className={styles.roster_paper_right}>
					{hasAudio ? (
						<AudiotrackRounded
							color="success"
							sx={{
								position: "absolute",
								bottom: "2.5px",
								right: "10px",
							}}
						/>
					) : (
						<MusicOffRounded
							color="error"
							sx={{
								position: "absolute",
								bottom: "2.5px",
								right: "10px",
							}}
						/>
					)}
					{performerName}
				</div>
			</div>
			<div className={styles.divider_div}>
				<Divider variant="middle" flexItem />
			</div>
		</div>
	);
}

export default PromoterEventDateRosterPaper;
