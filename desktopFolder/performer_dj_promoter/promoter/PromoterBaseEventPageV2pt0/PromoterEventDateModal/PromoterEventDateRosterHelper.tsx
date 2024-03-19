/** @format */

import React from "react";
import PromoterEventDateRosterPaper from "./PromoterEventDateRosterPaper";
import { PerformerInRoster } from "@/store/promoterDateInfoV2pt0Slice";

interface PromoterEventDateRosterHelperProps {
	rosterArray: PerformerInRoster[];
}

function PromoterEventDateRosterHelper({
	rosterArray,
}: PromoterEventDateRosterHelperProps) {
	return (
		<>
			{rosterArray.map((performer) => {
				return (
					<PromoterEventDateRosterPaper
						performerName={performer.performer_name}
						performerRoleId={performer.performer_id}
						hasAudio={performer.has_submitted_audio}
						key={performer.performer_id}
					/>
				);
			})}
		</>
	);
}

export default PromoterEventDateRosterHelper;
