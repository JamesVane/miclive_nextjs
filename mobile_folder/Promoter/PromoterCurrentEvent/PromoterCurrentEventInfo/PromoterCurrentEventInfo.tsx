/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Tabs, Tab } from "@mui/material";
import PromoterCurrentEventInfoInfo from "./PromoterCurrentEventInfoInfo";
import { EventInfoType } from "@/store/PromoterManageEventState";
import DescriptionComponent from "@mobi/DescriptionComponent";
import {
	CalendarMonthRounded,
	LocationOnRounded,
	AccessTimeRounded,
} from "@mui/icons-material";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";

interface PromoterCurrentEventInfoProps {
	eventInfo: EventInfoType;
}

function PromoterCurrentEventInfo({
	eventInfo,
}: PromoterCurrentEventInfoProps) {
	const [selectedTab, setSelectedTab] = React.useState<"info" | "desc">("info");
	const onTabChange = (
		event: React.SyntheticEvent,
		newValue: "info" | "desc"
	) => {
		setSelectedTab(newValue);
	};
	return (
		<div className={styles.event_info_main_div}>
			<div className={styles.promoter_header_paper}>
				<div className={styles.header_paper_top}>
					<div className={styles.pic_div}>
						<div className={styles.pic_wrapper}>
							<img
								src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${eventInfo.base_event_id}.jpg`}
								style={{
									width: "100%",
									height: "100%",
								}}
							/>
						</div>
					</div>
					<div className={styles.event_name}>{eventInfo.event_name}</div>
				</div>
				<div className={styles.header_bottom_row}>
					<div className={styles.time_date_split}>
						<CalendarMonthRounded
							sx={{ marginLeft: "2.5px", marginRight: "2.5px" }}
						/>
						{formatDateString(eventInfo.start_time)}
					</div>
					<div className={styles.time_date_split}>
						<AccessTimeRounded sx={{ marginRight: "2.5px" }} />
						{`${formatTimeHour(eventInfo.start_time)} - ${formatTimeHour(
							eventInfo.end_time
						)}`}
					</div>
				</div>
				<div className={styles.header_bottom_row}>
					<LocationOnRounded
						sx={{ marginLeft: "2.5px", marginRight: "2.5px" }}
					/>
					{eventInfo.location.name}
				</div>
			</div>
			<div
				style={{
					height: "48px",
					width: "100%",
					zIndex: 999,
					marginTop: "-5px",
				}}>
				<Tabs
					sx={{ width: "100%" }}
					value={selectedTab}
					onChange={onTabChange}
					aria-label="disabled tabs example">
					<Tab sx={{ width: "50%" }} label="Info" value={"info"} />
					<Tab sx={{ width: "50%" }} label="Description" value={"desc"} />
				</Tabs>
			</div>
			{selectedTab === "info" ? (
				<PromoterCurrentEventInfoInfo eventInfo={eventInfo} />
			) : selectedTab === "desc" ? (
				<>
					<DescriptionComponent text={eventInfo.date_description} />
				</>
			) : null}
		</div>
	);
}

export default PromoterCurrentEventInfo;
