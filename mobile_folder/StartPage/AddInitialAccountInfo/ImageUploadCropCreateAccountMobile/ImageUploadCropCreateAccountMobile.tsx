/** @format */

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, { Crop } from "react-image-crop";
import {
	UploadFileRounded,
	DriveFolderUploadRounded,
} from "@mui/icons-material";
import { Avatar, Button, Typography, Box } from "@mui/material";
import "react-image-crop/dist/ReactCrop.css";
import styles from "./styles.module.css";

interface ImageUploadCropProps {
	firProfile?: boolean;
	displayName?: string | null;
	picture?: string;
	imageSelected: boolean;
	setImageSelected:
		| React.Dispatch<React.SetStateAction<boolean>>
		| ((value: boolean) => void);
	onCroppedImage: (croppedImageUrl: string) => void;
	isUploadError?: boolean;
	setDisplayURL?:
		| React.Dispatch<React.SetStateAction<string | null>>
		| ((value: string) => void);
	setDisplayName?:
		| React.Dispatch<React.SetStateAction<string | null>>
		| ((value: string) => void);
	CropSelectstate: State;
	setCropSelectState: React.Dispatch<React.SetStateAction<State>>;
	setNotTouched: React.Dispatch<React.SetStateAction<boolean>>;
	notTouched: boolean;
	confirmedImage: boolean;
	setConfirmedImageFalse: () => void;
	disabled?: boolean;
	fourByTen?: boolean;
	forThreeByTen?: boolean;
}

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface Dimensions {
	width: number | null;
	height: number | null;
}

