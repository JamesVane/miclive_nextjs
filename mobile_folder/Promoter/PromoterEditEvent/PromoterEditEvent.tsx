/** @format */
"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Paper, Button, Divider } from "@mui/material";
import { ArrowBackIosRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import EditEventDescriptionMobile from "./EditEventDescriptionMobile";
import EditSpecificEventMobile from "./EditSpecificEventMobile";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
	setToDefault,
	setExistingSpecific,
	setExistingDescription,
} from "@/store/promoterEditEventSlice";
import { RootState } from "@/app/LocalizationProviderHelper";
import SplashPage from "@/SplashPage";
import { putEditSpecificEventInfoContainer } from "@/api_functions/putEditSpecificEventInfo/putEditSpecificEventInfoContainer";
import { DateTime } from "luxon";
import { putUpdateEventDescription } from "@/api_functions/putEditSpecificDescription";
import EditSnacksMobile from "../EditSnacksMobile";
import { Auth } from "aws-amplify";
import { getPromoterDateModalDataV2pt0 } from "@/api_functions/getPromoterDateModalDataV2pt0";
import { setPromoterDateInfoV2pt0 } from "@/store/promoterDateInfoV2pt0Slice";
import { updateDateImageArray } from "@/api_functions/updateDateImageArray";

interface PromoterEditEventProps {
	eventNameFromParams: string;
}

function PromoterEditEvent({ eventNameFromParams }: PromoterEditEventProps) {
	const dispatch = useDispatch();
	const router = useRouter();

	const defaultMountedState = {
		name: "",
		tagline: "",
	};

	const [isUploading, setIsUploading] = useState(false);
	const [mountedState, setMountedState] = useState(defaultMountedState);
	const [editedBaseMessage, setEditedBaseMessage] = useState(false);
	const [editedSpecificMessage, setEditedSpecificMessage] = useState(false);
	const [editedDescriptionMessage, setEditedDescriptionMessage] =
		useState(false);
	const [dateErrorMessage, setDateErrorMessage] = useState("");

	useEffect(() => {
		setMountedState({
			name: editState.baseEvent.name,
			tagline: editState.baseEvent.tagline,
		});
	}, []);

	const editState = useSelector((state: RootState) => state.promoterEditEvent);

	const dateState = useSelector(
		(state: RootState) => state.promoterDateInfoV2pt0Slice
	);

	const [selectedPath, setSelectedPath] = useState<
		"specific" | "description" | "none"
	>("none");

	const selectorButtonStyles = {
		width: "90%",
		height: "100px",
		fontSize: "25px",
	};

	function handleBack() {
		if (selectedPath === "none") {
			router.push(
				`/promoter/event/${eventNameFromParams}/${dateState.specific_event_id}`
			);
		} else {
			setSelectedPath("none");
			dispatch(setToDefault());
		}
	}

	async function updateState() {
		getPromoterDateModalDataV2pt0(dateState.specific_event_id).then((data) => {
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
				Number(editState.specificEventId!),
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
		baseEventId: dateState.base_event_id,
		specificEventId: dateState.specific_event_id,
		specificEvent: {
			start_date: DateTime.fromSeconds(Number(dateState.start_time)).toISO(),
			start_time: DateTime.fromSeconds(
				Number(dateState.start_time)
			).toObject() as Record<
				"year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond",
				number
			>,
			end_time: DateTime.fromSeconds(
				Number(dateState.end_time)
			).toObject() as Record<
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
				Number(dateState.early_bird_end_time)
			).toISO(),
		},
	};

	const descriptionPayload = {
		baseEventId: dateState.base_event_id,
		specificEventId: dateState.specific_event_id,
		description: dateState.date_description,
	};

	function updateDescription(returnArray: string[]) {
		try {
			updateDateImageArray(dateState.specific_event_id.toString(), returnArray);
			if (editState.description && editState.description) {
				setIsUploading(true);
				putUpdateEventDescription(
					dateState.specific_event_id,
					editState.description
				).then((res) => {
					updateState().then((res) => {
						setIsUploading(false);
						dispatch(setToDefault());
						setSelectedPath("none");
						setEditedDescriptionMessage(true);
					});
				});
			}
		} catch (error) {
			console.log(error);
			setIsUploading(false);
		}
	}

	function openSpecificEdit() {
		dispatch(setToDefault());
		setSelectedPath("specific");
		dispatch(setExistingSpecific(specificPayload));
	}
	function openDescEdit() {
		dispatch(setToDefault());
		setSelectedPath("description");
		dispatch(setExistingDescription(descriptionPayload));
	}
	function handleEdit() {
		dispatch(setToDefault());
		setSelectedPath("none");
	}

	return (
		<>
			{isUploading ? (
				<SplashPage />
			) : (
				<>
					<EditSnacksMobile
						editedBaseMessage={editedBaseMessage}
						editedSpecificMessage={editedSpecificMessage}
						editedDescriptionMessage={editedDescriptionMessage}
						setEditedBaseMessage={setEditedBaseMessage}
						setEditedSpecificMessage={setEditedSpecificMessage}
						setEditedDescriptionMessage={setEditedDescriptionMessage}
					/>
					<Paper square className={styles.header_div}>
						<Button
							onClick={handleBack}
							startIcon={<ArrowBackIosRounded />}
							color="secondary"
							size="small"
							sx={{ position: "absolute", left: "0px" }}>
							back
						</Button>
						{/* {selectedPath === "none"
							? selectedBaseEvent!.name
							: selectedPath === "specific"
							? "Edit Specific Event Info"
							: selectedPath === "description"
							? "Edit Event Description"
							: ""} */}
					</Paper>
					<div className={styles.main_div}>
						{selectedPath === "none" ? (
							<>
								<div className={styles.path_selector_title}>
									Select What To Edit:
								</div>
								<div className={styles.divider_div}>
									<Divider variant="middle" flexItem />
								</div>
								<div className={styles.button_selector_div}>
									<Button
										variant="outlined"
										size="large"
										sx={selectorButtonStyles}
										onClick={openSpecificEdit}>
										edit specific event
									</Button>
									<Button
										variant="outlined"
										size="large"
										sx={selectorButtonStyles}
										onClick={openDescEdit}>
										edit event description
									</Button>
								</div>
							</>
						) : selectedPath === "specific" ? (
							<EditSpecificEventMobile
								exit={handleEdit}
								updateSpecificEventInfo={updateSpecificEventInfo}
								dateErrorMessage={dateErrorMessage}
								setDateErrorMessage={setDateErrorMessage}
							/>
						) : selectedPath === "description" ? (
							<EditEventDescriptionMobile
								exit={handleEdit}
								updateDescription={updateDescription}
							/>
						) : (
							<></>
						)}
					</div>
				</>
			)}
		</>
	);
}

export default PromoterEditEvent;
