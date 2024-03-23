/** @format */

import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { Divider } from "@mui/material";
import {
	AccessTimeRounded,
	CalendarMonthRounded,
	LocationOnRounded,
} from "@mui/icons-material";
import DescriptionComponent from "@mobi/DescriptionComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import {
	formatDateStringShort,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import PersonRowMobile from "@mobi/PersonRowMobile";
import { EventInfo } from "@/api_functions/getPerformerCurrentEventState";

interface PerformerCurrentEventInfoProps {
	eventInfo: EventInfo;
}

function PerformerCurrentEventInfo({
	eventInfo,
}: PerformerCurrentEventInfoProps) {
	const router = useRouter();
	const [selectedTab, setSelectedTab] = React.useState<"info" | "desc">("info");
	const onTabChange = (
		event: React.SyntheticEvent,
		newValue: "info" | "desc"
	) => {
		setSelectedTab(newValue);
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
		<div className={styles.main_div}>
			<div className={styles.top_div}>
				<div className={styles.pic_div}>
					<div className={styles.pic_deco}>
						<img
							src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${eventInfo.base_event_id}.jpg`}
							style={{
								width: "100%",
								height: "100%",
							}}
						/>
					</div>
				</div>
				<div className={styles.top_right}>
					<div className={styles.event_name_div}>{eventInfo.event_name}</div>
					<div className={styles.tagline_div}>{eventInfo.event_tagline}</div>
				</div>
			</div>
			<div className={styles.dicider_div}>
				<Divider variant="middle" flexItem />
			</div>
			<div className={styles.date_loc_div}>
				<CalendarMonthRounded
					sx={{
						marginRight: "5px",
					}}
				/>
				{formatDateStringShort(eventInfo.start_time)}
				<AccessTimeRounded
					sx={{
						marginRight: "5px",
						marginLeft: "10px",
					}}
				/>
				{formatTimeHour(eventInfo.start_time)} -{" "}
				{formatTimeHour(eventInfo.end_time)}
			</div>
			<div className={styles.date_loc_div}>
				<LocationOnRounded
					sx={{
						marginRight: "5px",
					}}
				/>
				<div className={styles.elipses_text}>{eventInfo.location.name}</div>
			</div>
			<div className={styles.promoter_dj_div}>
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
			<DescriptionComponent text={eventInfo.date_description} />
			<div className={styles.bumper_bottom} />
		</div>
	);
}

export default PerformerCurrentEventInfo;
