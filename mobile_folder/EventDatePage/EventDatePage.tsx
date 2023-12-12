/** @format */

import { useState } from "react";
import AppBarMobile from "@mobi/AppBarMobile";
import styles from "./styles.module.css";
import SkeletonOrImage from "@/SkeletonOrImage";
import { Button, Tabs, Tab, LinearProgress } from "@mui/material";
import {
	CalendarMonthRounded,
	AccessTimeRounded,
	LocationOnRounded,
	BookmarkAddRounded,
	IosShareRounded,
	BookmarkRemoveRounded,
	ArrowBackIosNewRounded,
} from "@mui/icons-material";
import PersonRowMobile from "@mobi/PersonRowMobile";
import { DateModalStateType } from "./EventDateReducer";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import EventDatePageRosterHelper from "./EventDatePageRosterHelper";
import EventDateAudioSubmit from "./EventDateAudioSubmit";
import PerformerSelectFromExistingModalMobile from "./PerformerSelectFromExistingModalMobile";
import PerformerAddNewAudioToEventModal from "./PerformerAddNewAudioToEventModal";
import { useRouter } from "next/navigation";
import PurchaseSignUpInModalMobile from "./PurchaseSignUpInModalMobile";
import DescriptionComponent from "@mobi/DescriptionComponent";
import horizLogo from "@/images/miclive_svg_horiz.svg";
import Image from "next/image";
import DividerH from "@/universalComponents/DividerH";

interface EventDatePageProps {
	handleBackButton: () => void;
	stateFromReducer: DateModalStateType;
	hasTicketButton: boolean;
	isFromTicketsPage: boolean;
	isAlreadyFollowing: boolean;
	handleFollowButton: () => void;
	followingInProgress: boolean;
	refreshPage: () => void;
}

