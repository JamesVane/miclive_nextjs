/** @format */

import { useState } from "react";
import AppBarMobile from "@mobi/AppBarMobile";
import {
	Divider,
	Button,
	Tabs,
	Tab,
	LinearProgress,
	Box,
	ButtonGroup,
} from "@mui/material";
import {
	CalendarMonthRounded,
	AccessTimeRounded,
	LocationOnRounded,
	ArrowBackIosNewRounded,
	EditRounded,
	MicExternalOnRounded,
	ConfirmationNumberRounded,
	CampaignRounded,
	MusicNoteRounded,
	QrCode2Rounded,
	IosShareRounded,
	WarningAmberRounded,
	PersonAddAltRounded,
	TimerRounded,
	InsertLinkRounded,
	AttachMoneyRounded,
} from "@mui/icons-material";
import styles from "./styles.module.css";
import SkeletonOrImage from "@/SkeletonOrImage";
import PromoterEventDatePageRosterListHelper from "./PromoterEventDatePageRosterListHelper";
import EventDjCard from "../EventDjCard";
import EarlyBirdIcon from "@/SpecialIcons/EarlyBirdIcon";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import { RootState } from "@/store/rootStore";
import { useSelector } from "react-redux";
import DescriptionComponent from "@mobi/DescriptionComponent";

