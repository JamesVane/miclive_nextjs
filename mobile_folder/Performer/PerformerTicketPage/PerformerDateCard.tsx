/** @format */
import React from "react";
import styles from "./styles.module.css";
import { Divider } from "@mui/material";
import {
	LocationOnRounded,
	AccessTimeRounded,
	CalendarMonthRounded,
	HourglassTopRounded,
	HourglassBottomRounded,
	AudioFileRounded,
	MusicOffRounded,
} from "@mui/icons-material";
import { TicketEvent } from "@/api_functions/getPerformerTicketEventsV2pt0";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import { useRouter } from "next/navigation";

interface PerformerDateCardProps {
	cardInfo: TicketEvent;
	isUpcoming: boolean;
}

function PerformerDateCard({ cardInfo, isUpcoming }: PerformerDateCardProps) {
	const router = useRouter();

	const eventNameSlug = cardInfo.event_name
		.trim()
		.replace(/\s+/g, "")
		.toLowerCase();

	function handleClick() {
		router.push(
			`/m/event/${eventNameSlug}/${cardInfo.specific_event_id}/ticket`
		);
	}

	return (
		<div className={styles.date_card_div} onClick={handleClick}>
			{cardInfo.has_submitted_audio ? (
				<AudioFileRounded
					color="success"
					sx={{ position: "absolute", top: "2.5px", right: "0px" }}
				/>
			) : (
				<MusicOffRounded
					color="error"
					sx={{ position: "absolute", top: "2.5px", right: "0px" }}
				/>
			)}
			<div className={styles.date_card_top}>
				<div className={styles.pic_div}>
					<div className={styles.pic_deco}>
						<img
							src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${cardInfo.base_event_id}.jpg`}
							style={{
								width: "100%",
								height: "100%",
							}}
						/>
					</div>
				</div>
				<div className={styles.right_div}>{cardInfo.event_name}</div>
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
					{formatDateString(cardInfo.start_time)}
				</div>
				<div className={styles.date_time_split}>
					<AccessTimeRounded
						color={isUpcoming ? "primary" : "secondary"}
						sx={{ marginRight: "2.5px" }}
					/>
					{`${formatTimeHour(cardInfo.start_time)} - ${formatTimeHour(
						cardInfo.end_time
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
				<div className={styles.elipse_text}>{cardInfo.location.name}</div>
			</div>
		</div>
	);
}

export default PerformerDateCard;
