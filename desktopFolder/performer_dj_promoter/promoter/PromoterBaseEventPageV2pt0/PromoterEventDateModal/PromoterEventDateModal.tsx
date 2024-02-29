/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import {
	Button,
	IconButton,
	Divider,
	Tabs,
	Tab,
	ButtonGroup,
	LinearProgress,
	Box,
} from "@mui/material";
import {
	CloseRounded,
	CalendarMonthRounded,
	AccessTimeRounded,
	LocationOnRounded,
	CampaignRounded,
	EditRounded,
	AttachMoneyRounded,
	MicExternalOnRounded,
	ConfirmationNumberRounded,
	TimerRounded,
	QrCode2Rounded,
	WarningAmberRounded,
	PersonAddAltRounded,
	IosShareRounded,
	InsertLinkRounded,
	MusicNoteRounded,
} from "@mui/icons-material";
import EventDjCard from "../EventDjCard";
import EarlyBirdIcon from "@/SpecialIcons/EarlyBirdIcon";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import PromoterEventDateRosterHelper from "./PromoterEventDateRosterHelper";
import { RootState } from "@/app/LocalizationProviderHelper";
import { useSelector } from "react-redux";
import DescriptionComponent from "@desk/DescriptionComponent";

interface PromoterEventDateModalProps {
	handlClose: () => void;
	paramsEventName: string;
	setQrModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleSetEditOpen: () => void;
	noDateLinkLoaded: boolean;
	isLoadingInvite: boolean;
	handleCopyDateToClipboard: () => void;
	handleDateLink: () => void;
	handleShareDateUrl: () => void;
}

function PromoterEventDateModal({
	handlClose,
	paramsEventName,
	setQrModalOpen,
	handleSetEditOpen,
	noDateLinkLoaded,
	isLoadingInvite,
	handleCopyDateToClipboard,
	handleDateLink,
	handleShareDateUrl,
}: PromoterEventDateModalProps) {
	const dateLocIconStyles = {
		marginRight: "5px",
		height: "27px",
		width: "27px",
	};

	const iconStyles = {
		color: "#888661ff",
		width: "27px",
		height: "27px",
		marginRight: "5px",
	};

	const [selectedTab, setSelectedTab] = useState(1);

	const onTabChange = (event: React.SyntheticEvent, newValue: 1 | 2) => {
		setSelectedTab(newValue);
	};

	const dateState = useSelector(
		(state: RootState) => state.promoterDateInfoV2pt0Slice
	);

	return (
		<>
			<div className={styles.main_header_div}>
				{dateState.has_ended ? null : (
					<>
						<Button
							onClick={handleSetEditOpen}
							variant="outlined"
							startIcon={<EditRounded />}>
							edit date
						</Button>
						<Button
							onClick={() => setQrModalOpen(true)}
							sx={{ marginLeft: "5px" }}
							variant="outlined"
							startIcon={<QrCode2Rounded />}>
							checkin qr & key
						</Button>
						<Button
							color="warning"
							sx={{ marginLeft: "5px" }}
							variant="outlined"
							startIcon={<CampaignRounded />}>
							announcement
						</Button>
					</>
				)}
				<IconButton
					onClick={handlClose}
					sx={{
						position: "absolute",
						right: "0px",
						top: "0px",
						height: "40px",
						width: "40px",
					}}>
					<CloseRounded sx={{ height: "35px", width: "35px" }} />
				</IconButton>
			</div>
			<div className={styles.main_body_div}>
				<div className={styles.info_section}>
					<div className={styles.info_name_pic}>
						<div className={styles.pic_div}>
							<div className={styles.pic_deco}>
								<img
									src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${dateState.base_event_id}.jpg`}
									style={{
										width: "100%",
										height: "100%",
									}}
								/>
							</div>
						</div>
						<div className={styles.event_name}>{paramsEventName}</div>
					</div>
					<div className={styles.divider_div}>
						<Divider variant="middle" flexItem />
					</div>
					<div className={styles.date_loc_div}>
						<div className={styles.date_time_split}>
							<CalendarMonthRounded
								sx={{
									marginLeft: "5px",
									...dateLocIconStyles,
								}}
							/>
							{formatDateString(dateState.start_time)}
						</div>
						<div className={styles.date_time_split}>
							<AccessTimeRounded sx={dateLocIconStyles} />
							{`${formatTimeHour(dateState.start_time)} - ${formatTimeHour(
								dateState.end_time
							)}`}
						</div>
					</div>
					<div className={styles.date_loc_div}>
						<LocationOnRounded
							sx={{
								marginLeft: "5px",
								...dateLocIconStyles,
							}}
						/>
						<div className={styles.elipse_text}>{dateState.location.name}</div>
					</div>
					<Tabs
						sx={{ width: "100%" }}
						value={selectedTab}
						onChange={onTabChange}>
						<Tab sx={{ width: "50%" }} label="Info" value={1} />
						<Tab sx={{ width: "50%" }} label="Description" value={2} />
					</Tabs>

					{selectedTab === 1 ? (
						<>
							{dateState.dj ? (
								<div className={styles.dj_card_div}>
									<EventDjCard
										small
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
								<div className={styles.secondary_text}>
									Early Bird Sales End:
								</div>
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
								<div className={styles.secondary_text}>
									Time Per Performer:{" "}
								</div>
								<div className={styles.primary_text}>
									{dateState.time_per_performer}
								</div>
							</div>
							<div className={styles.info_row}>
								<MusicNoteRounded sx={iconStyles} />
								<div className={styles.secondary_text}>
									Tracks per performer:
								</div>
								<div className={styles.primary_text}>
									{dateState.tracks_per_performer}
								</div>
							</div>
						</>
					) : selectedTab === 2 ? (
						<div className={styles.desc_div}>
							<DescriptionComponent text={dateState.date_description} />
						</div>
					) : null}
				</div>
				<div className={styles.divider_vert}>
					<Divider orientation="vertical" flexItem variant="middle" />
				</div>
				<div className={styles.roster_section}>
					<div className={styles.roster_header}>Roster</div>
					<div className={styles.roster_container}>
						<PromoterEventDateRosterHelper rosterArray={dateState.roster} />
					</div>
				</div>
			</div>
		</>
	);
}

export default PromoterEventDateModal;
