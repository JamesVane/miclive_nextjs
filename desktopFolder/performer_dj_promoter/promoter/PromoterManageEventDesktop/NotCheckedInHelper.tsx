/** @format */

import React from "react";
import styles from "./styles.module.css";
import NotCheckedInPaper from "./NotCheckedInPaper";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";

function NotCheckedInHelper() {
	const { not_checked_in: notCheckedIn } = useSelector(
		(state: RootState) => state.PromoterManageEventState.roster
	);

	const filteredNotCheckedInArray = notCheckedIn.filter(
		(performer) => performer.performer_id
	);

	return (
		<div className={styles.roster_main_div}>
			{filteredNotCheckedInArray.length === 0 ? (
				<div className={styles.no_performers_styles}>
					No not checked in perforers
				</div>
			) : (
				<>
					{filteredNotCheckedInArray.map((performer) => (
						<NotCheckedInPaper
							performerName={performer.performer_name}
							isTempAccount={performer.is_temp_account}
							key={performer.performer_id}
							performerId={performer.performer_id}
						/>
					))}
				</>
			)}
		</div>
	);
}

export default NotCheckedInHelper;
