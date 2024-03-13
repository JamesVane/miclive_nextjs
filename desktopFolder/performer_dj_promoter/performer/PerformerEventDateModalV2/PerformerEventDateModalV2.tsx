/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import { IconButton, Button, Divider, LinearProgress } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import {
	CalendarMonthRounded,
	AccessTimeRounded,
	AttachMoneyRounded,
	IosShareRounded,
	BookmarkRemoveRounded,
	BookmarkAddRounded,
	LocationOnRounded,
	AudioFileRounded,
	ChangeCircleRounded,
	FormatListNumberedRounded,
} from "@mui/icons-material";
import PersonRow from "@desk/PersonRow";
import { DateModalStateType } from "./dateModalReducer";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import DescriptionComponent from "@desk/DescriptionComponent";
import EventDateModalAudioSubmit from "./EventDateModalAudioSubmit";
import PerformerSelectFromExistingModal from "../PerformerSelectFromExistingModal";
import PerformerAddNewAudioToEventModal from "../PerformerAddNewAudioToEventModal";
import PurchaseSignUpInModal from "./PurchaseSignUpInModal";
import { useRouter } from "next/navigation";
import PreviousEventRoster from "./PreviousEventRoster";

interface PerformerEventDateModalV2Props {
	handleClose: () => void;
	stateFromReducer: DateModalStateType;
	isFromTicketsPage?: boolean;
	hasTicketButton: boolean;
	refreshPage: () => void;
	isAlreadyFollowing: boolean;
	handleFollowButton: () => void;
	followingInProgress: boolean;
}

