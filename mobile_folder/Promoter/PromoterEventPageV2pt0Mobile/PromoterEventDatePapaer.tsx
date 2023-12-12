/** @format */

import React from "react";
import styles from "./styles.module.css";
import {
	CalendarMonthRounded,
	AccessTimeRounded,
	LocationOnRounded,
} from "@mui/icons-material";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import { useRouter } from "next/navigation";
import { DateType } from "@/store/PromoterEventPageV2pt0Slice";

interface PromoterEventDatePapaerProps {
	dateInfo: DateType;
	isUpcoming?: boolean;
	paramsEventname: string;
}

function PromoterEventDatePapaer({
	dateInfo,
	isUpcoming,
	paramsEventname,
}: PromoterEventDatePapaerProps) {
	const router = useRouter();

	function handleClick() {
		router.push(
			`/m/promoter/event/${paramsEventname}/${dateInfo.specific_event_id}`
		);
	}

	return (
		<div
			className={
				isUpcoming ? styles.date_card_div_up : styles.date_card_div_prev
			}
			onClick={handleClick}>
			<div className={styles.date_care_row}>
				<div className={styles.date_time_split}>
					<CalendarMonthRounded
						sx={{ marginLeft: "5px", marginRight: "5px" }}
					/>
					{formatDateString(dateInfo.start_time)}
				</div>
				<div className={styles.date_time_split}>
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

export default PromoterEventDatePapaer;
