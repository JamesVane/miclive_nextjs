/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploadCropEditEventMobile from "./ImageUploadCropEditEventMobile";
import { Button, TextField } from "@mui/material";
import styles from "./styles.module.css";
import { CheckRounded, ClearRounded } from "@mui/icons-material";
import { RootState } from "@/store/rootStore";
import _ from "lodash";
import {
	setBaseEvent,
	setImageDisplayHelp,
} from "@/store/promoterEditEventSlice";
import { Crop } from "react-image-crop";
import SkeletonOrImage from "@/SkeletonOrImage";
import DividerH from "@/universalComponents/DividerH";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface EditBaseEventMobileProps {
	exit: () => void;
	setCropSelectState: React.Dispatch<React.SetStateAction<State>>;
	CropSelectstate: State;
	updateBaseEvent: () => void;
}

function EditBaseEventDesktop({
	exit,
	updateBaseEvent,
	setCropSelectState,
	CropSelectstate,
}: EditBaseEventMobileProps) {
	const dispatch = useDispatch();
	const { baseEvent, imageDisplayHelp, baseEventId } = useSelector(
		(state: RootState) => state.promoterEditEvent
	);
	const defaultMountedState = {
		name: "",
		tagline: "",
	};
	const sliceInfo = {
		name: baseEvent.name,
		tagline: baseEvent.tagline,
	};

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

	const [mountedState, setMountedState] = useState(defaultMountedState);
	const imageSelected = imageDisplayHelp.imageSelected;
	const displayName = imageDisplayHelp.displayName;
	const displayURL = imageDisplayHelp.displayURL;
	const confirmImage = imageDisplayHelp.confirmImage;
	const [notTouched, setNotTouched] = useState(true);
	const [justNavigated, setJustNavigated] = useState(true);

	function setName(e: React.ChangeEvent<HTMLInputElement>) {
		let payload = e.target.value.trim();
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

	function handleSetConfirmedImageFalse() {
		dispatch(setImageDisplayHelp({ key: "confirmImage", value: false }));
	}

	useEffect(() => {
		setMountedState({
			name: baseEvent.name,
			tagline: baseEvent.tagline,
		});
	}, []);

	const notAllRequiredFieldsFilled =
		baseEvent.name.length < 4 ||
		baseEvent.tagline.length < 4 ||
		(_.isEqual(mountedState, sliceInfo) && imageSelected === false) ||
		(_.isEqual(mountedState, defaultMountedState) && imageSelected === false);

	useEffect(() => {
		if (justNavigated) {
			setJustNavigated(false);
		} else {
			if (confirmImage) {
				handleSetConfirmedImageFalse();
			}
		}
	}, [CropSelectstate]);

	console.log("imageSelected", imageSelected);
	console.log("confirmImage", confirmImage);

	return (
		<>
			{imageSelected && !confirmImage ? (
				<div className={styles.pic_edit_wrap_selected}>
					<div className={styles.pic_edit_wrap}>
						<ImageUploadCropEditEventMobile
							setConfirmedImageFalse={handleSetConfirmedImageFalse}
							confirmedImage={imageDisplayHelp.confirmImage}
							CropSelectstate={CropSelectstate}
							setCropSelectState={setCropSelectState}
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
			<div className={styles.base_event_paper}>
				{!imageSelected || confirmImage ? (
					<>
						<div className={styles.pic_row}>
							<div className={styles.pic_div}>
								<div className={styles.image_decoration}>
									{confirmImage ? (
										<img
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
											}}
											src={displayURL!}
											alt="Cropped"
										/>
									) : (
										<div className={styles.image_decoration}>
											<SkeletonOrImage type={"event"} id={baseEventId!} />
										</div>
									)}
								</div>
							</div>
							<div className={styles.pic_row_right}>
								<div className={styles.pic_edit_wrap}>
									<ImageUploadCropEditEventMobile
										displayName={imageDisplayHelp.displayName}
										CropSelectstate={CropSelectstate}
										setCropSelectState={setCropSelectState}
										setConfirmedImageFalse={handleSetConfirmedImageFalse}
										confirmedImage={imageDisplayHelp.confirmImage}
										notTouched={notTouched}
										setNotTouched={setNotTouched}
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
						<DividerH />
					</>
				) : null}
				<TextField
					value={baseEvent.name}
					onChange={setName}
					label="Event Name"
					sx={{ width: "90%", marginBottom: "20px", marginTop: "20px" }}
				/>
				<TextField
					onChange={setTagline}
					value={baseEvent.tagline}
					label="Event Tagline"
					sx={{ width: "90%", marginBottom: "10px" }}
				/>
				<div className={styles.bottom_row}>
					<Button
						onClick={exit}
						endIcon={<ClearRounded />}
						variant="outlined"
						color="error">
						cancel
					</Button>
					<Button
						color="success"
						onClick={updateBaseEvent}
						disabled={notAllRequiredFieldsFilled}
						endIcon={<CheckRounded />}
						variant="outlined">
						Save
					</Button>
				</div>
			</div>
		</>
	);
}

export default EditBaseEventDesktop;
