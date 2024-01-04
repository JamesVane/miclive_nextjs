/** @format */

import React from "react";
import styles from "./styles.module.css";
import NotCheckedInPaper from "./NotCheckedInPaper";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";

function NotCheckedInHelper() {
	const { not_checked_in: notCheckedIn } = useSelector(
		(state: RootState) => state.PromoterManageEventState.roster
	);

	return (
		<div className={styles.roster_main_div}>
			{notCheckedIn.map((performer) => (
				<NotCheckedInPaper
					performerName={performer.performer_name}
					isTempAccount={performer.is_temp_account}
					key={performer.performer_id}
					performerId={performer.performer_id}
				/>
			))}
		</div>
	);
}

export default NotCheckedInHelper;
