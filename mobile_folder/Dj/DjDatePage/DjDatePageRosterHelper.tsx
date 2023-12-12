/** @format */

import React from "react";
import { PerformerInRoster } from "@/store/djEventDateModalDataV2pt0";
import DjDatePosterPerformerInRosterPaper from "./DjDatePosterPerformerInRosterPaper";

interface DjDatePageRosterHelperProps {
	roster: PerformerInRoster[];
}

function DjDatePageRosterHelper({ roster }: DjDatePageRosterHelperProps) {
	return (
		<div>
			{roster.map((performer) => (
				<DjDatePosterPerformerInRosterPaper
					key={performer.performer_id}
					performerObj={performer}
				/>
			))}
		</div>
	);
}

export default DjDatePageRosterHelper;
