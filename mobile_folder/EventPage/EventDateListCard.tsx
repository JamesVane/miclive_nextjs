/** @format */

import React from "react";
import styles from "./styles.module.css";
import {
	CalendarMonthRounded,
	AccessTimeRounded,
	LocationOnRounded,
	ConfirmationNumberRounded,
} from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";
import { DateType } from "./EventPageReducer";
import {
	formatDateString,
	formatTimeHour,
} from "../../generic_functions/date_formaters";

interface EventDateListCardProps {
	dateInfo: DateType;
	isUpcoming: boolean;
}

function EventDateListCard({ dateInfo, isUpcoming }: EventDateListCardProps) {
	const router = useRouter();
	const locationPathname = usePathname();

	function handleClick() {
		if (dateInfo.performer_has_ticket) {
			router.push(`${locationPathname}/${dateInfo.specific_event_id}/ticket`);
		} else {
			router.push(`${locationPathname}/${dateInfo.specific_event_id}`);
		}
	}

	return (
		<div
			className={
				isUpcoming ? styles.date_card_div_upcoming : styles.date_card_div_prev
			}
			style={{
				marginTop: dateInfo.performer_has_ticket ? "15px" : "5px",
			}}
			onClick={handleClick}>
			{dateInfo.performer_has_ticket ? (
				<div className={styles.has_ticket_tabby}>
					<ConfirmationNumberRounded color="success" />
				</div>
			) : null}

			<div className={styles.date_care_row}>
				<div className={styles.date_time_split}>
					<CalendarMonthRounded
						sx={{ marginLeft: "5px", marginRight: "5px" }}
					/>
					{formatDateString(dateInfo.start_time)}
				</div>
				<div className={styles.date_time_split} style={{ marginLeft: "-15px" }}>
					<AccessTimeRounded sx={{ marginRight: "5px" }} />
					{`${formatTimeHour(dateInfo.start_time)} - ${formatTimeHour(
						dateInfo.start_time
					)}`}
				</div>
			</div>
			<div className={styles.date_care_row}>
				<LocationOnRounded sx={{ marginLeft: "5px", marginRight: "5px" }} />
				<div className={styles.elipse_text}>{dateInfo.location.name}</div>
			</div>
		</div>
	);
}

export default EventDateListCard;
