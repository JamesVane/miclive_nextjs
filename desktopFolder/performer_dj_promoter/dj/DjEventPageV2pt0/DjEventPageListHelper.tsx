/** @format */

import React from "react";
import styles from "./styles.module.css";
import DjEventPageDatePaper from "./DjEventPageDatePaper";
import { DjDateType } from "../../../../api_functions_not_user/getDjEventPageDataV2pt0";

interface DjEventPageListHelperProps {
	upcomingDates: DjDateType[];
	previousDates: DjDateType[];
}

function DjEventPageListHelper({
	upcomingDates,
	previousDates,
}: DjEventPageListHelperProps) {
	return (
		<>
			<div className={styles.event_dates_header} style={{ color: "#C9C8BBFF" }}>
				Event Dates
			</div>
			{upcomingDates.length === 0 ? null : (
				<>
					<div className={styles.upcoming_prev_divider}>
						<div className={styles.upcoming_divider_text}>Upcoming Dates</div>
						<div className={styles.upcming_line} />
					</div>
					{upcomingDates.map((date) => {
						return (
							<DjEventPageDatePaper
								dateInfo={date}
								key={date.specific_event_id}
							/>
						);
					})}
				</>
			)}
			{previousDates.length === 0 ? null : (
				<>
					<div className={styles.upcoming_prev_divider}>
						<div className={styles.previous_divider_text}>Previous Dates</div>
						<div className={styles.previous_line} />
					</div>
					{previousDates.map((date) => {
						return (
							<DjEventPageDatePaper
								dateInfo={date}
								key={date.specific_event_id}
							/>
						);
					})}
				</>
			)}
		</>
	);
}

export default DjEventPageListHelper;
