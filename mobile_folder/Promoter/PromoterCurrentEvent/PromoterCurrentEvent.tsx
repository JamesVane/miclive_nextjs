/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import {
	Button,
	Divider,
	Paper,
	Tab,
	Tabs,
	BottomNavigation,
	BottomNavigationAction,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
	CloseRounded,
	InfoRounded,
	FormatListNumberedRtlRounded,
	CampaignRounded,
	DoDisturbAltRounded,
	QrCode2Rounded,
} from "@mui/icons-material";
import PromoterCurrentEventInfo from "./PromoterCurrentEventInfo";
import PromoterCurrentEventRoster from "./PromoterCurrentEventRoster";
import PromoterCurrentEventStats from "./PromoterCurrentEventStats";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import MessagingButton from "@mobi/Messaging/MessagingButton";

interface PromoterCurrentEventProps {
	qrUuid: string;
	CheckinKey: string;
}

function PromoterCurrentEvent({
	qrUuid,
	CheckinKey,
}: PromoterCurrentEventProps) {
	const bigEventState = useSelector(
		(state: RootState) => state.PromoterManageEventState
	);

	const eventInfo = bigEventState.event;

	const router = useRouter();
	const [bottomTab, setBottomTab] = useState(0);
	const [selectedTab, setSelectedTab] = useState<
		"not checked" | "cue" | "performed"
	>("not checked");
	const onTabChange = (
		event: React.SyntheticEvent,
		newValue: "not checked" | "cue" | "performed"
	) => {
		setSelectedTab(newValue);
	};
	function handleSetBottomTab(event: any, newValue: number) {
		setBottomTab(newValue);
	}
	return (
		<div className={styles.main_div}>
			{bottomTab === 0 ? null : (
				<Paper className={styles.header_paper} square>
					<div className={styles.back_name_div}>
						<Button
							color="secondary"
							onClick={() => router.push("/m/promoter")}
							startIcon={<CloseRounded />}
							sx={{ position: "absolute", left: 0 }}>
							exit
						</Button>
						<div className={styles.event_name_div}>
							<div className={styles.elipses_test}>{eventInfo.event_name}</div>
						</div>
						<div className={styles.timer_div}>
							<div className={styles.timer_decoration}>03:55:25</div>
						</div>
					</div>
					{bottomTab === 1 ? (
						<>
							<Divider variant="middle" />
							<Tabs
								sx={{ width: "100%" }}
								value={selectedTab}
								onChange={onTabChange}
								aria-label="disabled tabs example">
								<Tab
									sx={{ width: "33%" }}
									label="Not Checked"
									value={"not checked"}
								/>
								<Tab sx={{ width: "33%" }} label="Queue" value={"cue"} />
								<Tab
									sx={{ width: "34%" }}
									label="Performed"
									value={"performed"}
								/>
							</Tabs>
						</>
					) : null}
				</Paper>
			)}
			{bottomTab === 0 ? null : (
				<div
					className={
						bottomTab === 1 ? styles.top_bumper_roster : styles.top_bumper
					}
				/>
			)}
			{bottomTab === 0 ? (
				<PromoterCurrentEventInfo eventInfo={eventInfo} />
			) : bottomTab === 1 ? (
				<PromoterCurrentEventRoster selectedTab={selectedTab} />
			) : bottomTab === 2 ? (
				<PromoterCurrentEventStats
					startTime={eventInfo.start_time}
					eventName={eventInfo.event_name}
					checkinKey={CheckinKey}
					qrUuid={qrUuid}
				/>
			) : null}
			<div
				className={
					bottomTab === 1 ? styles.bottom_bumper : styles.bottom_bumper_not_cue
				}
			/>
			<div
				className={
					bottomTab === 1
						? styles.message_container
						: styles.message_container_small
				}>
				<MessagingButton />
			</div>
			<Paper
				square
				className={
					bottomTab === 1 ? styles.bottom_paper_cue : styles.bottom_paper
				}>
				{bottomTab === 1 ? (
					<div className={styles.bottom_paper_buttons}>
						<Button
							startIcon={<DoDisturbAltRounded />}
							variant="outlined"
							size="small"
							sx={{ height: "90%", width: "47.5%", fontSize: "15px" }}>
							stop sales
						</Button>
						<Button
							startIcon={<CampaignRounded />}
							variant="outlined"
							size="small"
							sx={{ height: "90%", width: "47.5%", fontSize: "15px" }}>
							announcement
						</Button>
					</div>
				) : null}

				<div className={styles.bottom_paper_nav}>
					{bottomTab === 1 ? (
						<Divider
							variant="middle"
							sx={{ marginBottom: "-2.5px", marginTop: "2.5px" }}
						/>
					) : null}
					<BottomNavigation
						sx={{ backgroundColor: "transparent" }}
						showLabels
						value={bottomTab}
						onChange={handleSetBottomTab}>
						<BottomNavigationAction label="Info" icon={<InfoRounded />} />
						<BottomNavigationAction
							label="Roster"
							icon={<FormatListNumberedRtlRounded />}
						/>
						<BottomNavigationAction
							label="Check-In QR"
							icon={<QrCode2Rounded />}
						/>
					</BottomNavigation>
				</div>
			</Paper>
		</div>
	);
}

export default PromoterCurrentEvent;
