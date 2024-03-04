/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import {
	Button,
	Avatar,
	BottomNavigation,
	BottomNavigationAction,
} from "@mui/material";
import {
	CloseRounded,
	SearchRounded,
	EditRounded,
	FormatListNumberedRtlRounded,
	InfoRounded,
	AudioFileRounded,
} from "@mui/icons-material";
import PerformerCurrentEventInfo from "./PerformerCurrentEventInfo";
import PerformerCurrentEventRoster from "./PerformerCurrentEventRoster/PerformerCurrentEventRoster";
// import PerformerSubmittedAudio from "../PerformerSubmittedAudio";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import AvatarSimpleMobile from "@mobi/small_components/AvatarSimpleMobile";
import DividerH from "@/universalComponents/DividerH";

interface PerformerCurrentEventProps {
	myRoleId: number;
	handleExitModal: () => void;
}

function PerformerCurrentEvent({
	myRoleId,
	handleExitModal,
}: PerformerCurrentEventProps) {
	const [tab, setTab] = useState(1);

	function handleSetTab(event: any, newValue: number) {
		setTab(newValue);
	}

	const { event: eventInfo } = useSelector(
		(state: RootState) => state.performerCurrentEventSlice
	);

	return (
		<div className={styles.main_div}>
			{tab === 0 ? null : (
				<div className={styles.header_paper}>
					<div className={styles.back_name_div}>
						<Button
							color="secondary"
							onClick={handleExitModal}
							startIcon={<CloseRounded />}
							sx={{ position: "absolute", left: 0 }}>
							exit
						</Button>
						{eventInfo.event_name}
						<div className={styles.timer_div}>
							<div className={styles.timer_decoration}>03:55:25</div>
						</div>
					</div>
					<DividerH />
					{tab === 2 ? (
						<div className={styles.submitted_audio_header_div}>
							Submitted Audio
							<div className={styles.time_used_div}>
								<div className={styles.time_used_side}>
									<div className={styles.time_used_top}>02:32</div>
									<div className={styles.time_used_bottom}>Time Used</div>
								</div>
								<div className={styles.time_used_slash}>/</div>

								<div className={styles.time_used_side}>
									<div className={styles.time_used_top}>03:00</div>
									<div className={styles.time_used_bottom}>Max Time</div>
								</div>
							</div>
						</div>
					) : (
						<div className={styles.profile_header_info_div}>
							<div className={styles.header_pic}>
								<AvatarSimpleMobile
									username={eventInfo.promoter.promoter_name}
									ninety
									type="performer"
									id={myRoleId}
								/>
							</div>
							<Button
								startIcon={<SearchRounded />}
								endIcon={<EditRounded />}
								size="small"
								variant="outlined">
								view/edit profile
							</Button>
							<div className={styles.header_number}>
								<Avatar
									sx={{
										width: "80%",
										height: "80%",
										backgroundColor: "transparent",
										color: "#f7dca1ff",
										border: "1px solid #f7dca1ff",
									}}>
									5
								</Avatar>
							</div>
						</div>
					)}
				</div>
			)}
			{tab === 0 ? null : <div className={styles.header_bumper} />}
			{tab === 0 ? null : <div className={styles.header_performer_bumper} />}
			<div className={styles.current_event_bottom_box}>
				<div className={styles.bottom_nav_paper}>
					<BottomNavigation showLabels value={tab} onChange={handleSetTab}>
						<BottomNavigationAction label="Event Info" icon={<InfoRounded />} />
						<BottomNavigationAction
							label="Roster"
							icon={<FormatListNumberedRtlRounded />}
						/>
						<BottomNavigationAction
							label="My Tracks"
							icon={<AudioFileRounded />}
						/>
					</BottomNavigation>
				</div>
			</div>
			{tab === 0 ? (
				<PerformerCurrentEventInfo />
			) : tab === 1 ? (
				<PerformerCurrentEventRoster />
			) : tab === 2 ? (
				<div />
			) : /* <PerformerSubmittedAudio /> */
			null}
		</div>
	);
}

export default PerformerCurrentEvent;