const ImageUploadCropCreateAccountMobile = ({
	firProfile,
	displayName,
	picture,
	imageSelected,
	setImageSelected,
	onCroppedImage,
	isUploadError,
	setDisplayURL,
	setDisplayName,
	CropSelectstate,
	setCropSelectState,
	setNotTouched,
	notTouched,
	confirmedImage,
	setConfirmedImageFalse,
	disabled,
	fourByTen,
	forThreeByTen,
}: ImageUploadCropProps) => {
	const imgRef = useRef<HTMLImageElement | null>(null);
	const inputFile = useRef<HTMLInputElement | null>(null);

	const onSelectFile = (file: File) => {
		const reader = new FileReader();
		reader.addEventListener("load", () =>
			setCropSelectState({ ...CropSelectstate, src: reader.result })
		);
		reader.readAsDataURL(file);
		if (setDisplayName) setDisplayName(file.name);
	};

	const onImageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
		imgRef.current = event.currentTarget;
		setNotTouched(true);
		setImageSelected(true);
	};

	const onCropComplete = (crop: Crop) => {
		if (imgRef.current && crop.width && crop.height) {
			const croppedImageUrl = getCroppedImg(imgRef.current, crop);
			const base64String = croppedImageUrl.split(",")[1];
			setCropSelectState({ ...CropSelectstate, croppedImageUrl });
			onCroppedImage(base64String);
			if (setDisplayURL) setDisplayURL(croppedImageUrl);
			setNotTouched(false);
		}
	};

	const getCroppedImg = (image: HTMLImageElement, crop: Crop): string => {
		const canvas = document.createElement("canvas");
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		canvas.width = crop.width!;
		canvas.height = crop.height!;
		const ctx = canvas.getContext("2d")!;

		ctx.drawImage(
			image,
			crop.x! * scaleX,
			crop.y! * scaleY,
			crop.width! * scaleX,
			crop.height! * scaleY,
			0,
			0,
			crop.width!,
			crop.height!
		);

		return canvas.toDataURL("image/jpeg");
	};

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			onSelectFile(e.target.files[0]);
		}
	};

	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			onSelectFile(acceptedFiles[0]);
		}
	}, []);

	const { getRootProps } = useDropzone({
		accept: { "image/*": ["jpg", "png", "jpeg", "gif"] },
		multiple: false,
		onDrop,
		noClick: true,
	});

	const refDims = useRef<HTMLDivElement | null>(null);
	const [dimensions, setDimensions] = useState<Dimensions>({
		width: null,
		height: null,
	});

	useEffect(() => {
		if (refDims.current) {
			const { width, height } = refDims.current.getBoundingClientRect();
			setDimensions({ width, height });
		}
	}, [refDims]);

	function ImageHelper() {
		return (
			<>
				{CropSelectstate.croppedImageUrl ? (
					<img
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
						src={CropSelectstate.croppedImageUrl}
						alt="Cropped"
					/>
				) : (
					<img
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
						src={CropSelectstate.src as string}
						alt="Cropped"
					/>
				)}
			</>
		);
	}

	return (
		<div ref={refDims} className={styles.main_div}>
			<input
				ref={inputFile}
				type="file"
				accept="image/*"
				onChange={handleFileInputChange}
				style={{ display: "none" }}
			/>
			{!imageSelected || confirmedImage ? (
				<>
					{confirmedImage ? (
						<div className={styles.display_name}>
							{displayName
								? displayName.length > 12
									? `${displayName.slice(0, 14)}...`
									: displayName
								: ""}
						</div>
					) : null}
					{fourByTen || forThreeByTen || confirmedImage ? null : (
						<div className={styles.profile_picture_text}>Profile Image</div>
					)}
					<div {...getRootProps()}>
						<Button
							sx={{
								marginTop: forThreeByTen || fourByTen ? "140px" : "0px",
								width: forThreeByTen || fourByTen ? "85vw" : "100%",
								fontSize: forThreeByTen || fourByTen ? "20px" : "16px",
							}}
							endIcon={
								<DriveFolderUploadRounded
									sx={{
										height: forThreeByTen || fourByTen ? "40px" : "25px",
										width: forThreeByTen || fourByTen ? "40px" : "25px",
									}}
								/>
							}
							size="large"
							variant={confirmedImage ? "text" : "outlined"}
							onClick={() => {
								inputFile.current?.click();
							}}>
							{confirmedImage
								? "select different image"
								: firProfile
								? "Select Image For Profile Banner"
								: fourByTen
								? "select image for event banner"
								: "select Event image"}
						</Button>
					</div>
				</>
			) : (
				<div className={styles.pick_new_div}>
					<Button
						variant="outlined"
						endIcon={<DriveFolderUploadRounded />}
						onClick={() => {
							inputFile.current?.click();
						}}>
						Pick different Image
					</Button>
				</div>
			)}
			{CropSelectstate.src && !confirmedImage ? (
				<div className={styles.ReactCrop_div}>
					<ReactCrop
						style={{
							border: "5px dashed #f8dca1ff",
						}}
						crop={CropSelectstate.crop}
						ruleOfThirds
						aspect={fourByTen ? 4 / 1 : forThreeByTen ? 3 / 1 : 1 / 1}
						onComplete={onCropComplete}
						onChange={(newCrop: Crop) =>
							setCropSelectState({ ...CropSelectstate, crop: newCrop })
						}>
						<img
							/* style={{
								maxWidth: dimensions.width ?? "100px",
								maxHeight: dimensions.height
									? `${dimensions.height * 0.7}px`
									: "100px",
							}} */
							src={CropSelectstate.src as string}
							alt="Crop"
							onLoad={onImageLoaded}
						/>
					</ReactCrop>
				</div>
			) : null}
			{imageSelected && !confirmedImage ? (
				<div
					className={styles.bottom_div}
					style={{
						flexDirection: fourByTen || forThreeByTen ? "column" : "row",
					}}>
					<p className={styles.cropped_image_text}>
						Cropped Image:
						{isUploadError ? (
							<Box
								sx={{
									position: "absolute",
									bottom: "0px",
									color: "error.main",
									fontSize: "20px",
									width: "200px",
								}}>
								Error Uploading Image
							</Box>
						) : null}
					</p>
					{forThreeByTen ? (
						<div className={styles.three_banner_preview}>
							<ImageHelper />
						</div>
					) : fourByTen ? (
						<div className={styles.four_banner_preview}>
							<ImageHelper />
						</div>
					) : (
						<Avatar
							sx={{
								marginLeft: "25px",
								height: "100px",
								aspectRatio: "1/1",
								width: "auto",
								border: 2,
								borderColor: "primary.main",
							}}>
							<ImageHelper />
						</Avatar>
					)}
				</div>
			) : null}
		</div>
	);
};

export default ImageUploadCropCreateAccountMobile;
