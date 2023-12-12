/** @format */

import React from "react";
import EventDateListCard from "./EventDateListCard";
import { DateType } from "./EventPageReducer";
import styles from "./styles.module.css";

interface EventDateListHelperProps {
	upcomingArray: DateType[];
	previousArray: DateType[];
}

function EventDateListHelper({
	previousArray,
	upcomingArray,
}: EventDateListHelperProps) {
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
							<EventDateListCard
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
							<EventDateListCard
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

export default EventDateListHelper;
