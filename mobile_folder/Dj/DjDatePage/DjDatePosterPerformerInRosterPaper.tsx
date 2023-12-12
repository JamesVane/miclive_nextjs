/** @format */

import React from "react";
import { PerformerInRoster } from "@/store/djEventDateModalDataV2pt0";
import AvatarSimpleMobile from "@mobi/small_components/AvatarSimpleMobile";
import { AlternateEmailRounded } from "@mui/icons-material";
import styles from "./styles.module.css";
import DividerH from "@/universalComponents/DividerH";

interface DjDatePosterPerformerInRosterPaperProps {
	performerObj: PerformerInRoster;
}

function DjDatePosterPerformerInRosterPaper({
	performerObj,
}: DjDatePosterPerformerInRosterPaperProps) {
	return (
		<div className={styles.roster_paper}>
			<div className={styles.roster_paper_content}>
				<div className={styles.performer_pic_number_div}>
					<AvatarSimpleMobile
						ninety
						type="performer"
						id={performerObj.performer_id}
					/>
				</div>
				<div className={styles.roster_row_middle_div}>
					{performerObj.performer_name}
					<div className={styles.performed_at_div}>
						<AlternateEmailRounded
							color="primary"
							sx={{ height: "20px", width: "20px", marginRight: "4px" }}
						/>{" "}
						8:44 PM - 8:51 PM
					</div>
				</div>
				<div className={styles.performer_pic_number_div}>
					<div className={styles.row_number}>{2}</div>
				</div>
			</div>
			<DividerH />
		</div>
	);
}

export default DjDatePosterPerformerInRosterPaper;
