/** @format */

import { useState, useCallback, useRef, useEffect } from "react";
import AppBarMobile from "@mobi/AppBarMobile";
import styles from "./styles.module.css";
import { Button, Tabs, Tab, LinearProgress, IconButton } from "@mui/material";
import {
	CalendarMonthRounded,
	AccessTimeRounded,
	LocationOnRounded,
	BookmarkAddRounded,
	IosShareRounded,
	BookmarkRemoveRounded,
	ArrowBackIosNewRounded,
	AudioFileRounded,
	ChangeCircleRounded,
	FormatListNumberedRounded,
	CloseRounded,
} from "@mui/icons-material";
import PersonRowMobile from "@mobi/PersonRowMobile";
import { DateModalStateType } from "./EventDateReducer";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import EventDatePageRosterHelper from "./EventDatePageRosterHelper";
import EventDateAudioSubmit from "./EventDateAudioSubmit";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import PurchaseSignUpInModalMobile from "./PurchaseSignUpInModalMobile";
import DescriptionComponent from "@mobi/DescriptionComponent";
import horizLogo from "@/images/miclive_svg_horiz.svg";
import Image from "next/image";
import DividerH from "@/universalComponents/DividerH";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Drawer from "@mui/material/Drawer";
import { RootState } from "@/app/LocalizationProviderHelper";
import { useSelector, useDispatch } from "react-redux";
import {
	setSelectFromExisting,
	defaultPerformerSelectFromExistingModal,
} from "@/store/performerSelectFromExistingModalSlice";
import PerformerSelectFromExistingModalMobile from "./PerformerSelectFromExistingModalMobile";

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
	const dispatch = useDispatch();

	const [signUpInBuyModalOpen, setSignUpInBuyModalOpen] = useState(false);
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const modalState = searchParams.get("modal")
		? searchParams.get("modal") === "true"
			? true
			: searchParams.get("modal") === "false"
			? false
			: false
		: false;

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

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const audioIsSubmitted =
		stateFromReducer.submitted_audio && stateFromReducer.submitted_audio[1];

	function openModal() {
		router.push(pathname + "?" + createQueryString("modal", "true"));
	}

	function closeModal() {
		router.push(pathname + "?" + createQueryString("modal", "false"));
	}

	const whatModalShouldBeOpen =
		stateFromReducer.pageState === "log in previous with no ticket" ||
		stateFromReducer.pageState === "not log in previous"
			? "roster no ticket"
			: stateFromReducer.pageState === "log in previous with ticket"
			? "roster"
			: stateFromReducer.pageState === "not log in upcoming" ||
			  stateFromReducer.pageState === "log in upcoming with no ticket"
			? "purchase"
			: stateFromReducer.pageState === "log in upcoming with ticket"
			? "audio"
			: "nothing";

	const drawerContainerWindowDocumentBody =
		window !== undefined ? () => window.document.body : undefined;

	return (
		<>
			<Drawer
				// PaperProps={{ ref: swipeablePaperRef }}
				container={drawerContainerWindowDocumentBody}
				anchor="bottom"
				open={modalState}
				onClose={() => {
					closeModal();
					dispatch(
						setSelectFromExisting(defaultPerformerSelectFromExistingModal)
					);
					refreshPage();
				}}
				elevation={1}>
				<div className={styles.bottom_drawer_div}>
					<IconButton
						onClick={() => {
							closeModal();
							dispatch(
								setSelectFromExisting(defaultPerformerSelectFromExistingModal)
							);
							refreshPage();
						}}
						color="secondary"
						sx={{
							position: "absolute",
							top: "-20px",
							right: "5px",
							zIndex: 2000,
						}}>
						<CloseRounded />
					</IconButton>
					<div className={styles.bottom_drawer_tab} />

					{whatModalShouldBeOpen === "audio" ? (
						<EventDateAudioSubmit
							refreshAudio={() => refreshPage()}
							specificEventId={stateFromReducer.specific_event_id}
							submittedAudio={stateFromReducer.submitted_audio}
							allowedLength={stateFromReducer.time_per_performer}
							tracksPerPerformer={stateFromReducer.songs_per_performer}
						/>
					) : whatModalShouldBeOpen === "roster" ? (
						<EventDatePageRosterHelper
							previousRosterArray={stateFromReducer.roster}
						/>
					) : null}
				</div>
			</Drawer>

			{signUpInBuyModalOpen ? (
				<PurchaseSignUpInModalMobile
					closeModal={() => setSignUpInBuyModalOpen(false)}
					specificEventId={stateFromReducer.specific_event_id}
					eventName={stateFromReducer.event_name}
				/>
			) : null}

			<AppBarMobile>
				<Button
					onClick={handleBackButton}
					size="small"
					sx={{ position: "absolute", left: "0px" }}
					startIcon={<ArrowBackIosNewRounded />}
					color="secondary">
					back
				</Button>
				<div className={styles.app_bar_absolute}>
					{isFromTicketsPage ? (
						<Button
							onClick={handleFollowButton}
							disabled={followingInProgress}
							sx={{
								marginLeft: "5px",
								position: "relative",
								overflow: "hidden",
							}}
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
						startIcon={<IosShareRounded />}
						size="small">
						share
					</Button>
				</div>
			</AppBarMobile>
			<div className={styles.main_div}>
				<div className={styles.pic_name_div}>
					<div className={styles.pic_div}>
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
					{stateFromReducer.pageState === "log in upcoming with ticket" ? (
						<Button
							onClick={openModal}
							sx={{
								marginLeft: "5px",
							}}
							color={audioIsSubmitted ? "primary" : "error"}
							size="large"
							startIcon={
								audioIsSubmitted ? (
									<ChangeCircleRounded />
								) : (
									<AudioFileRounded />
								)
							}
							variant={audioIsSubmitted ? "outlined" : "contained"}>
							{audioIsSubmitted ? "change audio" : "submit audio"}
						</Button>
					) : null}
					{stateFromReducer.pageState === "log in previous with ticket" ? (
						<Button
							sx={{
								marginLeft: "5px",
							}}
							onClick={openModal}
							variant="outlined"
							size="large"
							startIcon={<FormatListNumberedRounded />}>
							view event roster
						</Button>
					) : null}
				</div>

				{stateFromReducer.promoter ? (
					<div className={styles.promoter_dj_row}>
						{stateFromReducer.promoter ? (
							<PersonRowMobile
								info={stateFromReducer.promoter.promoter_info}
								name={stateFromReducer.promoter.promoter_name}
								type="promoter"
								roleId={stateFromReducer.promoter.promoter_id}
								tagline={stateFromReducer.promoter.promoter_tagline}
								userSub={stateFromReducer.promoter.promoter_sub}
								key={stateFromReducer.promoter.promoter_sub}
							/>
						) : null}
						{stateFromReducer.dj.dj_id ? (
							<PersonRowMobile
								info={stateFromReducer.dj.dj_info}
								name={stateFromReducer.dj.dj_name}
								type="dj"
								roleId={stateFromReducer.dj.dj_id}
								tagline={stateFromReducer.dj.dj_tagline}
								userSub={stateFromReducer.dj.dj_sub}
								key={stateFromReducer.dj.dj_sub}
							/>
						) : null}
					</div>
				) : null}
				<div className={styles.desc_div}>
					<DescriptionComponent text={stateFromReducer.date_description} />
				</div>
			</div>
		</>
	);
}

export default EventDatePage;
