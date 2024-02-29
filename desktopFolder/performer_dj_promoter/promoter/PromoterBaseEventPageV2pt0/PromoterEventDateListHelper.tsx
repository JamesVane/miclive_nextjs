/** @format */

import React from "react";
import PromoterDatePaper from "./PromoterDatePaper";
import styles from "./styles.module.css";
import { RootState } from "@/app/LocalizationProviderHelper";
import { useDispatch, useSelector } from "react-redux";

function PromoterEventDateListHelper() {
	const { upcoming_dates, previous_dates } = useSelector(
		(state: RootState) => state.PromoterEventPageV2pt0Slice.event_data
	);

	return (
		<>
			{upcoming_dates.length > 0 ? (
				<>
					<div className={styles.upcoming_prev_divider}>
						<div className={styles.upcoming_divider_text}>Upcoming Dates</div>
						<div className={styles.upcming_line} />
					</div>
					{upcoming_dates.map((date) => {
						return (
							<PromoterDatePaper key={date.specific_event_id} dateInfo={date} />
						);
					})}
				</>
			) : null}
			{previous_dates.length > 0 ? (
				<>
					<div className={styles.upcoming_prev_divider}>
						<div className={styles.previous_divider_text}>Previous Dates</div>
						<div className={styles.previous_line} />
					</div>
					{previous_dates.map((date) => {
						return (
							<PromoterDatePaper key={date.specific_event_id} dateInfo={date} />
						);
					})}
				</>
			) : null}
		</>
	);
}

export default PromoterEventDateListHelper;
