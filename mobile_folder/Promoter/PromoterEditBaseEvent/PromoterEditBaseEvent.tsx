/** @format */
"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Paper, Button, Divider } from "@mui/material";
import { ArrowBackIosRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import EditBaseEventMobile from "./EditBaseEventMobile";
import { Crop } from "react-image-crop";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
	setToDefault,
	setExistingBase,
	setImageDisplayHelp,
	setExistingBaseDescription,
	setExistingBanners,
} from "@/store/promoterEditEventSlice";
import { RootState } from "@/store/rootStore";
import { editBaseEvent } from "@/api_functions/putEditBaseEvent";
import { setSrc } from "@/store/imgStore";
import { getSignedUrl } from "@/api_functions/getAnySignedUrl";
import { imgRequestQueue } from "@/utilityFunctions/requestQueue";
import { postUploadS3Image } from "@/api_functions/postUploadS3Image";
import SplashPage from "@/SplashPage";
import EditSnacksMobile from "../EditSnacksMobile";
import EditBaseEventDescription from "./EditBaseEventDescription";
import { putEditBaseEventDescription } from "@/api_functions/putEditBaseEventDescription";
import { setPageData } from "@/store/PromoterEventPageV2pt0Slice";
import { getPromoterEventPageDataV2pt0 } from "@/api_functions/getPromoterEventPageDataV2pt0";
import EditBaseEventBannerMobile from "./EditBaseEventBannerMobile";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

