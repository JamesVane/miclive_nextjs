/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Divider } from "@mui/material";
import {
	LocationOnRounded,
	AccessTimeRounded,
	CalendarMonthRounded,
	AlbumRounded,
} from "@mui/icons-material";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import { useRouter } from "next/navigation";
import { DjTicketEvent } from "@/api_functions/getDjEventDateList";

interface DjDatePaperProps {
	dateData: DjTicketEvent;
	isUpcoming: boolean;
}

function DjDatePaper({ dateData, isUpcoming }: DjDatePaperProps) {
	const router = useRouter();

	function handleClick() {
		router.push(
			`/m/dj/date_page/${dateData.specific_event_id}/is_dj_for_event`
		);
	}

	return (
		<div className={styles.date_card_div} onClick={handleClick}>
			{dateData.is_primary_dj ? (
				<AlbumRounded
					color="success"
					sx={{ position: "absolute", top: "2.5px", right: "0px" }}
				/>
			) : null}
			<div className={styles.date_card_top}>
				<div className={styles.pic_div}>
					<div className={styles.pic_deco}>
						<img
							src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${dateData.base_event_id}.jpg`}
							style={{
								width: "100%",
								height: "100%",
							}}
						/>
					</div>
				</div>
				<div className={styles.right_div}>{dateData.event_name}</div>
			</div>
			<div className={styles.divider_div}>
				<Divider variant="middle" flexItem />
			</div>
			<div
				className={styles.date_card_info_row}
				style={{ color: isUpcoming ? "#888661ff" : "#bbbab9ff" }}>
				<div className={styles.date_time_split}>
					<CalendarMonthRounded
						color={isUpcoming ? "primary" : "secondary"}
						sx={{ marginLeft: "2.5px", marginRight: "2.5px" }}
					/>{" "}
					{formatDateString(dateData.start_time)}
				</div>
				<div className={styles.date_time_split}>
					<AccessTimeRounded
						color={isUpcoming ? "primary" : "secondary"}
						sx={{ marginRight: "2.5px" }}
					/>
					{`${formatTimeHour(dateData.start_time)} - ${formatTimeHour(
						dateData.end_time
					)}`}
				</div>
			</div>
			<div
				className={styles.date_card_info_row}
				style={{ color: isUpcoming ? "#888661ff" : "#bbbab9ff" }}>
				<LocationOnRounded
					color={isUpcoming ? "primary" : "secondary"}
					sx={{ marginLeft: "2.5px", marginRight: "2.5px" }}
				/>{" "}
				<div className={styles.elipse_text}>{dateData.location.name}</div>
			</div>
		</div>
	);
}

export default DjDatePaper;
