/** @format */

import React from "react";
import { DateRoster } from "./EventDateReducer";
import EventPageRosterPaper from "./EventPageRosterPaper";

interface EventDatePageRosterHelperProps {
	previousRosterArray: DateRoster;
}

function EventDatePageRosterHelper({
	previousRosterArray,
}: EventDatePageRosterHelperProps) {
	return (
		<>
			{previousRosterArray.map((roster, index) => {
				return (
					<EventPageRosterPaper
						key={roster.performer}
						performerData={roster}
						index={index + 1}
					/>
				);
			})}
		</>
	);
}

export default EventDatePageRosterHelper;
