/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploadCrop from "@desk/ImageComponents/ImageUploadCrop/ImageUploadCrop";
import { Button, TextField, Avatar, Divider } from "@mui/material";
import styles from "./styles.module.css";
import {
	CheckRounded,
	CloseRounded,
	ArrowForwardIosRounded,
	ChangeCircleRounded,
} from "@mui/icons-material";
import { RootState } from "@/app/LocalizationProviderHelper";
import {
	setBaseEvent,
	switchPage,
	setImageDisplayHelp,
} from "@/store/promoterCreateEventSlice";
import CreateEventCrumbs from "./CreateEventCrumbs";
import CreateHeader from "./CreateHeader";

function CreateBaseEvent() {
	const dispatch = useDispatch();
	const { baseEvent, imageDisplayHelp } = useSelector(
		(state: RootState) => state.promoterCreateEvent
	);

	const imageSelected = imageDisplayHelp.imageSelected;
	const displayName = imageDisplayHelp.displayName;
	const displayURL = imageDisplayHelp.displayURL;
	const confirmImage = imageDisplayHelp.confirmImage;
	const [refreshUploader, setRefreshUploader] = useState(false);

	function setName(e: React.ChangeEvent<HTMLInputElement>) {
		let payload = e.target.value;
		payload = payload.replace(/\s+/g, " ");
		if (payload.length < 30 && !payload.includes("<")) {
			dispatch(setBaseEvent({ key: "name", value: payload }));
		}
	}
	function setTagline(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.value.includes("<")) {
			dispatch(setBaseEvent({ key: "tagline", value: e.target.value }));
		}
	}

	const handleCroppedImage = (croppedImageUrl: string) => {
		dispatch(setBaseEvent({ key: "imageFile", value: croppedImageUrl }));
	};

	function selectDifferentHandle() {
		dispatch(setImageDisplayHelp({ key: "imageSelected", value: false }));
		dispatch(setImageDisplayHelp({ key: "displayName", value: null }));
		dispatch(setImageDisplayHelp({ key: "displayURL", value: null }));
		dispatch(setBaseEvent({ key: "imageFile", value: null }));
		dispatch(setImageDisplayHelp({ key: "confirmImage", value: false }));
	}

	useEffect(() => {
		if (refreshUploader) {
			setRefreshUploader(false);
		}
	}, [refreshUploader]);
	const notAllRequiredFieldsFilled =
		baseEvent.name.length < 4 || baseEvent.tagline.length < 4 || !confirmImage;

	return (
		<div className={styles.base_event_paper}>
			<Button
				onClick={() => {
					dispatch(switchPage({ page: "Banner" }));
				}}
				disabled={notAllRequiredFieldsFilled}
				endIcon={<ArrowForwardIosRounded />}
				variant="outlined"
				sx={{ position: "absolute", right: 10, bottom: 10 }}>
				continue
			</Button>
			<CreateHeader>
				<div className={styles.header_primary}>Event</div>
				Information & Avatar
			</CreateHeader>
			<div className={styles.base_event_body_wrap}>
				<div className={styles.base_event_LRWrapper}>
					<TextField
						value={baseEvent.name}
						onChange={setName}
						label="Event Name"
						sx={{ width: "90%", marginBottom: "10px", marginTop: "20px" }}
					/>
					<TextField
						onChange={setTagline}
						value={baseEvent.tagline}
						label="Event Tagline"
						sx={{ width: "90%", marginBottom: "10px" }}
					/>
				</div>
				<div className={styles.divider_vert}>
					<Divider orientation="vertical" variant="middle" flexItem />
				</div>
				<div
					className={styles.base_event_LRWrapper}
					style={{ paddingBottom: "15px" }}>
					{!imageSelected || confirmImage ? (
						<div className={styles.event_image_title_box}>Event Avatar</div>
					) : null}
					{confirmImage ? (
						<div className={styles.selected_image_box}>
							<Avatar
								sx={{
									border: 1,
									borderColor: "primary.main",
									height: "150px",
									width: "150px",
									margin: "10px",
								}}>
								<img
									style={{ width: "100%", height: "100%" }}
									src={displayURL!}
								/>
							</Avatar>
							<div className={styles.filename_box}>
								<div className={styles.selected_avatar_namer_paper}>
									<div className={styles.elipses}>{displayName}</div>
								</div>
								<Button
									startIcon={<ChangeCircleRounded />}
									sx={{ marginTop: "10px", marginBottom: "5px" }}
									onClick={selectDifferentHandle}>
									Select Different Image
								</Button>
							</div>
						</div>
					) : (
						<>
							{!refreshUploader ? (
								<ImageUploadCrop
									imageSelected={imageSelected}
									setImageSelected={(value: boolean) =>
										dispatch(
											setImageDisplayHelp({
												key: "imageSelected",
												value: value,
											})
										)
									}
									onCroppedImage={handleCroppedImage}
									setDisplayURL={(value: string) =>
										dispatch(
											setImageDisplayHelp({ key: "displayURL", value: value })
										)
									}
									setDisplayName={(value: string) =>
										dispatch(
											setImageDisplayHelp({ key: "displayName", value: value })
										)
									}
								/>
							) : null}
							{imageSelected ? (
								<div style={{ marginBottom: "-5px", marginTop: "5px" }}>
									<Button
										startIcon={<CloseRounded />}
										sx={{ marginRight: "15px" }}
										variant="outlined"
										color="error"
										onClick={() => {
											setRefreshUploader(true);
											selectDifferentHandle();
										}}>
										Cancel
									</Button>
									<Button
										startIcon={<CheckRounded />}
										color="success"
										sx={{ marginLeft: "15px" }}
										variant="outlined"
										onClick={() =>
											dispatch(
												setImageDisplayHelp({
													key: "confirmImage",
													value: true,
												})
											)
										}>
										Select
									</Button>
								</div>
							) : null}
						</>
					)}
				</div>
			</div>
			<CreateEventCrumbs />
		</div>
	);
}

export default CreateBaseEvent;
