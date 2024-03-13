/** @format */

import React from "react";
import { DateRoster } from "./EventDateReducer";
import EventPageRosterPaper from "./EventPageRosterPaper";
import styles from "./styles.module.css";

interface EventDatePageRosterHelperProps {
	previousRosterArray: DateRoster;
}

function EventDatePageRosterHelper({
	previousRosterArray,
}: EventDatePageRosterHelperProps) {
	return (
		<>
			<div className={styles.roster_header}>Roster</div>
			<div className={styles.roster_scroll}>
				{previousRosterArray.map((roster, index) => {
					return (
						<EventPageRosterPaper
							key={roster.performer}
							performerData={roster}
							index={index + 1}
						/>
					);
				})}
			</div>
		</>
	);
}

export default EventDatePageRosterHelper;
