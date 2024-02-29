/** @format */

import React from "react";
import NormalEventCard from "@mobi/NormalEventCard";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";

function DjPrimaryEventListPage() {
	const eventList = useSelector(
		(state: RootState) => state.DjPrimaryEventsListV2pt0Slice
	);

	return (
		<div className={styles.main_div}>
			{eventList.map((event) => (
				<NormalEventCard
					key={event.base_event_id}
					eventName={event.event_name}
					eventTalgine={event.event_tagline}
					baseEventId={event.base_event_id}
					isForDj
				/>
			))}
			{eventList.length === 0 ? (
				<div className={styles.no_events_div}>
					<div className={styles.text_div}>You are not the</div>
					<div className={styles.text_div}>primary DJ for any events</div>
				</div>
			) : null}
		</div>
	);
}

export default DjPrimaryEventListPage;
