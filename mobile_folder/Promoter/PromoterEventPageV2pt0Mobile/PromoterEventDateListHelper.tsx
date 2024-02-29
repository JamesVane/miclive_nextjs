/** @format */

import React from "react";
import PromoterEventDatePapaer from "./PromoterEventDatePapaer";
import styles from "./styles.module.css";
import { RootState } from "@/app/LocalizationProviderHelper";
import { useDispatch, useSelector } from "react-redux";

interface PromoterEventDateListHelperProps {
	paramsEventname: string;
}

function PromoterEventDateListHelper({
	paramsEventname,
}: PromoterEventDateListHelperProps) {
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
							<PromoterEventDatePapaer
								key={date.specific_event_id}
								dateInfo={date}
								isUpcoming
								paramsEventname={paramsEventname}
							/>
						);
					})}
				</>
			) : null}
			<>
				{previous_dates.length > 0 ? (
					<>
						<div className={styles.upcoming_prev_divider}>
							<div className={styles.previous_divider_text}>Previous Dates</div>
							<div className={styles.previous_line} />
						</div>
						{previous_dates.map((date) => {
							return (
								<PromoterEventDatePapaer
									paramsEventname={paramsEventname}
									key={date.specific_event_id}
									dateInfo={date}
								/>
							);
						})}
					</>
				) : null}
			</>
		</>
	);
}

export default PromoterEventDateListHelper;