function PerformerEventDateModalV2({
	handleClose,
	stateFromReducer,
	isFromTicketsPage,
	hasTicketButton,
	refreshPage,
	isAlreadyFollowing,
	handleFollowButton,
	followingInProgress,
}: PerformerEventDateModalV2Props) {
	const router = useRouter();

	const [audioSubmitOpen, setAudioSubmitOpen] = useState(false);
	const [prevRosterOpen, setPrevRosterOpen] = useState(false);
	const [signUpInBuyModalOpen, setSignUpInBuyModalOpen] = useState(false);

	const iconStyles = {
		marginRight: "4px",
		height: "23px",
		width: "23px",
	};

	const hasRightSection =
		stateFromReducer.pageState === "log in previous with ticket" ||
		stateFromReducer.pageState === "log in upcoming with ticket";

	function handleClickBuyTicket() {
		if (stateFromReducer.pageState === "not log in upcoming") {
			setSignUpInBuyModalOpen(true);
		} else if (
			stateFromReducer.pageState === "log in upcoming with no ticket"
		) {
			router.push(`/buy_ticket/purchase/${stateFromReducer.specific_event_id}`);
		}
	}

	const audioIsSubmitted =
		stateFromReducer.submitted_audio && stateFromReducer.submitted_audio[1];

	return (
		<div className={styles.main_div} onClick={handleClose}>
			{signUpInBuyModalOpen ? (
				<PurchaseSignUpInModal
					closeModal={() => setSignUpInBuyModalOpen(false)}
					specificEventId={stateFromReducer.specific_event_id}
					eventName={stateFromReducer.event_name}
				/>
			) : null}
			<PerformerSelectFromExistingModal refreshAudio={() => refreshPage()} />
			<PerformerAddNewAudioToEventModal refreshAudio={() => refreshPage()} />
			<div
				className={styles.inner_div}
				style={{
					width: "600px",
					// width: hasRightSection ? "1000px" : "575px",
				}}
				onClick={(event) => {
					event.stopPropagation();
				}}>
				{prevRosterOpen ? (
					<PreviousEventRoster
						handleCloseModal={handleClose}
						handleClose={() => {
							setPrevRosterOpen(false);
						}}
						prevRoster={stateFromReducer.roster}
					/>
				) : audioSubmitOpen ? (
					<>
						<EventDateModalAudioSubmit
							specificEventId={stateFromReducer.specific_event_id}
							submittedAudio={stateFromReducer.submitted_audio}
							allowedLength={stateFromReducer.time_per_performer}
							tracksPerPerformer={stateFromReducer.songs_per_performer}
							handleClose={handleClose}
							handleBack={() => {
								setAudioSubmitOpen(false);
							}}
						/>
					</>
				) : (
					<>
						<div className={styles.close_div}>
							{isFromTicketsPage ? (
								<Button
									size="small"
									disabled={followingInProgress}
									sx={{ position: "relative", overflow: "hidden" }}
									onClick={handleFollowButton}
									startIcon={
										isAlreadyFollowing ? (
											<BookmarkRemoveRounded />
										) : (
											<BookmarkAddRounded />
										)
									}
									color={isAlreadyFollowing ? "warning" : "primary"}>
									{isAlreadyFollowing ? "un-follow" : "follow"}
									{followingInProgress ? (
										<LinearProgress
											color={isAlreadyFollowing ? "warning" : "primary"}
											sx={{
												width: "100%",
												position: "absolute",
												bottom: "0px",
											}}
										/>
									) : null}
								</Button>
							) : null}
							<Button
								size="small"
								startIcon={
									<IosShareRounded
										sx={{
											marginTop: "-2.5px",
										}}
									/>
								}
								sx={{
									alignItems: "center",
									justifyContent: "center",
								}}>
								share
							</Button>
							<IconButton
								color="secondary"
								onClick={handleClose}
								sx={{
									height: "35px",
									width: "35px",
									marginRight: "5px",
									position: "absolute",
									right: "5px",
								}}>
								<CloseRounded sx={{ height: "35px", width: "35px" }} />
							</IconButton>
							<div className={styles.divider_absolute}>
								<Divider flexItem />
							</div>
						</div>
						<div className={styles.meat_div}>
							<div className={styles.scroll_div}>
								<div className={styles.pic_header}>
									<div className={styles.pic_container}>
										<div className={styles.pic_deco}>
											<img
												src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${stateFromReducer.base_event_id}.jpg`}
												style={{
													width: "100%",
													height: "100%",
												}}
											/>
										</div>
									</div>
									<div className={styles.pic_header_right}>
										<div className={styles.event_name}>
											{stateFromReducer.event_name}
										</div>
										<div className={styles.date_loc_div}>
											<CalendarMonthRounded sx={iconStyles} />
											{formatDateString(stateFromReducer.start_time)}
											<AccessTimeRounded
												sx={{
													...iconStyles,
													marginLeft: "10px",
												}}
											/>
											{`${formatTimeHour(
												stateFromReducer.start_time
											)} - ${formatTimeHour(stateFromReducer.end_time)}`}
										</div>
										<div className={styles.date_loc_div}>
											<LocationOnRounded sx={iconStyles} />
											<div className={styles.elipse_text}>
												{stateFromReducer.location.name}
											</div>
										</div>
									</div>
								</div>
								<div className={styles.buttons_div}>
									{hasTicketButton ? (
										<Button
											onClick={handleClickBuyTicket}
											color="success"
											startIcon={<AttachMoneyRounded />}
											variant="contained">
											buy ticket
										</Button>
									) : null}

									{stateFromReducer.pageState ===
									"log in upcoming with ticket" ? (
										<Button
											onClick={() => {
												setAudioSubmitOpen(true);
											}}
											size="large"
											variant={audioIsSubmitted ? "outlined" : "contained"}
											startIcon={
												audioIsSubmitted ? (
													<ChangeCircleRounded />
												) : (
													<AudioFileRounded />
												)
											}
											color={audioIsSubmitted ? "primary" : "error"}>
											{audioIsSubmitted ? "change audio" : "submit audio"}
										</Button>
									) : null}
									{stateFromReducer.pageState ===
									"log in previous with ticket" ? (
										<Button
											onClick={() => {
												setPrevRosterOpen(true);
											}}
											variant="outlined"
											size="large"
											startIcon={<FormatListNumberedRounded />}>
											view event roster
										</Button>
									) : null}
								</div>
								<div className={styles.promoter_dj_row_container_div}>
									<div className={styles.promoter_dj_div}>
										<PersonRow
											cameFrom="performer"
											id={stateFromReducer.promoter.promoter_id}
											name={stateFromReducer.promoter.promoter_name}
											tagline={stateFromReducer.promoter.promoter_tagline}
											userSub={stateFromReducer.promoter.promoter_sub}
											promoter
											inputHeight="65px"
										/>
									</div>
									<div className={styles.promoter_dj_div}>
										<PersonRow
											cameFrom="performer"
											id={stateFromReducer.dj.dj_id}
											name={stateFromReducer.dj.dj_name}
											tagline={stateFromReducer.dj.dj_tagline}
											userSub={stateFromReducer.dj.dj_sub}
											dj
											inputHeight="65px"
										/>
									</div>
								</div>

								<div className={styles.divider_div}>
									<Divider variant="middle" flexItem />
								</div>
								<div className={styles.desc_div}>
									<DescriptionComponent
										text={stateFromReducer.date_description}
									/>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default PerformerEventDateModalV2;
