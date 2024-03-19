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
	const reversedUpcomingArray = [...upcomingArray].reverse();
	const reversedPreviousArray = [...previousArray].reverse();
	return (
		<div className={styles.date_scroll_div}>
			{upcomingArray.length === 0 ? null : (
				<>
					<div className={styles.upcoming_prev_divider}>
						<div className={styles.upcoming_divider_text}>Upcoming Dates</div>
						<div className={styles.upcming_line} />
					</div>

					{reversedUpcomingArray.map((date) => {
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
					{reversedPreviousArray.map((date) => {
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
		</div>
	);
}

export default EventDateListHelper;