function EventDatePage({
	handleBackButton,
	stateFromReducer,
	hasTicketButton,
	isFromTicketsPage,
	refreshPage,
	isAlreadyFollowing,
	handleFollowButton,
	followingInProgress,
}: EventDatePageProps) {
	const router = useRouter();
	const [tab, setTab] = useState(1);
	const [signUpInBuyModalOpen, setSignUpInBuyModalOpen] = useState(false);

	function handleClickBuyTicket() {
		if (stateFromReducer.pageState === "not log in upcoming") {
			setSignUpInBuyModalOpen(true);
		} else if (
			stateFromReducer.pageState === "log in upcoming with no ticket"
		) {
			router.push(
				`/m/buy_ticket/purchase/${stateFromReducer.specific_event_id}`
			);
		}
	}

	return (
		<>
			{signUpInBuyModalOpen ? (
				<PurchaseSignUpInModalMobile
					closeModal={() => setSignUpInBuyModalOpen(false)}
					specificEventId={stateFromReducer.specific_event_id}
					eventName={stateFromReducer.event_name}
				/>
			) : null}
			<PerformerSelectFromExistingModalMobile
				refreshAudio={() => refreshPage()}
			/>
			<PerformerAddNewAudioToEventModal refreshAudio={() => refreshPage()} />
			<AppBarMobile>
				<Button
					onClick={handleBackButton}
					size="small"
					sx={{ position: "absolute", left: "0px" }}
					startIcon={<ArrowBackIosNewRounded />}
					color="secondary">
					back
				</Button>
				<div className={styles.logo_div}>
					<Image alt="logo" src={horizLogo} style={{ width: "100%" }} />
				</div>
			</AppBarMobile>
			<div className={styles.main_div}>
				<div className={styles.pic_name_div}>
					<div className={styles.pic_div}>
						<div className={styles.pic_deco}>
							<SkeletonOrImage
								type="event"
								id={stateFromReducer.base_event_id}
							/>
						</div>
					</div>
					<div className={styles.name_div}>{stateFromReducer.event_name}</div>
				</div>
				<DividerH />
				<div className={styles.date_location_div}>
					<div className={styles.date_time_split}>
						<CalendarMonthRounded
							sx={{ marginLeft: "5px", marginRight: "5px" }}
						/>
						{formatDateString(stateFromReducer.start_time)}
					</div>
					<div className={styles.date_time_split}>
						<AccessTimeRounded sx={{ marginRight: "5px" }} />
						{`${formatTimeHour(stateFromReducer.start_time)} - ${formatTimeHour(
							stateFromReducer.end_time
						)}`}
					</div>
				</div>
				<div className={styles.date_location_div}>
					<LocationOnRounded sx={{ marginLeft: "5px", marginRight: "5px" }} />
					<div className={styles.elipse_text}>
						{stateFromReducer.location.name}
					</div>
				</div>
				<div className={styles.buttons_div}>
					{hasTicketButton ? (
						<Button
							onClick={handleClickBuyTicket}
							color="success"
							sx={{ marginLeft: "5px" }}
							variant="contained"
							startIcon={<BookmarkAddRounded />}
							size="small">
							buy ticket
						</Button>
					) : null}
					{isFromTicketsPage ? (
						<Button
							onClick={handleFollowButton}
							disabled={followingInProgress}
							sx={{
								marginLeft: "5px",
								position: "relative",
								overflow: "hidden",
							}}
							variant="outlined"
							startIcon={
								isAlreadyFollowing ? (
									<BookmarkRemoveRounded />
								) : (
									<BookmarkAddRounded />
								)
							}
							color={isAlreadyFollowing ? "warning" : "primary"}
							size="small">
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
						sx={{ marginLeft: "5px" }}
						variant="outlined"
						startIcon={<IosShareRounded />}
						size="small">
						share
					</Button>
				</div>
				{stateFromReducer.pageState === "log in upcoming with ticket" ||
				stateFromReducer.pageState === "log in previous with ticket" ? (
					<Tabs
						sx={{ width: "100%" }}
						value={tab}
						onChange={(e, newValue) => {
							setTab(newValue);
						}}
						aria-label="basic tabs example">
						<Tab label="Info" value={1} sx={{ width: "50%" }} />
						<Tab
							label={
								stateFromReducer.pageState === "log in upcoming with ticket"
									? "My Tracks"
									: stateFromReducer.pageState === "log in previous with ticket"
									? "roster"
									: null
							}
							value={2}
							sx={{ width: "50%" }}
						/>
					</Tabs>
				) : null}
				<>
					{tab === 1 ? (
						<>
							{stateFromReducer.promoter ? (
								<div className={styles.promoter_dj_row}>
									<PersonRowMobile
										info={stateFromReducer.promoter.promoter_info}
										name={stateFromReducer.promoter.promoter_name}
										type="promoter"
										roleId={stateFromReducer.promoter.promoter_id}
										tagline={stateFromReducer.promoter.promoter_tagline}
										userSub={stateFromReducer.promoter.promoter_sub}
										key={stateFromReducer.promoter.promoter_sub}
									/>
								</div>
							) : null}
							{stateFromReducer.dj.dj_id ? (
								<div className={styles.promoter_dj_row}>
									<PersonRowMobile
										info={stateFromReducer.dj.dj_info}
										name={stateFromReducer.dj.dj_name}
										type="dj"
										roleId={stateFromReducer.dj.dj_id}
										tagline={stateFromReducer.dj.dj_tagline}
										userSub={stateFromReducer.dj.dj_sub}
										key={stateFromReducer.dj.dj_sub}
									/>
								</div>
							) : null}
							<div className={styles.desc_div}>
								<DescriptionComponent
									text={stateFromReducer.date_description}
								/>
							</div>
						</>
					) : (
						<>
							{stateFromReducer.pageState === "log in previous with ticket" ? (
								<EventDatePageRosterHelper
									previousRosterArray={stateFromReducer.roster}
								/>
							) : null}
							{stateFromReducer.pageState === "log in upcoming with ticket" ? (
								<EventDateAudioSubmit
									specificEventId={stateFromReducer.specific_event_id}
									submittedAudio={stateFromReducer.submitted_audio}
									allowedLength={stateFromReducer.time_per_performer}
									tracksPerPerformer={stateFromReducer.songs_per_performer}
								/>
							) : null}
						</>
					)}
				</>
			</div>
		</>
	);
}

export default EventDatePage;
