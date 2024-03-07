/** @format */

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import {
	IconButton,
	CircularProgress,
	Button,
	LinearProgress,
} from "@mui/material";
import DividerH from "@/universalComponents/DividerH";
import { CloseRounded, CheckCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import { formatMMSS } from "@/generic_functions/time_formaters";
import {
	getPerformerProfileAudioKeys,
	PerformerRoleAudioKeys,
} from "@/api_functions/getPerformerProfileAudioKeys";
import { getNumberOfTracksFromBaseEventId } from "@/api_functions/getNumberOfTracksFromBaseEventId";
import { SubmittedAudioType } from "@/UniversalTypes";
import { getSubmittedAudioForPerformerFromId } from "@/api_functions/getSubmittedAudioForPerformerFromId";
import { setSelectFromExisting } from "@/store/performerSelectFromExistingModalSlice";
import { setAddNewAudioToEvent } from "@/store/performerAddNewAudioToEventSlice";
import PerformerSelectFromExistingModal from "@desk/performer_dj_promoter/performer/PerformerSelectFromExistingModal";
import PerformerAddNewAudioToEventModal from "@desk/performer_dj_promoter/performer/PerformerAddNewAudioToEventModal";
import PerformerTicketSubmitAudioPaper from "@desk/performer_dj_promoter/performer/PerformerTicketSubmitAudioPaper";

interface ChangeAudioModalProps {
	close: () => void;
	specificEventId: number;
	performerId: number;
	performerName: string;
}

function ChangeAudioModal({
	close,
	specificEventId,
	performerId,
	performerName,
}: ChangeAudioModalProps) {
	const dispatch = useDispatch();

	const djRoleId = useSelector(
		(state: RootState) => state.PromoterManageEventState.event.dj.dj_id
	);

	const [performersExistingAudioKeys, setPerformersExistingAudioKeys] =
		useState<PerformerRoleAudioKeys>([]);
	const [isInit, setIsInit] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [timePerPerformer, setTimePerPerformer] = useState("");
	const [tracksPerPerformer, setTracksPerPerformer] = useState(0);
	const [submittedAudio, setSubmittedAudio] =
		useState<SubmittedAudioType | null>();

	async function init() {
		await getPerformerProfileAudioKeys(performerId.toString()).then(
			(response) => {
				setPerformersExistingAudioKeys(response);
			}
		);
		await getSubmittedAudioForPerformerFromId({
			requestPerformerId: performerId.toString(),
			requestSpecificEventId: specificEventId.toString(),
		}).then((response) => {
			console.log("response", response);
			setSubmittedAudio(response);
		});
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
		close();
	}

	const noAudioSubmitted = submittedAudio
		? Object.values(submittedAudio).length === 0
			? true
			: false
		: true;
	return (
		<>
			<PerformerAddNewAudioToEventModal
				djRoleIdForPerformerSocket={djRoleId.toString()}
				performerIdFromProps={performerId}
				refreshAudio={() => init()}
			/>
			<PerformerSelectFromExistingModal
				performerIdFromInput={performerId}
				refreshAudio={() => init()}
				audioKeysFromInput={performersExistingAudioKeys}
				djRoleIdForPerformerSocket={djRoleId.toString()}
			/>
			<div className={styles.modal_main_div} onClick={close}>
				<div
					className={styles.change_audio_modal_paper}
					onClick={(e) => e.stopPropagation()}>
					<div className={styles.add_performer_header}>
						Change Audio For{" "}
						<div className={styles.primary_perforer_name}>{performerName}</div>
						<IconButton
							disabled={isLoading}
							sx={{
								position: "absolute",
								right: "5px",
								top: "5px",
								height: "40px",
								width: "40px",
							}}
							onClick={close}>
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
										disabled={isLoading || noAudioSubmitted}>
										done
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

export default ChangeAudioModal;
