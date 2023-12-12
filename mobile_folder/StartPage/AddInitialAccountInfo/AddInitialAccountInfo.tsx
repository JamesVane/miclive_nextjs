/** @format */

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import ImageUploadCropCreateAccountMobile from "./ImageUploadCropCreateAccountMobile/ImageUploadCropCreateAccountMobile";
import { Avatar, Button, TextField, LinearProgress } from "@mui/material";
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
	goToNextStep: () => void;
	isSubmitting: boolean;
	handleSkip: () => void;
	userType: "promoter" | "dj" | "performer";
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
	goToNextStep,
	isSubmitting,
	handleSkip,
	userType,
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
		<>
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
			<div className={styles.main_div}>
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
			</div>
			<div className={styles.bottom_div}>
				{isSubmitting ? (
					<div className={styles.submit_linear}>
						<LinearProgress color="primary" sx={{ width: "100%" }} />
					</div>
				) : (
					<DividerH />
				)}
				<div className={styles.bottom_buttons}>
					{userType === "promoter" ? (
						<div></div>
					) : (
						<Button
							onClick={handleSkip}
							disabled={isSubmitting}
							endIcon={<SkipNextRounded />}
							size="large"
							variant="outlined"
							color="secondary">
							Skip
						</Button>
					)}
					<Button
						disabled={isSubmitting || submitDisabled}
						onClick={goToNextStep}
						startIcon={<CheckRounded />}
						size="large"
						variant="outlined"
						color="success">
						submit
					</Button>
				</div>
			</div>
		</>
	);
}

export default AddInitialAccountInfo;
