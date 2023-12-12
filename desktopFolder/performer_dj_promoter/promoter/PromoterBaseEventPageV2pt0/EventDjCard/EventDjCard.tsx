/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import { Button, ButtonBase, LinearProgress } from "@mui/material";
import AvatarSimple from "@desk/AvatarSimple";
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
	small?: boolean;
	djObj: DJType | null;
	baseEventId: string;
	isForBaseEvent?: boolean;
	specificEventid?: string;
}

function EventDjCard({
	small,
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
			{djObj ? (
				<div className={styles.main_div}>
					<div
						className={styles.paper_container}
						style={{
							width: small ? "calc(100% - 80px)" : "calc(100% - 100px)",
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
										size={small ? "small" : "medium"}
										disabled={deletingInProgress}
										onClick={() => setConfirmOpen(false)}
										startIcon={<CloseRounded />}
										color="secondary"
										variant="outlined"
										sx={{ marginRight: "5px" }}>
										cancel
									</Button>
									<Button
										size={small ? "small" : "medium"}
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
										width: small ? "70px" : "90px",
										height: small ? "70px" : "90px",
									}}>
									<AvatarSimple type="dj" id={djObj.dj_id} ninety />
									<div
										className={styles.dj_icon_avatar}
										style={{
											width: small ? "25px" : "30px",
											height: small ? "25px" : "30px",
										}}>
										<AlbumRounded
											sx={{
												height: small ? "20px" : "25px",
												width: small ? "20px" : "25px",
												color: "#888661ff",
											}}
										/>
									</div>
								</div>
								<div
									className={styles.dj_right}
									style={{
										width: small ? "calc(100% - 70px)" : "calc(100% - 90px)",
									}}>
									<div
										className={styles.primary_dj_name}
										style={{
											fontSize: small ? "23px" : "30px",
										}}>
										{djObj.dj_name}
									</div>
									<div
										className={styles.event_dj_label}
										style={{
											fontSize: small ? "16px" : "18px",
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
							height: small ? "80px" : "100px",
							width: small ? "80px" : "100px",
						}}>
						{confirmOpen ? null : (
							<Button
								onClick={() => setConfirmOpen(true)}
								variant="outlined"
								sx={{
									height: "calc(100% - 10px)",
									width: "calc(100% - 10px)",
									fontSize: small ? "14px" : "16px",
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
