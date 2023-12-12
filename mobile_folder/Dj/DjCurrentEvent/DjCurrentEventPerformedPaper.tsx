/** @format */

import React from "react";
import { Avatar, Button, Divider } from "@mui/material";
import styles from "./styles.module.css";
import { MessageRounded } from "@mui/icons-material";

function DjCurrentEventPerformedPaper() {
	return (
		<>
			<div className={styles.roster_paper_wrapper}>
				<div className={styles.roster_paper_pic_number}>
					<Avatar sx={{ width: "85%", height: "85%" }}></Avatar>
				</div>
				<div className={styles.roster_paper_middle_div}>
					<div className={styles.roster_paper_name}>Performer Name</div>
					<div className={styles.roster_not_cue_bottom}>
						<div className={styles.roster_submitted_audio}>
							<div
								className={styles.roster_submitted_audio_decoration}
								style={{ borderColor: "#757575ff", color: "#757575ff" }}>
								No Audio
							</div>
						</div>
						<Button
							sx={{ marginLeft: "5px" }}
							startIcon={<MessageRounded />}
							size="small"
							variant="outlined">
							msg
						</Button>
					</div>
				</div>

				<div className={styles.roster_paper_pic_number}>
					<Avatar
						sx={{
							width: "85%",
							height: "85%",
							backgroundColor: "transparent",
							border: "1px solid #f7dca1ff",
							color: "#f7dca1ff",
							fontSize: "35px",
						}}>
						2
					</Avatar>
				</div>
			</div>
			<Divider variant="middle" />
		</>
	);
}

export default DjCurrentEventPerformedPaper;
