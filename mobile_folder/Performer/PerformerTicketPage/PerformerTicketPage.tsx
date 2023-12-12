/** @format */

import React from "react";
import styles from "./styles.module.css";
import PerformerDateCard from "./PerformerDateCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";

function PerformerTicketPage() {
	const { upcoming: upcomingArray, previous: previousArray } = useSelector(
		(state: RootState) => state.performerTicketsV2pt0
	);

	return (
		<div className={styles.main_div}>
			<div
				className={styles.upcoming_previous_div}
				style={{ marginTop: "5px" }}>
				<div className={styles.upcoming_text}>Upcoming events</div>
				<div className={styles.upcoming_line} />
			</div>
			{upcomingArray.map((event) => {
				return (
					<PerformerDateCard
						key={event.specific_event_id}
						cardInfo={event}
						isUpcoming={true}
					/>
				);
			})}
			<div className={styles.upcoming_previous_div}>
				<div className={styles.previous_text}>Previous Events</div>
				<div className={styles.previous_line} />
			</div>
			{previousArray.map((event) => {
				return (
					<PerformerDateCard
						key={event.specific_event_id}
						cardInfo={event}
						isUpcoming={false}
					/>
				);
			})}
			<div style={{ width: "100%", height: "65px" }} />
		</div>
	);
}

export default PerformerTicketPage;
