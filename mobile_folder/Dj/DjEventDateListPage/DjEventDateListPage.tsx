/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import styles from "./styles.module.css";
import DjDatePaper from "./DjDatePaper";

function DjEventDateListPage() {
	const { upcoming_array: upcomingArray, previous_array: previousArray } =
		useSelector((state: RootState) => state.DjEventDateListV2pt0Slice.datesObj);

	return (
		<>
			{upcomingArray.length === 0 && previousArray.length === 0 ? (
				<div className={styles.no_events_div}>
					<div className={styles.text_div}>You are not the DJ</div>
					<div className={styles.text_div}>for any event dates yet.</div>
				</div>
			) : null}
			<div className={styles.date_list_main_div}>
				{upcomingArray.length === 0 ? null : (
					<div
						className={styles.upcoming_previous_div}
						style={{ marginTop: "5px" }}>
						<div className={styles.upcoming_text}>Upcoming events</div>
						<div className={styles.upcoming_line} />
					</div>
				)}
				{upcomingArray.map((event) => {
					return (
						<DjDatePaper
							key={event.specific_event_id}
							dateData={event}
							isUpcoming={true}
						/>
					);
				})}
				{previousArray.length === 0 ? null : (
					<div className={styles.upcoming_previous_div}>
						<div className={styles.previous_text}>Previous Events</div>
						<div className={styles.previous_line} />
					</div>
				)}
				{previousArray.map((event) => {
					return (
						<DjDatePaper
							key={event.specific_event_id}
							dateData={event}
							isUpcoming={false}
						/>
					);
				})}
				<div style={{ width: "100%", height: "65px" }} />
			</div>
		</>
	);
}

export default DjEventDateListPage;
