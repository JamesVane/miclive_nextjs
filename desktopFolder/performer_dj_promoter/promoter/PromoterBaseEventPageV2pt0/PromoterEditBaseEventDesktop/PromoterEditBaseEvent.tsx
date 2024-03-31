/** @format */

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Button, IconButton } from "@mui/material";
import { ArrowBackIosRounded, CloseRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import EditBaseEventMobile from "./EditBaseEventDesktop";
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
import { RootState } from "@/app/LocalizationProviderHelper";
import { editBaseEvent } from "@/api_functions/putEditBaseEvent";
import { postUploadS3Image } from "@/api_functions_need_to_add_auth/postUploadS3Image";
import SplashPage from "@/SplashPage";
import EditSnacksDesktop from "./EditSnacksDesktop";
import EditBaseEventDescription from "./EditBaseEventDescription";
import { putEditBaseEventDescription } from "@/api_functions/putEditBaseEventDescription";
import { getPromoterEventPageDataV2pt0 } from "@/api_functions/getPromoterEventPageDataV2pt0";
import { setPageData } from "@/store/PromoterEventPageV2pt0Slice";
import DividerH from "@/universalComponents/DividerH";
import EditBaseEventBanner from "./EditBaseEventBanner";
import { updateBaseEventImageArray } from "@/api_functions/updateBaseEventImageArray";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface PromoterEditBaseEventProps {
	handleCloseModal: () => void;
	baseEventId: number;
}

function PromoterEditBaseEvent({
	handleCloseModal,
	baseEventId,
}: PromoterEditBaseEventProps) {
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

	const { event_data: EventDataObject } = useSelector(
		(state: RootState) => state.PromoterEventPageV2pt0Slice
	);

	useEffect(() => {
		if (_.isEqual(mountedState, defaultMountedState)) {
			setMountedState({
				name: EventDataObject.event_name,
				tagline: EventDataObject.event_tagline,
			});
		}
	}, []);

	const editState = useSelector((state: RootState) => state.promoterEditEvent);

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
		marginTop: "20px",
	};

	function handleBack() {
		if (selectedPath !== "none") {
			setSelectedPath("none");
			dispatch(setToDefault());
		}
	}

	async function updateState({ isForBase }: { isForBase: boolean }) {
		if (isForBase) {
			router.push(
				`/promoter/event/${editState.baseEvent.name.trim().toLowerCase()}`
			);
		}
		getPromoterEventPageDataV2pt0(
			isForBase
				? editState.baseEvent.name.trim().toLowerCase()
				: EventDataObject.event_name.trim().toLowerCase()
		).then((data) => {
			if (data) {
				dispatch(setPageData(data));
			}
		});
	}

	async function updateBaseEventImage() {
		postUploadS3Image(
			editState.baseEvent.imageFile,
			`event_pictures/event_${editState.baseEventId}.jpg`
		);
	}

	const basePayload = {
		baseEventId: baseEventId,
		baseEvent: {
			name: EventDataObject.event_name,
			tagline: EventDataObject.event_tagline,
			imageFile: null,
		},
	};

	async function updateBaseEventInfo() {
		let returnData = "";
		if (editState.baseEventId) {
			await editBaseEvent({
				query_name: editState.baseEvent.name,
				query_tagline: editState.baseEvent.tagline,
				query_base_event_id: editState.baseEventId,
			}).then((res: any) => {
				returnData = res.message;
			});
		} else {
			console.log("ERROR, baseEventId is undefined");
			return "error";
		}
		return returnData;
	}

	function updateBaseEvent() {
		setIsUploading(true);
		if (
			!_.isEqual(mountedState, sliceInfo) &&
			!_.isEqual(mountedState, defaultMountedState)
		) {
			updateBaseEventInfo().then(async (res) => {
				console.log("res", res);
				if (res === "An event with the same name already exists.") {
					console.log("an event with this name already exists");
				} else {
					updateState({ isForBase: true });
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
				setEditedBaseMessage(true);
			}
		}
	}

	const baseDescriptionPayload = {
		baseEventId: baseEventId,
		baseDescription: EventDataObject.event_description,
	};

	function updateDescription(returnArray: string[]) {
		setIsUploading(true);
		try {
			updateBaseEventImageArray(baseEventId.toString(), returnArray);
			if (editState.baseDescription && editState.baseDescription) {
				putEditBaseEventDescription(
					baseEventId,
					editState.baseDescription
				).then((res) => {
					updateState({ isForBase: false }).then((res) => {
						setIsUploading(false);
						dispatch(setToDefault());
						setSelectedPath("none");
						setEditedDescriptionMessage(true);
					});
				});
			} else {
				console.log("no edit satate");
			}
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

	function handleCloseModalClick() {
		dispatch(setToDefault());
		handleCloseModal();
	}
	function openEditBanner() {
		dispatch(setToDefault());
		setSelectedPath("banner");
		dispatch(setExistingBanners());
	}

	return (
		<>
			<>
				<EditSnacksDesktop
					editedBaseMessage={editedBaseMessage}
					editedSpecificMessage={editedSpecificMessage}
					editedDescriptionMessage={editedDescriptionMessage}
					setEditedBaseMessage={setEditedBaseMessage}
					setEditedSpecificMessage={setEditedSpecificMessage}
					setEditedDescriptionMessage={setEditedDescriptionMessage}
				/>

				<div
					className={styles.desktop_main_div}
					onClick={() => {
						if (selectedPath === "none") {
							handleCloseModalClick();
						}
					}}>
					<div
						className={styles.desktop_main_paper}
						style={{ width: selectedPath === "banner" ? "700px" : "500px" }}
						onClick={(e) => e.stopPropagation()}>
						{isUploading ? (
							<SplashPage />
						) : (
							<>
								{selectedPath === "banner" ? null : (
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
												onClick={handleCloseModalClick}
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
											: selectedPath === "base"
											? "Edit Event Info"
											: selectedPath === "baseDescription"
											? "Edit Event Description"
											: ""}
									</div>
								)}

								{selectedPath === "none" ? (
									<>
										<DividerH />
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
										exit={handleBack}
										updateBaseEvent={updateBaseEvent}
										CropSelectstate={CropSelectstate}
										setCropSelectState={setCropSelectState}
									/>
								) : selectedPath === "baseDescription" ? (
									<EditBaseEventDescription
										exit={handleBack}
										updateDescription={updateDescription}
									/>
								) : selectedPath === "banner" ? (
									<EditBaseEventBanner handleExit={handleBack} />
								) : (
									<></>
								)}
							</>
						)}
					</div>
				</div>
			</>
		</>
	);
}

export default PromoterEditBaseEvent;
