/** @format */

import React from "react";
import styles from "./styles.module.css";
import NormalEventCard from "@mobi/NormalEventCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";

function PerformerFollowingPage() {
	const followingArray = useSelector(
		(state: RootState) => state.performerFollowingArrayV2Slice
	);

	return (
		<div className={styles.main_div}>
			{followingArray.map((event) => {
				return (
					<NormalEventCard
						key={event.base_event_id}
						eventName={event.event_name}
						eventTalgine={event.event_tagline}
						baseEventId={event.base_event_id}
					/>
				);
			})}
			<div style={{ width: "100%", height: "65px" }} />
		</div>
	);
}

export default PerformerFollowingPage;
