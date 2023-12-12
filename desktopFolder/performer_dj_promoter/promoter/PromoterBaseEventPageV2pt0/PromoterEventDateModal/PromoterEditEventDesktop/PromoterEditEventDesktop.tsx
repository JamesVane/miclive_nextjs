/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import { Button, Divider, IconButton } from "@mui/material";
import {
	ArrowBackIosRounded,
	CloseRounded,
	EditNoteRounded,
	EditCalendarRounded,
} from "@mui/icons-material";
import EditEventDescriptionDesktop from "./EditEventDescriptionDesktop";
import EditSpecificEventDesktop from "./EditSpecificEventDesktop";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
	setToDefault,
	setExistingSpecific,
	setExistingDescription,
} from "@/store/promoterEditEventSlice";
import { RootState } from "@/store/rootStore";
import SplashPage from "@/SplashPage";
import { putEditSpecificEventInfoContainer } from "@/api_functions/putEditSpecificEventInfo/putEditSpecificEventInfoContainer";
import { DateTime } from "luxon";
import { putUpdateEventDescription } from "@/api_functions/putEditSpecificDescription";
import EditSnacksDesktop from "./EditSnacksDesktop";
import { Auth } from "aws-amplify";
import { getPromoterDateModalDataV2pt0 } from "@/api_functions/getPromoterDateModalDataV2pt0";
import { setPromoterDateInfoV2pt0 } from "@/store/promoterDateInfoV2pt0Slice";

interface PromoterEditEventDesktopProps {
	handleCloseModal: () => void;
	baseEventId: number;
	specificEventId: number;
}

