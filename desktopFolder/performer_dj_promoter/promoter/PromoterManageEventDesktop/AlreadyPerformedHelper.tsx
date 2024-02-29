/** @format */

import React from "react";
import styles from "./styles.module.css";
import AlreadyPerformedPaper from "./AlreadyPerformedPaper";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";

function AlreadyPerformedHelper() {
	const { has_performed: hasPerformed } = useSelector(
		(state: RootState) => state.PromoterManageEventState.roster
	);

	const mappedHasPerformedPapers = Object.entries(hasPerformed).map(
		([key, value]) => (
			<AlreadyPerformedPaper
				queuePosition={value.cue_position}
				performerName={value.performer_name}
				isTempAccount={value.is_temp_account}
				key={value.performer_id}
				performerId={value.performer_id}
			/>
		)
	);

	const mappedHasPerformedPapersIsEmpty = mappedHasPerformedPapers.length === 0;

	return (
		<div className={styles.roster_main_div}>
			{mappedHasPerformedPapersIsEmpty ? (
				<div className={styles.no_performers_styles}>
					No performers have performed
				</div>
			) : (
				<>{mappedHasPerformedPapers}</>
			)}
		</div>
	);
}

export default AlreadyPerformedHelper;
