/** @format */
import { useState } from "react";
import styles from "./styles.module.css";
import { Button, ButtonBase, LinearProgress } from "@mui/material";
import AvatarSimpleMobile from "@mobi/small_components/AvatarSimpleMobile";
import {
	AlbumRounded,
	RemoveCircleOutlineRounded,
	CloseRounded,
} from "@mui/icons-material";
import { DJType } from "@/store/PromoterEventPageV2pt0Slice";
import { useDispatch } from "react-redux";
import { deleteRemoveDjFromBaseEvent } from "@/api_functions/deleteRemoveDj";
import { setRemoveEventDj } from "@/store/PromoterEventPageV2pt0Slice";
import { deleteRemoveDjFromSpecificEvent } from "@/api_functions/deleteRemoveDj";
import { setRemoveDj } from "@/store/promoterDateInfoV2pt0Slice";

interface EventDjCardProps {
	djObj: DJType;
	baseEventId: string;
	isForBaseEvent?: boolean;
	specificEventid?: string;
}

function EventDjCard({
	djObj,
	baseEventId,
	isForBaseEvent,
	specificEventid,
}: EventDjCardProps) {
	const dispatch = useDispatch();

	const [confirmOpen, setConfirmOpen] = useState(false);
	const [deletingInProgress, setDeletingInProgress] = useState(false);

	async function removeDjBaseEvent() {
		if (djObj) {
			setDeletingInProgress(true);
			deleteRemoveDjFromBaseEvent({
				request_base_event_id: baseEventId,
				request_dj_id: djObj?.dj_id.toString(),
			}).then((response) => {
				dispatch(setRemoveEventDj());
				setDeletingInProgress(false);
				setConfirmOpen(false);
			});
		}
	}

	async function removeDjSpecificEvent() {
		if (specificEventid && djObj) {
			setDeletingInProgress(true);
			deleteRemoveDjFromSpecificEvent({
				request_base_event_id: baseEventId,
				request_specific_event_id: specificEventid,
				request_dj_id: djObj.dj_id.toString(),
			}).then((response) => {
				dispatch(setRemoveDj());
				setDeletingInProgress(false);
				setConfirmOpen(false);
			});
		}
	}

	function handleClickRemoveButton() {
		if (isForBaseEvent) {
			removeDjBaseEvent();
		} else {
			removeDjSpecificEvent();
		}
	}

	return (
		<>
			{true ? (
				<div className={styles.main_div}>
					<div
						className={styles.paper_container}
						style={{
							width: "calc(100% - 70px)",
						}}>
						{confirmOpen ? (
							<div className={styles.confirm_div}>
								<div className={styles.confirm_top}>
									{isForBaseEvent
										? "Remove DJ As Event DJ?"
										: "Remove DJ As Date DJ"}
								</div>
								<div className={styles.confirm_bottom}>
									<Button
										size="small"
										disabled={deletingInProgress}
										onClick={() => setConfirmOpen(false)}
										startIcon={<CloseRounded />}
										color="secondary"
										variant="outlined"
										sx={{ marginRight: "5px" }}>
										cancel
									</Button>
									<Button
										size="small"
										onClick={handleClickRemoveButton}
										disabled={deletingInProgress}
										startIcon={<RemoveCircleOutlineRounded />}
										color="error"
										variant="outlined"
										sx={{ marginLeft: "5px" }}>
										remove
									</Button>
								</div>
								{deletingInProgress ? (
									<LinearProgress
										color="error"
										sx={{ position: "absolute", bottom: "0px", width: "100%" }}
									/>
								) : null}
							</div>
						) : (
							<ButtonBase className={styles.dj_paper}>
								<div
									className={styles.dj_pic}
									style={{
										width: "70px",
										height: "70px",
									}}>
									<AvatarSimpleMobile
										username={djObj.dj_name}
										type="dj"
										id={djObj.dj_id}
										ninety
									/>
									<div
										className={styles.dj_icon_avatar}
										style={{
											width: "25px",
											height: "25px",
										}}>
										<AlbumRounded
											sx={{
												height: "20px",
												width: "20px",
												color: "#888661ff",
											}}
										/>
									</div>
								</div>
								<div
									className={styles.dj_right}
									style={{
										width: "calc(100% - 70px)",
									}}>
									<div
										className={styles.primary_dj_name}
										style={{
											fontSize: "23px",
										}}>
										{djObj.dj_name}
									</div>
									<div
										className={styles.event_dj_label}
										style={{
											fontSize: "16px",
										}}>
										Primary Event Dj
									</div>
								</div>
							</ButtonBase>
						)}
					</div>
					<div
						className={styles.change_button}
						style={{
							height: "80px",
							width: "80px",
						}}>
						{confirmOpen ? null : (
							<Button
								onClick={() => setConfirmOpen(true)}
								variant="outlined"
								sx={{
									height: "calc(100% - 10px)",
									width: "calc(100% - 10px)",
									fontSize: "14px",
								}}>
								remove dj
							</Button>
						)}
					</div>
				</div>
			) : null}
		</>
	);
}

export default EventDjCard;