interface PromoterEventDatePageV2tp0MobileProps {
	handleNavigateBack: () => void;
	paramsEventName: string;
	isLoadingInvite: boolean;
	noDateLinkLoaded: boolean;
	handleCopyDateToClipboard: () => void;
	handleDateLink: () => void;
	handleShareDateUrl: () => void;
	handleEditDate: () => void;
	setQrModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PromoterEventDatePageV2tp0Mobile({
	handleNavigateBack,
	paramsEventName,
	isLoadingInvite,
	noDateLinkLoaded,
	handleShareDateUrl,
	handleCopyDateToClipboard,
	handleDateLink,
	handleEditDate,
	setQrModalOpen,
}: PromoterEventDatePageV2tp0MobileProps) {
	const [tab, setTab] = useState<1 | 2 | 3>(1);

	const iconStyles = {
		color: "#888661ff",
		width: "27px",
		height: "27px",
		marginRight: "5px",
	};

	const dateState = useSelector(
		(state: RootState) => state.promoterDateInfoV2pt0Slice
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
							<SkeletonOrImage type="event" id={dateState.base_event_id} />
						</div>
					</div>
					<div className={styles.name_div}>{paramsEventName}</div>
				</div>
				<div className={styles.divider_div}>
					<Divider variant="middle" flexItem />
				</div>
				<div className={styles.date_location_div}>
					<div className={styles.date_time_split}>
						<CalendarMonthRounded
							sx={{ marginLeft: "5px", marginRight: "5px" }}
						/>
						{formatDateString(dateState.start_time)}
					</div>
					<div className={styles.date_time_split}>
						<AccessTimeRounded sx={{ marginRight: "5px" }} />
						{`${formatTimeHour(dateState.start_time)} - ${formatTimeHour(
							dateState.end_time
						)}`}
					</div>
				</div>
				<div className={styles.date_location_div}>
					<LocationOnRounded sx={{ marginLeft: "5px", marginRight: "5px" }} />
					<div className={styles.elipse_text}>{dateState.location.name}</div>
				</div>
				<div className={styles.buttons_div}>
					<Button
						onClick={handleEditDate}
						sx={{ marginLeft: "5px" }}
						startIcon={<EditRounded />}
						variant="outlined"
						size="small">
						edit
					</Button>
					<Button
						onClick={() => setQrModalOpen(true)}
						sx={{ marginLeft: "5px" }}
						startIcon={<QrCode2Rounded />}
						variant="outlined"
						size="small">
						checkin info
					</Button>
					<Button
						color="warning"
						sx={{ marginLeft: "5px" }}
						startIcon={<CampaignRounded />}
						variant="outlined"
						size="small">
						announcement
					</Button>
				</div>
				<Tabs
					sx={{ width: "100%" }}
					value={tab}
					onChange={(e, newValue) => {
						setTab(newValue);
					}}
					aria-label="basic tabs example">
					<Tab label="Info" value={1} sx={{ width: "33%" }} />
					<Tab label="description" value={2} sx={{ width: "34%" }} />
					<Tab label="roster" value={3} sx={{ width: "33%" }} />
				</Tabs>
				{tab === 1 ? (
					<>
						{dateState.dj ? (
							<div className={styles.dj_card_div}>
								<EventDjCard
									djObj={dateState.dj}
									baseEventId={dateState.base_event_id.toString()}
									specificEventid={dateState.specific_event_id.toString()}
								/>
							</div>
						) : (
							<div className={styles.invite_dj_div}>
								{noDateLinkLoaded ? (
									<Button
										color="warning"
										onClick={handleDateLink}
										disabled={isLoadingInvite}
										startIcon={
											<PersonAddAltRounded
												sx={{ height: "25px", width: "25px" }}
											/>
										}
										variant="outlined"
										sx={{
											width: "calc(100% - 10px)",
											height: "85%",
											fontSize: "20px",
											position: "relative",
											overflow: "hidden",
										}}>
										invite date dj
										{isLoadingInvite ? (
											<LinearProgress
												color="warning"
												sx={{
													width: "100%",
													position: "absolute",
													bottom: "0px",
												}}
											/>
										) : null}
									</Button>
								) : (
									<div className={styles.loaded_invite_div}>
										<ButtonGroup size="small">
											<Button
												onClick={handleCopyDateToClipboard}
												startIcon={<InsertLinkRounded />}>
												copy link
											</Button>
											<Button
												onClick={handleShareDateUrl}
												startIcon={<IosShareRounded />}>
												share
											</Button>
										</ButtonGroup>

										<Box
											className={styles.invite_warning_box}
											sx={{
												color: "warning.main",
											}}>
											<WarningAmberRounded
												sx={{
													color: "warning.main",
													marginRight: "2.5px",
												}}
											/>
											Anybody with this link can accept the invite
										</Box>
									</div>
								)}
							</div>
						)}
						<div className={styles.info_row}>
							<AttachMoneyRounded sx={iconStyles} />
							<div className={styles.secondary_text}>Ticket Price:</div>
							<div
								className={
									styles.primary_text
								}>{`${dateState.ticket_price}$`}</div>
							<div className={styles.secondary_text}>| Early-Bird Price:</div>
							<div
								className={
									styles.primary_text
								}>{`${dateState.early_bird_ticket_price}$`}</div>
						</div>
						<div className={styles.info_row}>
							<EarlyBirdIcon primary mobile />
							<div className={styles.secondary_text}>Early Bird Sales End:</div>
							<div className={styles.primary_text}>{`${formatDateString(
								dateState.early_bird_end_time
							)} ${formatTimeHour(dateState.early_bird_end_time)}`}</div>
						</div>
						<div className={styles.info_row}>
							<ConfirmationNumberRounded sx={iconStyles} />
							<div className={styles.secondary_text}>Tickets for sale:</div>
							<div className={styles.primary_text}>
								{dateState.tickets_for_sale}
							</div>
							<div className={styles.secondary_text}>| tickets sold:</div>
							<div className={styles.primary_text}>
								{dateState.tickets_sold ? dateState.tickets_sold : 0}
							</div>
						</div>
						<div className={styles.info_row}>
							<MicExternalOnRounded sx={iconStyles} />
							<div className={styles.secondary_text}>Total Performers:</div>
							<div className={styles.primary_text}>
								{dateState.total_performers}
							</div>
						</div>
						<div className={styles.info_row}>
							<TimerRounded sx={iconStyles} />
							<div className={styles.secondary_text}>Time Per Performer: </div>
							<div className={styles.primary_text}>
								{dateState.time_per_performer}
							</div>
						</div>
						<div className={styles.info_row}>
							<MusicNoteRounded sx={iconStyles} />
							<div className={styles.secondary_text}>Tracks per performer:</div>
							<div className={styles.primary_text}>
								{dateState.tracks_per_performer}
							</div>
						</div>
					</>
				) : null}
				{tab === 2 ? (
					<div className={styles.desc_div}>
						<DescriptionComponent text={dateState.date_description} />
					</div>
				) : null}
				{tab === 3 ? <PromoterEventDatePageRosterListHelper /> : null}
			</div>
		</>
	);
}

export default PromoterEventDatePageV2tp0Mobile;
