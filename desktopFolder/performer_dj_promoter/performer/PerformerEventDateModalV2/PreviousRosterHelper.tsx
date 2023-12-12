/** @format */

import React from "react";
import styles from "./styles.module.css";
import { DateRoster } from "./dateModalReducer";
import DatePagePreviousRosterPaper from "./DatePagePreviousRosterPaper";

interface PreviousRosterHelperProps {
	previousRosterArray: DateRoster;
}

function PreviousRosterHelper({
	previousRosterArray,
}: PreviousRosterHelperProps) {
	return (
		<>
			<div className={styles.roster_header}>
				<div className={styles.roster_title_text}>Event Roster</div>
			</div>
			<div className={styles.roster_scroll_div}>
				{previousRosterArray.map((roster, index) => {
					return (
						<DatePagePreviousRosterPaper
							key={roster.performer}
							performerData={roster}
							index={index + 1}
						/>
					);
				})}
			</div>
		</>
	);
}

export default PreviousRosterHelper;
