/** @format */

import { useState } from "react";
import AppBarMobile from "@mobi/AppBarMobile";
import { Button, Tabs, Tab } from "@mui/material";
import {
	ArrowBackIosNewRounded,
	CalendarMonthRounded,
	AccessTimeRounded,
	LocationOnRounded,
	CancelPresentationRounded,
} from "@mui/icons-material";
import styles from "./styles.module.css";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import PersonRowMobile from "@mobi/PersonRowMobile";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import DescriptionComponent from "@mobi/DescriptionComponent";
import DjDatePageRosterHelper from "./DjDatePageRosterHelper";
import DividerH from "@/universalComponents/DividerH";

interface DjDatePageProps {
	handleNavigateBack: () => void;
	setDropDateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DjDatePage({
	handleNavigateBack,
	setDropDateModalOpen,
}: DjDatePageProps) {
	const [tab, setTab] = useState<1 | 2>(1);

	const dateDataObj = useSelector(
		(state: RootState) => state.djEventDateModalDataV2pt0
	);

	return (
		<>
			<AppBarMobile>
				<Button
					onClick={handleNavigateBack}
					size="small"
					sx={{ position: "absolute", left: "0px" }}
					startIcon={<ArrowBackIosNewRounded />}
					color="secondary">
					back
				</Button>
			</AppBarMobile>
			<div className={styles.main_div}>
				<div className={styles.pic_name_div}>
					<div className={styles.pic_div}>
						<div className={styles.pic_deco}>
							<img
								src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${dateDataObj.base_event_id}.jpg`}
								style={{
									width: "100%",
									height: "100%",
								}}
							/>
						</div>
					</div>
					<div className={styles.name_div}>{dateDataObj.event_name}</div>
				</div>
				<DividerH />
				<div className={styles.date_location_div}>
					<div className={styles.date_time_split}>
						<CalendarMonthRounded
							sx={{ marginLeft: "5px", marginRight: "5px" }}
						/>
						{formatDateString(dateDataObj.start_time)}
					</div>
					<div className={styles.date_time_split}>
						<AccessTimeRounded sx={{ marginRight: "5px" }} />
						{`${formatTimeHour(dateDataObj.start_time)} - ${formatTimeHour(
							dateDataObj.end_time
						)}`}
					</div>
				</div>
				<div className={styles.date_location_div}>
					<LocationOnRounded sx={{ marginLeft: "5px", marginRight: "5px" }} />
					<div className={styles.elipse_text}>{dateDataObj.location.name}</div>
				</div>
				{dateDataObj.isDjForEvent ? (
					<div className={styles.buttons_div}>
						<Button
							onClick={() => setDropDateModalOpen(true)}
							color="warning"
							sx={{ marginLeft: "5px" }}
							startIcon={<CancelPresentationRounded />}
							variant="outlined"
							size="small">
							drop event date
						</Button>
					</div>
				) : null}
				{dateDataObj.isDjForEvent ? (
					<Tabs
						sx={{ width: "100%" }}
						value={tab}
						onChange={(e, newValue) => {
							setTab(newValue);
						}}
						aria-label="basic tabs example">
						<Tab label="Info" value={1} sx={{ width: "50%" }} />
						<Tab label="roster" value={2} sx={{ width: "50%" }} />
					</Tabs>
				) : null}
				{tab === 1 ? (
					<>
						<div className={styles.promoter_dj_row}>
							<PersonRowMobile
								type="promoter"
								info={dateDataObj.promoter.promoter_info}
								name={dateDataObj.promoter.promoter_name}
								roleId={dateDataObj.promoter.promoter_id}
								tagline={dateDataObj.promoter.promoter_tagline}
								userSub={dateDataObj.promoter.promoter_sub}
								key={dateDataObj.promoter.promoter_sub}
							/>
						</div>
						{dateDataObj.dj?.dj_id ? (
							<div className={styles.promoter_dj_row}>
								<PersonRowMobile
									type="dj"
									info={dateDataObj.dj.dj_info}
									name={dateDataObj.dj.dj_name}
									roleId={dateDataObj.dj.dj_id}
									tagline={dateDataObj.dj.dj_tagline}
									userSub={dateDataObj.dj.dj_sub}
									key={dateDataObj.dj.dj_sub}
								/>
							</div>
						) : null}
						<div className={styles.desc_div}>
							<DescriptionComponent text={dateDataObj.date_description} />
						</div>
					</>
				) : null}
				{tab === 2 ? (
					<DjDatePageRosterHelper
						roster={dateDataObj.roster ? dateDataObj.roster : []}
					/>
				) : null}
			</div>
		</>
	);
}

export default DjDatePage;
