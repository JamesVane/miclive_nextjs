/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Avatar, Divider, Button, Chip } from "@mui/material";
import {
	LocationOnRounded,
	CalendarMonthRounded,
	MessageRounded,
	ZoomInRounded,
	Instagram,
	EmailRounded,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import PersonRowMobile from "@mobi/PersonRowMobile";

function PerformerCurretEventInfoInfo() {
	const { event: eventInfo } = useSelector(
		(state: RootState) => state.performerCurrentEventSlice
	);

	const avatarStyles = {
		height: "40px",
		width: "40px",
		backgroundColor: "rgba(0,0,0,0)",
		border: "1px solid #f8dca1ff",
	};
	const iconStyles = {
		width: "80%",
		height: "80%",
		color: "primary.main",
	};

	function convertInfoToType(
		djInfo: {
			city?: string;
			email?: string;
			phone?: string;
			ig?: string;
			link?: string;
		} | null
	): {
		City?: string;
		Email?: string;
		Phone?: string;
		IG?: string;
		Link?: string;
	} | null {
		if (!djInfo) {
			return null;
		}

		const convertedDjInfo = {
			City: djInfo.city,
			Email: djInfo.email,
			Phone: djInfo.phone,
			IG: djInfo.ig,
			Link: djInfo.link,
		};

		return convertedDjInfo;
	}

	return (
		<div className={styles.main_div} style={{ marginTop: "5px" }}>
			<div className={styles.time_location_row}>
				<Avatar sx={avatarStyles}>
					<CalendarMonthRounded sx={iconStyles} />
				</Avatar>
				<div className={styles.info_text_helper}>
					{`${formatDateString(eventInfo.start_time)} | ${formatTimeHour(
						eventInfo.start_time
					)} - ${formatTimeHour(eventInfo.end_time)}`}
				</div>
			</div>
			<div className={styles.time_location_row} style={{ marginBottom: "5px" }}>
				<Avatar sx={avatarStyles}>
					<LocationOnRounded sx={iconStyles} />
				</Avatar>
				<div className={styles.info_text_helper}>{eventInfo.location.name}</div>
			</div>
			<div className={styles.divider_div} style={{ marginTop: "10px" }}>
				<Divider variant="middle" />
			</div>
			<PersonRowMobile
				info={convertInfoToType(eventInfo.dj.dj_info)}
				name={eventInfo.dj.dj_name}
				tagline={eventInfo.dj.dj_tagline}
				type="dj"
				roleId={eventInfo.dj.dj_id}
				userSub={eventInfo.dj.dj_sub}
			/>
			<PersonRowMobile
				info={convertInfoToType(eventInfo.promoter.promoter_info)}
				name={eventInfo.promoter.promoter_name}
				tagline={eventInfo.promoter.promoter_tagline}
				type="promoter"
				roleId={eventInfo.promoter.promoter_id}
				userSub={eventInfo.promoter.promoter_sub}
			/>
		</div>
	);
}

export default PerformerCurretEventInfoInfo;
