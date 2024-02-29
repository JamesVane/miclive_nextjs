/** @format */

import React, { useEffect } from "react";
import styles from "./styles.module.css";
import ImageUploadCropCreateAccountMobile from "./ImageUploadCropCreateAccountMobile/ImageUploadCropCreateAccountMobile";
import {
	Avatar,
	Divider,
	Button,
	TextField,
	LinearProgress,
	Paper,
} from "@mui/material";
import { Crop } from "react-image-crop";
import {
	ClearRounded,
	CheckRounded,
	SkipNextRounded,
} from "@mui/icons-material";
import DividerH from "@/universalComponents/DividerH";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface AddInitialAccountInfoProps {
	setCropSelectState: React.Dispatch<React.SetStateAction<State>>;
	CropSelectstate: State;
	defaultCropSelectState: any;
	justNavigated: boolean;
	setJustNavigated: React.Dispatch<React.SetStateAction<boolean>>;
	notTouched: boolean;
	setNotTouched: React.Dispatch<React.SetStateAction<boolean>>;
	isUploadError: boolean;
	setIsUploadError: React.Dispatch<React.SetStateAction<boolean>>;
	handleSetConfirmedImageFalse: () => void;
	handleCroppedImage: (croppedImageUrl: string | null) => void;
	handleSetTagline: (tagline: string) => void;
	handleSetImageSelected: (input: boolean) => void;
	handleSetDisplayURL: (value: string) => void;
	handleSetDisplayName: (value: string) => void;
	setConfirmImage: (value: boolean) => void;
	tagline: string;
	imageFile: string | null;
	imageDisplayHelp: any;
	taglineErrorText: string;
	handleSubmit: () => void;
	isSubmitting: boolean;
	accountType: "promoter" | "dj" | "performer";
}

function AddInitialAccountInfo({
	setCropSelectState,
	CropSelectstate,
	defaultCropSelectState,
	justNavigated,
	setJustNavigated,
	notTouched,
	setNotTouched,
	isUploadError,
	setIsUploadError,
	handleSetConfirmedImageFalse,
	handleCroppedImage,
	handleSetTagline,
	handleSetImageSelected,
	handleSetDisplayURL,
	handleSetDisplayName,
	setConfirmImage,
	tagline,
	imageFile,
	imageDisplayHelp,
	taglineErrorText,
	handleSubmit,
	isSubmitting,
	accountType,
}: AddInitialAccountInfoProps) {
	const submitDisabled = imageFile === null && tagline === "";

	const imageSelected = imageDisplayHelp.imageSelected;
	const displayName = imageDisplayHelp.displayName;
	const displayURL = imageDisplayHelp.displayURL;
	const confirmImage = imageDisplayHelp.confirmImage;

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
		<div className={styles.main_div}>
			<Paper className={styles.paper_container}>
				{imageSelected && !confirmImage ? (
					<div className={styles.pic_edit_wrap_selected}>
						<div className={styles.pic_edit_wrap}>
							<ImageUploadCropCreateAccountMobile
								disabled={isSubmitting}
								setConfirmedImageFalse={handleSetConfirmedImageFalse}
								confirmedImage={imageDisplayHelp.confirmImage}
								CropSelectstate={CropSelectstate}
								setCropSelectState={setCropSelectState}
								isUploadError={isUploadError}
								setNotTouched={setNotTouched}
								notTouched={notTouched}
								imageSelected={imageSelected}
								setImageSelected={handleSetImageSelected}
								onCroppedImage={handleCroppedImage}
								setDisplayURL={handleSetDisplayURL}
								setDisplayName={handleSetDisplayName}
								displayName={displayName}
							/>
						</div>

						<div style={{ marginBottom: "-5px", marginTop: "5px" }}>
							<Button
								size="large"
								startIcon={<ClearRounded />}
								sx={{ marginRight: "15px" }}
								variant="outlined"
								color="error"
								onClick={() => {
									setIsUploadError(false);
									handleCroppedImage(null);
									setCropSelectState(defaultCropSelectState);
									handleSetImageSelected(false);
								}}>
								Cancel
							</Button>
							<Button
								size="large"
								startIcon={<CheckRounded />}
								disabled={notTouched}
								color="success"
								sx={{ marginLeft: "15px" }}
								variant="outlined"
								onClick={() => setConfirmImage(true)}>
								Select
							</Button>
						</div>
					</div>
				) : null}
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
									<ImageUploadCropCreateAccountMobile
										disabled={isSubmitting}
										displayName={displayName}
										setConfirmedImageFalse={handleSetConfirmedImageFalse}
										confirmedImage={imageDisplayHelp.confirmImage}
										CropSelectstate={CropSelectstate}
										setCropSelectState={setCropSelectState}
										isUploadError={isUploadError}
										setNotTouched={setNotTouched}
										notTouched={notTouched}
										imageSelected={imageSelected}
										setImageSelected={handleSetImageSelected}
										onCroppedImage={handleCroppedImage}
										setDisplayURL={handleSetDisplayURL}
										setDisplayName={handleSetDisplayName}
									/>
								</div>
							</div>
						</div>
						<DividerH />
					</>
				) : null}
				<div className={styles.tagline_text}>Profile Tagline</div>
				<div className={styles.tagline_div}>
					<TextField
						disabled={isSubmitting}
						error={taglineErrorText !== ""}
						value={tagline}
						onChange={(e) => handleSetTagline(e.target.value)}
						placeholder="Add Profile Tagline"
						label="Tagline"
						multiline
						rows={2}
						sx={{
							width: "90%",
							height: "90%",
						}}
					/>
				</div>
				<div className={styles.tagline_error}>{taglineErrorText}</div>
				<div className={styles.bottom_div}>
					<div
						className={styles.divider_div}
						style={{ height: isSubmitting ? "4px" : "2px" }}>
						{isSubmitting ? (
							<LinearProgress color="primary" sx={{ width: "100%" }} />
						) : (
							<Divider variant="middle" flexItem />
						)}
					</div>
					<div className={styles.bottom_buttons}>
						<Button
							disabled={isSubmitting || submitDisabled}
							onClick={handleSubmit}
							startIcon={<CheckRounded />}
							size="large"
							variant="outlined"
							color="success">
							submit
						</Button>
					</div>
				</div>
			</Paper>
		</div>
	);
}

export default AddInitialAccountInfo;
