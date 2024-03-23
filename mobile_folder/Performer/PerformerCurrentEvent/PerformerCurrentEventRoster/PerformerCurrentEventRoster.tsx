/** @format */

import React from "react";
import styles from "./styles.module.css";
import PerformerCurrentEventRosterPaper from "./PerformerCurrentEventRosterPaper";
import { RosterType } from "@/api_functions/getPerformerCurrentEventState";

interface PerformerCurrentEventRosterProps {
	roster: RosterType;
	myQueuePosition: number;
}

function PerformerCurrentEventRoster({
	roster,
	myQueuePosition,
}: PerformerCurrentEventRosterProps) {
	return (
		<div className={styles.main_div}>
			{Object.entries(roster).map(([key, value], index) => {
				return (
					<>
						<PerformerCurrentEventRosterPaper
							key={key}
							isSticky={Number(myQueuePosition) === Number(value.roster_key)}
							performerName={value.performer_name}
							queuePosition={index + 1}
							realQueuePosition={value.roster_key}
							performerRoleId={value.performer_id}
						/>
					</>
				);
			})}
			<div className={styles.roster_bumper} />
		</div>
	);
}

export default PerformerCurrentEventRoster;