function PromoterEditEventDesktop({
	handleCloseModal,
	baseEventId,
	specificEventId,
}: PromoterEditEventDesktopProps) {
	const dispatch = useDispatch();

	const dateState = useSelector(
		(state: RootState) => state.promoterDateInfoV2pt0Slice
	);

	const [isUploading, setIsUploading] = useState(false);
	const [editedBaseMessage, setEditedBaseMessage] = useState(false);
	const [editedSpecificMessage, setEditedSpecificMessage] = useState(false);
	const [editedDescriptionMessage, setEditedDescriptionMessage] =
		useState(false);
	const [dateErrorMessage, setDateErrorMessage] = useState("");

	const editState = useSelector((state: RootState) => state.promoterEditEvent);

	const [selectedPath, setSelectedPath] = useState<
		"specific" | "description" | "none"
	>("none");

	const selectorButtonStyles = {
		width: "90%",
		height: "100px",
		fontSize: "25px",
	};

	function handleBack() {
		setSelectedPath("none");
		dispatch(setToDefault());
	}

	async function updateState() {
		getPromoterDateModalDataV2pt0(specificEventId).then((data) => {
			if (data) {
				dispatch(setPromoterDateInfoV2pt0(data));
			}
		});
	}

	async function updateSpecificEventInfo() {
		console.log("editstate", editState);
		setIsUploading(true);
		try {
			const user = await Auth.currentAuthenticatedUser();
			const roleId = user.attributes["custom:RoleId"];
			const numberPromoterId: number =
				typeof roleId === "string" ? Number(roleId) : roleId;
			putEditSpecificEventInfoContainer(
				specificEventId,
				numberPromoterId,
				editState.specificEvent
			).then((res) => {
				if (res.message === "Successfully updated specific_event!") {
					updateState().then((res) => {
						setIsUploading(false);
						setSelectedPath("none");
						setEditedSpecificMessage(true);
						dispatch(setToDefault());
					});
				} else if (res.message === "An event already exists on this date.") {
					setIsUploading(false);
					setDateErrorMessage(res);
				}
			});
		} catch (error) {
			console.log(error);
			setIsUploading(false);
			setSelectedPath("none");
		}
	}

	const specificPayload = {
		baseEventId: baseEventId,
		specificEventId: specificEventId,
		specificEvent: {
			start_date: DateTime.fromSeconds(dateState.start_time).toISO(),
			start_time: DateTime.fromSeconds(
				dateState.start_time
			).toObject() as Record<
				"year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond",
				number
			>,
			end_time: DateTime.fromSeconds(dateState.end_time).toObject() as Record<
				"year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond",
				number
			>,
			location: dateState.location,
			total_performers: dateState.total_performers,
			time_per_performer: dateState.time_per_performer,
			performer_track_limit: dateState.tracks_per_performer,
			total_ticket_amount: dateState.tickets_for_sale,
			regular_ticket_price: dateState.ticket_price,
			early_bird_ticket_price: dateState.early_bird_ticket_price,
			total_submitted: dateState.total_submitted,
			total_audio_time: dateState.total_audio_time,
			early_bird_end_time: DateTime.fromSeconds(
				dateState.early_bird_end_time
			).toISO(),
		},
	};

	const descriptionPayload = {
		baseEventId: baseEventId,
		specificEventId: specificEventId,
		description: dateState.date_description,
	};

	console.log(
		"dateState.start_time",
		DateTime.fromSeconds(dateState.start_time).toObject() as Record<
			"year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond",
			number
		>
	);

	function updateDescription() {
		if (editState.description) {
			setIsUploading(true);
			try {
				putUpdateEventDescription(specificEventId, editState.description).then(
					(res) => {
						updateState().then((res) => {
							setIsUploading(false);
							dispatch(setToDefault());
							setSelectedPath("none");
							setEditedDescriptionMessage(true);
						});
					}
				);
			} catch (error) {
				console.log(error);
				setIsUploading(false);
			}
		}
	}

	function openSpecificEdit() {
		dispatch(setToDefault());
		dispatch(setExistingSpecific(specificPayload));
		setSelectedPath("specific");
	}

	function openDescEdit() {
		dispatch(setToDefault());
		setSelectedPath("description");
		dispatch(setExistingDescription(descriptionPayload));
	}

	function handleClose() {
		if (!isUploading) {
			dispatch(setToDefault());
			handleCloseModal();
		}
	}

	return (
		<>
			<EditSnacksDesktop
				editedBaseMessage={editedBaseMessage}
				editedSpecificMessage={editedSpecificMessage}
				editedDescriptionMessage={editedDescriptionMessage}
				setEditedBaseMessage={setEditedBaseMessage}
				setEditedSpecificMessage={setEditedSpecificMessage}
				setEditedDescriptionMessage={setEditedDescriptionMessage}
			/>
			<div className={styles.desktop_main_div} /* onClick={handleClose} */>
				<div
					onClick={(e) => e.stopPropagation()}
					className={styles.desktop_main_paper}
					style={{
						width: selectedPath === "specific" ? "1000px" : "500px",
						height: selectedPath === "description" ? "800px" : "550px",
					}}>
					{isUploading ? (
						<SplashPage />
					) : (
						<>
							<div className={styles.header_div}>
								{selectedPath !== "none" ? (
									<Button
										onClick={handleBack}
										startIcon={<ArrowBackIosRounded />}
										color="secondary"
										sx={{ position: "absolute", left: "0px" }}>
										back
									</Button>
								) : (
									<IconButton
										onClick={handleClose}
										color="secondary"
										sx={{
											position: "absolute",
											right: "0px",
											top: "0px",
											height: "35px",
											width: "35px",
										}}>
										<CloseRounded sx={{ height: "30px", width: "30px" }} />
									</IconButton>
								)}
								{selectedPath === "none"
									? "Select What To Edit:"
									: selectedPath === "specific"
									? "Edit Date Info"
									: selectedPath === "description"
									? "Edit Date Description"
									: ""}
							</div>

							{selectedPath === "none" ? (
								<>
									<div className={styles.divider_div}>
										<Divider variant="middle" flexItem />
									</div>
									<div className={styles.button_selector_div}>
										<Button
											startIcon={
												<EditCalendarRounded
													sx={{ height: "25px", width: "25px" }}
												/>
											}
											variant="outlined"
											size="large"
											sx={selectorButtonStyles}
											onClick={openSpecificEdit}>
											edit date info
										</Button>
										<Button
											startIcon={
												<EditNoteRounded
													sx={{ height: "35px", width: "35px" }}
												/>
											}
											variant="outlined"
											size="large"
											sx={selectorButtonStyles}
											onClick={openDescEdit}>
											edit date description
										</Button>
									</div>
								</>
							) : selectedPath === "specific" ? (
								<EditSpecificEventDesktop
									exit={handleBack}
									updateSpecificEventInfo={updateSpecificEventInfo}
									dateErrorMessage={dateErrorMessage}
									setDateErrorMessage={setDateErrorMessage}
								/>
							) : selectedPath === "description" ? (
								<EditEventDescriptionDesktop
									exit={handleBack}
									updateDescription={updateDescription}
								/>
							) : (
								<></>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default PromoterEditEventDesktop;