function PromoterEditBaseEvent() {
	const dispatch = useDispatch();
	const router = useRouter();

	const defaultCropSelectState = {
		src: null,
		crop: {
			x: 0,
			y: 0,
			width: 150,
			height: 150,
			aspect: 1,
			unit: "px",
			minWidth: 10,
			minHeight: 10,
			maxWidth: 500,
			maxHeight: 500,
		} as Crop,
		croppedImageUrl: null,
	};

	const defaultMountedState = {
		name: "",
		tagline: "",
	};

	const [CropSelectstate, setCropSelectState] = useState<State>(
		defaultCropSelectState
	);
	const [isUploading, setIsUploading] = useState(false);
	const [mountedState, setMountedState] = useState(defaultMountedState);
	const [editedBaseMessage, setEditedBaseMessage] = useState(false);
	const [editedSpecificMessage, setEditedSpecificMessage] = useState(false);
	const [editedDescriptionMessage, setEditedDescriptionMessage] =
		useState(false);

	const editState = useSelector((state: RootState) => state.promoterEditEvent);

	const baseEventState = useSelector(
		(state: RootState) => state.PromoterEventPageV2pt0Slice.event_data
	);

	const [selectedPath, setSelectedPath] = useState<
		"base" | "none" | "baseDescription" | "banner"
	>("none");

	const sliceInfo = {
		name: editState.baseEvent.name,
		tagline: editState.baseEvent.tagline,
	};

	const selectorButtonStyles = {
		width: "90%",
		height: "100px",
		fontSize: "25px",
		marginTop: "15px",
	};

	function handleBack() {
		if (selectedPath === "none") {
			router.push(`/m/promoter/event/${baseEventState.event_name}`);
		} else {
			setSelectedPath("none");
			dispatch(setToDefault());
		}
	}

	async function updateState() {
		router.push(`/m/promoter/event/${baseEventState.event_name}`);
		getPromoterEventPageDataV2pt0(editState.baseEvent.name).then((data) => {
			if (data) {
				dispatch(setPageData(data));
			}
		});
	}

	async function updateBaseEventImage() {
		postUploadS3Image(
			editState.baseEvent.imageFile,
			`event_pictures/event_${editState.baseEventId}.jpg`
		).then((res: any) => {
			if (res.data.message == "Image uploaded successfully") {
				imgRequestQueue.add(async () => {
					try {
						const baseEventId = editState.baseEventId!;
						const signedUrl = await getSignedUrl(
							"event",
							baseEventId.toString()
						);
						if (signedUrl) {
							dispatch(
								setSrc({
									type: "event",
									id: baseEventId.toString(),
									url: signedUrl,
								})
							);
						}
					} catch (error) {
						console.error("Error fetching signed URL:", error);
					}
				});
			}
		});
	}

	const basePayload = {
		baseEventId: baseEventState.base_event_id,
		baseEvent: {
			name: baseEventState.event_name,
			tagline: baseEventState.event_tagline,
			imageFile: null,
		},
	};

	async function updateBaseEventInfo() {
		if (editState.baseEventId) {
			await editBaseEvent({
				query_name: editState.baseEvent.name,
				query_tagline: editState.baseEvent.tagline,
				query_base_event_id: editState.baseEventId,
			}).then((res: any) => {
				return "completed";
			});
		} else {
			console.log("ERROR, baseEventId is undefined");
			return "error";
		}
	}

	function updateBaseEvent() {
		setIsUploading(true);
		if (
			!_.isEqual(mountedState, sliceInfo) &&
			!_.isEqual(mountedState, defaultMountedState)
		) {
			updateBaseEventInfo().then(async (res) => {
				updateState();
				if (editState.baseEvent.imageFile !== null) {
					updateBaseEventImage().then((res) => {
						setIsUploading(false);
						dispatch(setToDefault());
						setSelectedPath("none");
						setEditedBaseMessage(true);
					});
				} else {
					setIsUploading(false);
					dispatch(setToDefault());
					setSelectedPath("none");
					setEditedBaseMessage(true);
				}
			});
		} else {
			if (editState.baseEvent.imageFile !== null) {
				updateBaseEventImage().then((res) => {
					setIsUploading(false);
					dispatch(setToDefault());
					setSelectedPath("none");
					setEditedBaseMessage(true);
				});
			} else {
				setIsUploading(false);
				dispatch(setToDefault());
				setSelectedPath("none");
			}
		}
	}

	const baseDescriptionPayload = {
		baseEventId: baseEventState.base_event_id,
		baseDescription: baseEventState.event_description,
		image_array: baseEventState.image_array,
	};

	function updateDescription() {
		setIsUploading(true);
		console.log("editState.description", editState.baseDescription);
		try {
			putEditBaseEventDescription(
				baseEventState.base_event_id,
				editState.baseDescription.description
					? editState.baseDescription.description
					: ""
			).then((res) => {
				updateState().then((res) => {
					setIsUploading(false);
					dispatch(setToDefault());
					setSelectedPath("none");
					setEditedDescriptionMessage(true);
				});
			});
		} catch (error) {
			console.log(error);
			setIsUploading(false);
		}
	}

	function openBaseEdit() {
		setCropSelectState(defaultCropSelectState);
		dispatch(setToDefault());
		dispatch(
			setImageDisplayHelp({
				key: "imageSelected",
				value: false,
			})
		);
		dispatch(setExistingBase(basePayload));
		setSelectedPath("base");
	}
	function openDescEdit() {
		dispatch(setToDefault());
		setSelectedPath("baseDescription");
		dispatch(setExistingBaseDescription(baseDescriptionPayload));
	}
	function handleEdit() {
		dispatch(setToDefault());
		setSelectedPath("none");
	}
	function openEditBanner() {
		dispatch(setToDefault());
		setSelectedPath("banner");
		dispatch(setExistingBanners());
	}

	const [page, setPage] = useState<1 | 2>(1);

	useEffect(() => {
		if (_.isEqual(mountedState, defaultMountedState)) {
			setMountedState({
				name: baseEventState.event_name,
				tagline: baseEventState.event_tagline,
			});
		}
	}, []);

	function handleFinishBanners() {
		dispatch(setToDefault());
		setSelectedPath("none");
		setEditedBaseMessage(true);
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
						{selectedPath === "none"
							? baseEventState.event_name
							: selectedPath === "base"
							? "Edit Event Info"
							: selectedPath === "baseDescription"
							? "Edit Event Description"
							: selectedPath === "banner"
							? page === 1
								? "Large Banner"
								: "Small Banner"
							: ""}
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
										onClick={openBaseEdit}>
										tagline name & picture
									</Button>
									<Button
										variant="outlined"
										size="large"
										sx={selectorButtonStyles}
										onClick={openDescEdit}>
										event description
									</Button>
									<Button
										variant="outlined"
										size="large"
										sx={selectorButtonStyles}
										onClick={openEditBanner}>
										event banner
									</Button>
								</div>
							</>
						) : selectedPath === "base" ? (
							<EditBaseEventMobile
								exit={handleEdit}
								updateBaseEvent={updateBaseEvent}
								CropSelectstate={CropSelectstate}
								setCropSelectState={setCropSelectState}
							/>
						) : selectedPath === "baseDescription" ? (
							<EditBaseEventDescription
								exit={handleEdit}
								updateDescription={updateDescription}
							/>
						) : selectedPath === "banner" ? (
							<EditBaseEventBannerMobile
								handleExit={handleFinishBanners}
								page={page}
								setPage={setPage}
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

export default PromoterEditBaseEvent;
