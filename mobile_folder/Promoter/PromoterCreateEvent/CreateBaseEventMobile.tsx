/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploadCropCreateEventMobile from "./ImageUploadCropCreateEventMobile";
import { Divider, Button, TextField, Avatar } from "@mui/material";
import styles from "./styles.module.css";
import {
	ArrowForwardIosRounded,
	ClearRounded,
	CheckRounded,
} from "@mui/icons-material";
import { RootState } from "@/app/LocalizationProviderHelper";
import {
	setBaseEvent,
	switchPage,
	setImageDisplayHelp,
} from "@/store/promoterCreateEventSlice";
import CreateEventCrumbsMobile from "./CreateEventCrumbsMobile";
import { Crop } from "react-image-crop";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface CreateBaseEventMobileProps {
	setCropSelectState: React.Dispatch<React.SetStateAction<State>>;
	CropSelectstate: State;
}

function CreateBaseEventMobile({
	setCropSelectState,
	CropSelectstate,
}: CreateBaseEventMobileProps) {
	const dispatch = useDispatch();
	const { baseEvent, imageDisplayHelp } = useSelector(
		(state: RootState) => state.promoterCreateEvent
	);

	const [notTouched, setNotTouched] = useState(true);
	const [isUploadError, setIsUploadError] = useState(false);
	const [justNavigated, setJustNavigated] = useState(true);

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

	const imageSelected = imageDisplayHelp.imageSelected;
	const displayName = imageDisplayHelp.displayName;
	const displayURL = imageDisplayHelp.displayURL;
	const confirmImage = imageDisplayHelp.confirmImage;

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

	const handleCroppedImage = (croppedImageUrl: string | null) => {
		dispatch(setBaseEvent({ key: "imageFile", value: croppedImageUrl }));
	};

	const notAllRequiredFieldsFilled =
		baseEvent.name.length < 4 ||
		baseEvent.tagline.length < 4 ||
		baseEvent.imageFile === null;

	function handleSetConfirmedImageFalse() {
		dispatch(setImageDisplayHelp({ key: "confirmImage", value: false }));
	}

	useEffect(() => {
		if (justNavigated) {
			setJustNavigated(false);
		} else {
			if (confirmImage) {
				handleSetConfirmedImageFalse();
			}
		}
	}, [CropSelectstate]);

	return (
		<>
			{imageSelected && !confirmImage ? (
				<div className={styles.pic_edit_wrap_selected}>
					<div className={styles.pic_edit_wrap}>
						<ImageUploadCropCreateEventMobile
							setConfirmedImageFalse={handleSetConfirmedImageFalse}
							confirmedImage={imageDisplayHelp.confirmImage}
							CropSelectstate={CropSelectstate}
							setCropSelectState={setCropSelectState}
							isUploadError={isUploadError}
							setNotTouched={setNotTouched}
							notTouched={notTouched}
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
							displayName={displayName}
						/>
					</div>

					<div style={{ marginBottom: "-5px", marginTop: "5px" }}>
						<Button
							startIcon={<ClearRounded />}
							sx={{ marginRight: "15px" }}
							variant="outlined"
							color="error"
							onClick={() => {
								setIsUploadError(false);
								handleCroppedImage(null);
								setCropSelectState(defaultCropSelectState);
								dispatch(
									setImageDisplayHelp({
										key: "imageSelected",
										value: false,
									})
								);
							}}>
							Cancel
						</Button>
						<Button
							startIcon={<CheckRounded />}
							disabled={notTouched}
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
				</div>
			) : null}
			{imageSelected && !confirmImage ? null : (
				<Button
					onClick={() => {
						dispatch(switchPage({ page: "Banner" }));
					}}
					disabled={notAllRequiredFieldsFilled}
					endIcon={<ArrowForwardIosRounded />}
					variant="outlined"
					sx={{ position: "absolute", right: 10, bottom: 10, zIndex: "1000" }}>
					continue
				</Button>
			)}
			<div className={styles.base_event_body_wrap}>
				{!imageSelected || confirmImage ? (
					<>
						<div className={styles.pic_row}>
							{confirmImage ? (
								<div className={styles.pic_div}>
									<Avatar
										sx={{
											border: "1px solid #f4daa1ff",
											width: "85%",
											height: "85%",
										}}>
										<img
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
											}}
											src={displayURL!}
											alt="Cropped"
										/>
									</Avatar>
								</div>
							) : null}
							<div
								className={
									!confirmImage && !imageSelected
										? styles.pic_row_right_not_selected
										: styles.pic_row_right
								}>
								<div className={styles.pic_edit_wrap}>
									<ImageUploadCropCreateEventMobile
										displayName={displayName}
										setConfirmedImageFalse={handleSetConfirmedImageFalse}
										confirmedImage={imageDisplayHelp.confirmImage}
										CropSelectstate={CropSelectstate}
										setCropSelectState={setCropSelectState}
										isUploadError={isUploadError}
										setNotTouched={setNotTouched}
										notTouched={notTouched}
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
												setImageDisplayHelp({
													key: "displayURL",
													value: value,
												})
											)
										}
										setDisplayName={(value: string) =>
											dispatch(
												setImageDisplayHelp({
													key: "displayName",
													value: value,
												})
											)
										}
									/>
								</div>
							</div>
						</div>
						<div className={styles.divider_div}>
							<Divider variant="middle" flexItem />
						</div>
					</>
				) : null}
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
			<CreateEventCrumbsMobile />
		</>
	);
}

export default CreateBaseEventMobile;
