/** @format */

import React from "react";
import styles from "./styles.module.css";
import AlreadyPerformedPaper from "./AlreadyPerformedPaper";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";

function AlreadyPerformedHelper() {
	const { has_performed: hasPerformed } = useSelector(
		(state: RootState) => state.PromoterManageEventState.roster
	);

	return (
		<div className={styles.roster_main_div}>
			{Object.entries(hasPerformed).map(([key, value]) => (
				<AlreadyPerformedPaper
					queuePosition={value.cue_position}
					performerName={value.performer_name}
					isTempAccount={value.is_temp_account}
					key={value.performer_id}
					performerId={value.performer_id}
				/>
			))}
		</div>
	);
}

export default AlreadyPerformedHelper;
