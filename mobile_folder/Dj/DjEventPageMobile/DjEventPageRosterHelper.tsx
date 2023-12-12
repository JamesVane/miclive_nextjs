/** @format */

import React from "react";
import DjEventPageDatePaper from "./DjEventPageDatePaper";
import styles from "./styles.module.css";
import { DjDateType } from "@/api_functions/getDjEventPageDataV2pt0";

interface DjEventPageRosterHelperProps {
	previousArray: DjDateType[];
	upcomingArray: DjDateType[];
}

function DjEventPageRosterHelper({
	previousArray,
	upcomingArray,
}: DjEventPageRosterHelperProps) {
	return (
		<>
			{upcomingArray.length === 0 ? null : (
				<>
					<div className={styles.upcoming_prev_divider}>
						<div className={styles.upcoming_divider_text}>Upcoming Dates</div>
						<div className={styles.upcming_line} />
					</div>

					{upcomingArray.map((date) => {
						return (
							<DjEventPageDatePaper
								key={date.specific_event_id}
								dateInfo={date}
								isUpcoming={true}
							/>
						);
					})}
				</>
			)}
			{previousArray.length === 0 ? null : (
				<>
					<div className={styles.upcoming_prev_divider}>
						<div className={styles.previous_divider_text}>Previous Dates</div>
						<div className={styles.previous_line} />
					</div>
					{previousArray.map((date) => {
						return (
							<DjEventPageDatePaper
								key={date.specific_event_id}
								dateInfo={date}
								isUpcoming={false}
							/>
						);
					})}
				</>
			)}
		</>
	);
}

export default DjEventPageRosterHelper;
