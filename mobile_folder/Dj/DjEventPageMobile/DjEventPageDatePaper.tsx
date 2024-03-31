/** @format */

import React from "react";
import styles from "./styles.module.css";
import {
	CalendarMonthRounded,
	AccessTimeRounded,
	LocationOnRounded,
	AlbumRounded,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import { DjDateType } from "@/api_functions_not_user/getDjEventPageDataV2pt0";

interface DjEventPageDatePaperProps {
	dateInfo: DjDateType;
	isUpcoming: boolean;
}

function DjEventPageDatePaper({
	dateInfo,
	isUpcoming,
}: DjEventPageDatePaperProps) {
	const router = useRouter();

	function handleClick() {
		if (dateInfo.is_dj_for_event) {
			router.push(
				`/dj/date_page/${dateInfo.specific_event_id}/is_dj_for_event`
			);
		} else {
			router.push(`/dj/date_page/${dateInfo.specific_event_id}`);
		}
	}

	return (
		<div
			className={
				isUpcoming ? styles.date_card_div_upcoming : styles.date_card_div_prev
			}
			style={{
				marginTop: dateInfo.is_dj_for_event ? "15px" : "5px",
			}}
			onClick={handleClick}>
			{dateInfo.is_dj_for_event ? (
				<div className={styles.has_ticket_tabby}>
					<AlbumRounded color="success" />
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

export default DjEventPageDatePaper;
