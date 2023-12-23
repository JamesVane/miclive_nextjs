/** @format */
"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import {
	IconButton,
	CircularProgress,
	Button,
	LinearProgress,
} from "@mui/material";
import { CloseRounded, CheckCircle } from "@mui/icons-material";
import DividerH from "@/universalComponents/DividerH";
import { getNumberOfTracksFromBaseEventId } from "@/api_functions/getNumberOfTracksFromBaseEventId";
import PerformerTicketSubmitAudioPaper from "@desk/performer_dj_promoter/performer/PerformerTicketSubmitAudioPaper";
import { getSubmittedAudioForPerformerFromId } from "@/api_functions/getSubmittedAudioForPerformerFromId";
import { SubmittedAudioType } from "@/UniversalTypes";
import { useDispatch } from "react-redux";
import { setAddNewAudioToEvent } from "@/store/performerAddNewAudioToEventSlice";
import PerformerAddNewAudioToEventModal from "@desk/performer_dj_promoter/performer/PerformerAddNewAudioToEventModal";
import { setSelectFromExisting } from "@/store/performerSelectFromExistingModalSlice";
import PerformerSelectFromExistingModal from "@desk/performer_dj_promoter/performer/PerformerSelectFromExistingModal";
import {
	getPerformerProfileAudioKeys,
	PerformerRoleAudioKeys,
} from "@/api_functions/getPerformerProfileAudioKeys";
import {
	formatMMSS,
	timeStringToSeconds,
} from "@/generic_functions/time_formaters";
import { checkInPerformerWithManualWalkinUuid } from "@/api_functions/checkInPerformerWithManualWalkinUuid";

interface AddWalkinDataModalProps {
	specificEventId: number;
	uuidCode: string;
	phoneNumber: string;
}

