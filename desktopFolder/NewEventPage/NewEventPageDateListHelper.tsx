/** @format */
"use client";

import React from "react";
import styles from "./styles.module.css";
import { DateType } from "../NewEventPage/NewEventPageReducer";
import NewEventDatePaper from "./NewEventDatePaper";

interface NewEventPageDateListHelperProps {
	upcomingArray: DateType[];
	previousArray: DateType[];
	eventName: string;
}

function NewEventPageDateListHelper({
	upcomingArray,
	previousArray,
	eventName,
}: NewEventPageDateListHelperProps) {
	return (
		<>
			<div className={styles.event_dates_header} style={{ color: "#C9C8BBFF" }}>
				Event Dates
			</div>
			{upcomingArray.length === 0 ? null : (
				<>
					<div className={styles.upcoming_prev_divider}>
						<div className={styles.upcoming_divider_text}>Upcoming Dates</div>
						<div className={styles.upcming_line} />
					</div>

					{upcomingArray.map((date) => {
						return (
							<NewEventDatePaper
								eventName={eventName}
								dateInfo={date}
								key={date.specific_event_id}
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
							<NewEventDatePaper
								eventName={eventName}
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

export default NewEventPageDateListHelper;
