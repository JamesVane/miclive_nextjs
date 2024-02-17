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
} from "@mui/icons-material";
import PersonRow from "@desk/PersonRow";
import { DateModalStateType } from "./dateModalReducer";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import DescriptionComponent from "@desk/DescriptionComponent";
import PreviousRosterHelper from "./PreviousRosterHelper";
import EventDateModalAudioSubmit from "./EventDateModalAudioSubmit";
import PerformerSelectFromExistingModal from "../PerformerSelectFromExistingModal";
import PerformerAddNewAudioToEventModal from "../PerformerAddNewAudioToEventModal";
import PurchaseSignUpInModal from "./PurchaseSignUpInModal";
import { useRouter } from "next/navigation";

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

	const [signUpInBuyModalOpen, setSignUpInBuyModalOpen] = useState(false);

	const iconStyles = {
		marginRight: "4px",
		height: "30px",
		width: "30px",
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
					width: hasRightSection ? "1000px" : "575px",
				}}
				onClick={(event) => {
					event.stopPropagation();
				}}>
				<div className={styles.close_div}>
					Event Date
					<IconButton
						onClick={handleClose}
						sx={{
							position: "absolute",
							top: "0px",
							right: "0px",
							height: "35px",
							width: "35px",
						}}>
						<CloseRounded sx={{ height: "35px", width: "35px" }} />
					</IconButton>
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
									<div className={styles.date_time_split}>
										<CalendarMonthRounded sx={iconStyles} />
										{formatDateString(stateFromReducer.start_time)}
									</div>
									<div className={styles.date_time_split}>
										<AccessTimeRounded sx={iconStyles} />
										{`${formatTimeHour(
											stateFromReducer.start_time
										)} - ${formatTimeHour(stateFromReducer.end_time)}`}
									</div>
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
									size="large"
									variant="contained">
									buy ticket
								</Button>
							) : null}
							{isFromTicketsPage ? (
								<Button
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
									size="large"
									color={isAlreadyFollowing ? "warning" : "primary"}
									variant="outlined">
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
								startIcon={<IosShareRounded />}
								size="large"
								variant="outlined">
								share
							</Button>
						</div>
						<div
							className={styles.promoter_dj_div}
							style={{ marginTop: "5px" }}>
							<PersonRow
								cameFrom="performer"
								id={stateFromReducer.promoter.promoter_id}
								name={stateFromReducer.promoter.promoter_name}
								tagline={stateFromReducer.promoter.promoter_tagline}
								userSub={stateFromReducer.promoter.promoter_sub}
								promoter
							/>
						</div>
						<div
							className={styles.promoter_dj_div}
							style={{ marginTop: "-5px" }}>
							<PersonRow
								cameFrom="performer"
								id={stateFromReducer.dj.dj_id}
								name={stateFromReducer.dj.dj_name}
								tagline={stateFromReducer.dj.dj_tagline}
								userSub={stateFromReducer.dj.dj_sub}
								dj
							/>
						</div>
						<div className={styles.divider_div}>
							<Divider variant="middle" flexItem />
						</div>
						<div className={styles.desc_div}>
							<DescriptionComponent text={stateFromReducer.date_description} />
						</div>
					</div>
					{hasRightSection ? (
						<div className={styles.right_section}>
							<div className={styles.right_section_divider}>
								<Divider flexItem orientation="vertical" variant="middle" />
							</div>
							<div className={styles.right_section_column}>
								{stateFromReducer.pageState ===
								"log in previous with ticket" ? (
									<PreviousRosterHelper
										previousRosterArray={stateFromReducer.roster}
									/>
								) : stateFromReducer.pageState ===
								  "log in upcoming with ticket" ? (
									<EventDateModalAudioSubmit
										specificEventId={stateFromReducer.specific_event_id}
										submittedAudio={stateFromReducer.submitted_audio}
										allowedLength={stateFromReducer.time_per_performer}
										tracksPerPerformer={stateFromReducer.songs_per_performer}
									/>
								) : null}
							</div>
						</div>
					) : null}
				</div>
				PerformerAddNewAudioToEventModal
			</div>
		</div>
	);
}

export default PerformerEventDateModalV2;
