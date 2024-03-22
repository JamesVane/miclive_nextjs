/** @format */

import { useState, useCallback, useEffect } from "react";
import styles from "./styles.module.css";
import { Button, Divider, Box, IconButton } from "@mui/material";
import {
	KeyRounded,
	QrCode2Rounded,
	ArrowBackIosNewRounded,
	AccessTimeRounded,
	CalendarMonthRounded,
	LocationOnRounded,
	AudioFileRounded,
	AddRounded,
	QueueMusicRounded,
	CloseRounded,
} from "@mui/icons-material";
import KeyCheckIn from "./KeyCheckIn";
import QrCodeCheckIn from "./QrCodeCheckIn";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import LocationCheckIn from "./LocationCheckIn";
import { getNotAddedToRosterCurrentEventInfo } from "@/api_functions/getNotAddedToRosterCurrentEventInfo";
import { useQuery } from "@tanstack/react-query";
import SplashPage from "@/SplashPage";
import {
	formatDateStringShort,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import Drawer from "@mui/material/Drawer";
import { useDispatch } from "react-redux";
import {
	setSelectFromExisting,
	defaultPerformerSelectFromExistingModal,
} from "@/store/performerSelectFromExistingModalSlice";
import EventDateAudioSubmit from "@mobi/EventDatePage/EventDateAudioSubmit";
// import { useSessionState } from "@/custom_hooks/useSessionState";

interface CheckInPageProps {
	specificEventId: number;
	setCheckedIn: () => void;
}

function CheckInPage({ specificEventId, setCheckedIn }: CheckInPageProps) {
	const dispatch = useDispatch();
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const modalState = searchParams.get("modal")
		? searchParams.get("modal") === "true"
			? true
			: searchParams.get("modal") === "false"
			? false
			: false
		: false;

	const {
		status,
		data: preQueueData,
		error,
		isFetching,
		refetch,
	} = useQuery({
		queryKey: [
			"checkInPagePreQueueInfo",
			{
				requestSpecificEventId: specificEventId,
			},
		],
		queryFn: getNotAddedToRosterCurrentEventInfo,
	});

	function refreshPage() {
		refetch();
	}

	function handleBack() {
		router.push("/m/performer");
	}

	const [pageTabState, setPageTabState] = useState<
		"start" | "key" | "qr" | "location"
	>("start");
	/* const [pageTabState, setPageTabState] = useSessionState<
		"start" | "key" | "qr" | "location"
	>("checkInPageTabMobilee", "start"); */

	function handleKeyClick() {
		setPageTabState("key");
	}

	function handleQrClick() {
		setPageTabState("qr");
	}

	function handleToStart() {
		setPageTabState("start");
	}

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	function openModal() {
		router.push(pathname + "?" + createQueryString("modal", "true"));
	}

	function closeModal() {
		router.push(pathname + "?" + createQueryString("modal", "false"));
	}

	const drawerContainerWindowDocumentBody =
		window !== undefined ? () => window.document.body : undefined;

	const submittedAudioIsempty =
		preQueueData && Object.keys(preQueueData.submitted_audio).length === 0;

	const shouleHaveAnd =
		preQueueData && !preQueueData.pre_checked_in && submittedAudioIsempty;

	useEffect(() => {
		if (
			!modalState &&
			preQueueData &&
			preQueueData.pre_checked_in &&
			!submittedAudioIsempty &&
			preQueueData.checked_in
		) {
			setCheckedIn();
		}
	}, [preQueueData]);

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

					{preQueueData ? (
						<EventDateAudioSubmit
							hasDoneButton
							refreshAudio={refreshPage}
							specificEventId={specificEventId}
							submittedAudio={preQueueData.submitted_audio}
							allowedLength={preQueueData.time_per_performer.toString()}
							tracksPerPerformer={1}
							handleDone={() => {
								closeModal();
								refreshPage();
							}}
						/>
					) : null}
				</div>
			</Drawer>
			{status === "pending" || !preQueueData ? (
				<SplashPage />
			) : (
				<div className={styles.main_div}>
					{pageTabState === "location" ? (
						<LocationCheckIn handleToStart={handleToStart} />
					) : pageTabState === "key" ? (
						<KeyCheckIn
							handleToStart={handleToStart}
							setCheckedIn={refreshPage}
						/>
					) : pageTabState === "qr" ? (
						<QrCodeCheckIn
							handleToStart={handleToStart}
							setCheckedIn={refreshPage}
						/>
					) : (
						<>
							<Button
								onClick={handleBack}
								size="small"
								sx={{ position: "fixed", left: "2px", top: "2px" }}
								startIcon={<ArrowBackIosNewRounded />}
								color="secondary">
								back
							</Button>
							<div className={styles.event_div}>
								<div className={styles.event_top_div}>
									<div className={styles.event_pic}>
										<img
											src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${preQueueData.base_event_id}.jpg`}
											style={{
												width: "100%",
												height: "100%",
											}}
										/>
									</div>
									{preQueueData.base_event_name}
								</div>
								<div className={styles.event_div_bottom}>
									<div
										className={styles.event_date_loc}
										style={{
											marginTop: "-2.5px",
										}}>
										<CalendarMonthRounded
											sx={{
												height: "20px",
												width: "20px",
												marginRight: "5px",
											}}
										/>
										{formatDateStringShort(preQueueData.start_time)}
										<AccessTimeRounded
											sx={{
												height: "20px",
												width: "20px",
												marginLeft: "10px",
												marginRight: "5px",
											}}
										/>
										{`${formatTimeHour(
											preQueueData.start_time
										)} - ${formatTimeHour(preQueueData.end_time)}`}
									</div>

									<div className={styles.event_date_loc}>
										<LocationOnRounded
											sx={{
												height: "20px",
												width: "20px",
												marginRight: "5px",
											}}
										/>
										<div className={styles.elipses_text}>
											{preQueueData.location.name}
										</div>
									</div>
								</div>
							</div>
							<div className={styles.divider_div}>
								<Divider variant="middle" flexItem />
							</div>
							{preQueueData.pre_checked_in ? null : (
								<div
									className={styles.primary_block}
									style={{
										marginTop: "10px",
									}}>
									<div className={styles.instructions_div}>Check-In with</div>
									<div className={styles.divider_div}>
										<Divider variant="middle" flexItem />
									</div>
									<div className={styles.button_row}>
										<Button
											sx={{
												marginRight: "10px",
											}}
											size="large"
											onClick={handleKeyClick}
											startIcon={<KeyRounded />}
											variant="contained">
											Event Key
										</Button>
										or
										<Button
											sx={{
												marginLeft: "10px",
											}}
											size="large"
											onClick={handleQrClick}
											startIcon={<QrCode2Rounded />}
											variant="contained">
											QR code
										</Button>
									</div>
								</div>
							)}
							{shouleHaveAnd ? <div className={styles.and_div}>And</div> : null}
							{submittedAudioIsempty ? (
								<div className={styles.primary_block}>
									<div
										className={styles.button_row}
										style={{
											marginBottom: "-10px",
										}}>
										<Button
											onClick={openModal}
											variant="contained"
											size="large"
											startIcon={<AudioFileRounded />}>
											submit your audio
										</Button>
									</div>
									or
									<div className={styles.give_audio_inst}>
										Give your audio to the ticket checker
									</div>
								</div>
							) : null}
							<div className={styles.divider_div}>
								<Divider variant="middle" flexItem />
							</div>
							<Box
								sx={{
									color: "success.main",
								}}
								className={styles.added_to_roster}>
								To be added to
							</Box>
							<Box
								sx={{
									color: "success.main",
									marginTop: "-10px",
								}}
								className={styles.added_to_roster}>
								the Queue
								<QueueMusicRounded
									sx={{
										height: "45px",
										width: "45px",
										marginTop: "7px",
										marginLeft: "5px",
									}}
									color="success"
								/>
							</Box>
						</>
					)}
				</div>
			)}
		</>
	);
}

{
	/* <Button
		onClick={handleLocationClick}
		startIcon={
			<AddLocationRounded sx={{ width: "30px", height: "30px" }} />
		}
		variant="outlined"
		sx={buttonStyles}>
		location
	</Button> */
}

export default CheckInPage;
