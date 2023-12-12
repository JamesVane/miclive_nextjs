/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Avatar, Button, Divider } from "@mui/material";

function PerformerCurrentEventRosterPaper() {
	return (
		<>
			<div className={styles.roster_paper_main_div}>
				<div className={styles.roster_pic_numberc_wrapper}>
					<Avatar sx={{ width: "80%", height: "80%" }}></Avatar>
				</div>
				<div className={styles.roster_middle}>PerformerName</div>
				<div className={styles.roster_pic_numberc_wrapper}>
					<Avatar
						sx={{
							width: "80%",
							height: "80%",
							backgroundColor: "transparent",
							border: "1px solid #f8dca1ff",
							color: "#f8dca1ff",
							fontSize: "30px",
						}}>
						1
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
