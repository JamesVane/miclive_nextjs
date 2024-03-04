/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Divider } from "@mui/material";
import AvatarSimple from "@desk/AvatarSimple";

function PromoterEventDateRosterPaper() {
	return (
		<div className={styles.roster_paper}>
			<div className={styles.roster_paper_top}>
				<div className={styles.roster_pic_div}>
					<AvatarSimple username={"test"} ninety type="performer" id={14} />
				</div>
			</div>
			<div className={styles.divider_div}>
				<Divider variant="middle" flexItem />
			</div>
		</div>
	);
}

export default PromoterEventDateRosterPaper;