function AddWalkinDataModal({
	specificEventId,
	uuidCode,
	phoneNumber,
}: AddWalkinDataModalProps) {
	const router = useRouter();
	const dispatch = useDispatch();
	const searchParams = useSearchParams();

	const roleIdFromSearch = searchParams.get("performer_role_id");

	const [performersExistingAudioKeys, setPerformersExistingAudioKeys] =
		useState<PerformerRoleAudioKeys>([]);
	const [isInit, setIsInit] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [timePerPerformer, setTimePerPerformer] = useState("");
	const [tracksPerPerformer, setTracksPerPerformer] = useState(0);
	const [submittedAudio, setSubmittedAudio] =
		useState<SubmittedAudioType | null>();

	function closeModal() {
		if (!isInit) {
			router.push(`/promoter/manage_event/${specificEventId}`);
		}
	}

	async function init() {
		if (roleIdFromSearch) {
			await getPerformerProfileAudioKeys(roleIdFromSearch).then((response) => {
				setPerformersExistingAudioKeys(response);
			});
			await getSubmittedAudioForPerformerFromId({
				requestPerformerId: roleIdFromSearch,
				requestSpecificEventId: specificEventId.toString(),
			}).then((response) => {
				console.log("response", response);
				setSubmittedAudio(response);
			});
		} else {
			console.log("no role id from search");
		}
		await getNumberOfTracksFromBaseEventId(specificEventId.toString()).then(
			(response) => {
				if (response) {
					setTracksPerPerformer(response.songs_per_performer);
					setTimePerPerformer(response.time_per_performer);
				}
			}
		);
		setIsInit(false);
	}

	useEffect(() => {
		init();
	}, []);

	function computeTotalSubmittedAudioTimeFromSubmittedAudio(): number {
		if (submittedAudio) {
			let total = 0;
			Object.values(submittedAudio).forEach((audio) => {
				total += audio.length;
			});
			return total;
		} else {
			return 0;
		}
	}

	function handleSetSelectFromSongOpen(index: number) {
		if (submittedAudio) {
			dispatch(
				setSelectFromExisting({
					selectFromSongOpen: index,
					specificEventId: specificEventId,
					currentSongLength: submittedAudio[index]?.length,
					totalAudioLength: computeTotalSubmittedAudioTimeFromSubmittedAudio(),
					allowedLength: Number(timePerPerformer),
				})
			);
		} else {
			console.log("no submitted audio");
		}
	}

	function handleAddNewOpen(index: number) {
		dispatch(
			setAddNewAudioToEvent({
				addNewOpen: index,
				specificEventId: specificEventId,
			})
		);
	}

	const usedTime = formatMMSS(
		computeTotalSubmittedAudioTimeFromSubmittedAudio()
	);

	const parsedAllowedTime = formatMMSS(Number(timePerPerformer));

	async function handleCheckInPerformer() {
		if (roleIdFromSearch) {
			setIsLoading(true);
			await checkInPerformerWithManualWalkinUuid({
				requestUUID: uuidCode,
				requestPerformerId: roleIdFromSearch,
				requestSpecificEventId: specificEventId.toString(),
			}).then((response) => {
				if (response) {
					router.push(`/promoter/manage_event/${specificEventId}`);
				} else {
					setIsLoading(false);
				}
			});
		} else {
			console.log("no role id from search");
		}
	}

	const noAudioSubmitted = submittedAudio
		? Object.values(submittedAudio).length === 0
			? true
			: false
		: true;

	return (
		<>
			<PerformerAddNewAudioToEventModal
				performerIdFromProps={roleIdFromSearch ? Number(roleIdFromSearch) : 0}
				refreshAudio={() => init()}
			/>
			<PerformerSelectFromExistingModal
				performerIdFromInput={roleIdFromSearch ? Number(roleIdFromSearch) : 0}
				refreshAudio={() => init()}
				audioKeysFromInput={performersExistingAudioKeys}
			/>
			<div className={styles.modal_main_div}>
				<div className={styles.add_data_modal_paper}>
					<div className={styles.add_performer_header}>
						Performer Audio
						<IconButton
							disabled={isLoading}
							sx={{
								position: "absolute",
								right: "5px",
								top: "5px",
								height: "40px",
								width: "40px",
							}}
							onClick={closeModal}>
							<CloseRounded
								sx={{
									height: "35px",
									width: "35px",
								}}
							/>
						</IconButton>
					</div>
					<DividerH />
					<div className={styles.modal_below_header}>
						{isInit ? (
							<CircularProgress />
						) : (
							<>
								<div className={styles.audio_time_div}>
									<div className={styles.secondary_text}>Allowed Time:</div>
									<div className={styles.primary_text}>{parsedAllowedTime}</div>
									<div className={styles.secondary_text}>/ Time Used:</div>
									<div className={styles.primary_text}>{usedTime}</div>
								</div>
								<div className={styles.audio_div}>
									{Array.from({ length: tracksPerPerformer }, (_, index) => (
										<PerformerTicketSubmitAudioPaper
											disabled={isLoading}
											hasNoAudioToPickFrom={
												performersExistingAudioKeys
													? performersExistingAudioKeys.length === 0
													: true
											}
											setSelectFromSongOpen={() =>
												handleSetSelectFromSongOpen(index + 1)
											}
											setAddNewOpen={() => handleAddNewOpen(index + 1)}
											key={index + 1}
											trackNumber={String(index + 1)}
											payload={
												submittedAudio ? submittedAudio[index + 1] : null
											}
										/>
									))}
								</div>
								<div className={styles.audio_submit_modal_button_div}>
									<Button
										onClick={handleCheckInPerformer}
										startIcon={<CheckCircle />}
										sx={{
											marginRight: "5px",
											position: "relative",
											overflow: "hidden",
										}}
										variant="outlined"
										color="success"
										disabled={isLoading || noAudioSubmitted}>
										Check-In Performer
										{isLoading ? (
											<LinearProgress
												color="success"
												sx={{
													position: "absolute",
													bottom: "0px",
													width: "100%",
												}}
											/>
										) : null}
									</Button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default AddWalkinDataModal;
