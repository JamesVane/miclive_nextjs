/** @format */

import React from "react";
import styles from "./styles.module.css";
import AvatarSimpleMobile from "@mobi/small_components/AvatarSimpleMobile";
import { AlternateEmailRounded } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { Performer } from "@/api_functions/getSingleDateInfoWithPerformerId";

interface EventPageRosterPaperProps {
	performerData: Performer;
	index: number;
}

function EventPageRosterPaper({
	performerData,
	index,
}: EventPageRosterPaperProps) {
	return (
		<div className={styles.roster_paper}>
			<div className={styles.roster_paper_content}>
				<div className={styles.performer_pic_number_div}>
					<AvatarSimpleMobile
						ninety
						type="performer"
						id={performerData.performer}
					/>
				</div>
				<div className={styles.roster_row_middle_div}>
					{performerData.performer_name}
					<div className={styles.performed_at_div}>
						<AlternateEmailRounded
							color="primary"
							sx={{ height: "20px", width: "20px", marginRight: "4px" }}
						/>{" "}
						8:44 PM - 8:51 PM
					</div>
				</div>
				<div className={styles.performer_pic_number_div}>
					<div className={styles.row_number}>{index}</div>
				</div>
			</div>
			<div className={styles.divider_div}>
				<Divider flexItem variant="middle" />
			</div>
		</div>
	);
}

export default EventPageRosterPaper;
