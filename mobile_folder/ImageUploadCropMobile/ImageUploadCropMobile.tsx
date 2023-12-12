/** @format */

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, { Crop } from "react-image-crop";
import { DriveFolderUploadRounded } from "@mui/icons-material";
import { Avatar, Button, Box } from "@mui/material";
import "react-image-crop/dist/ReactCrop.css";
import styles from "./styles.module.css";

interface ImageUploadCropProps {
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
	disabled: boolean;
	setNotTouched: React.Dispatch<React.SetStateAction<boolean>>;
	notTouched: boolean;
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

const ImageUploadCropModal = ({
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
	disabled,
	setNotTouched,
	notTouched,
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

	const resetImageUpload = () => {
		setCropSelectState({
			...CropSelectstate,
			src: null,
			croppedImageUrl: null,
		});
		setImageSelected(false);
	};

	const { getRootProps, isDragAccept, isDragReject, isDragActive } =
		useDropzone({
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

	return (
		<div ref={refDims} className={styles.main_div}>
			<input
				ref={inputFile}
				type="file"
				accept="image/*"
				onChange={handleFileInputChange}
				style={{ display: "none" }}
			/>
			{!imageSelected ? (
				<>
					{picture === "None" ? null : (
						<div className={styles.display_name}>
							{displayName
								? displayName.length > 12
									? `${displayName.slice(0, 14)}...`
									: displayName
								: ""}
						</div>
					)}
					<div {...getRootProps()}>
						<Button
							disabled={disabled}
							endIcon={<DriveFolderUploadRounded />}
							size="large"
							variant={picture !== "None" ? "text" : "outlined"}
							onClick={() => inputFile.current?.click()}>
							{picture !== "None" ? "select different image" : "select image"}
						</Button>
					</div>
				</>
			) : (
				<div className={styles.pick_new_div}>
					<Button
						variant="outlined"
						endIcon={<DriveFolderUploadRounded />}
						onClick={resetImageUpload}>
						Pick different Image
					</Button>
				</div>
			)}
			{CropSelectstate.src && (
				<div className={styles.ReactCrop_div}>
					<ReactCrop
						style={{
							border: "5px dashed #f8dca1ff",
						}}
						crop={CropSelectstate.crop}
						ruleOfThirds
						aspect={1}
						onComplete={onCropComplete}
						onChange={(newCrop: Crop) =>
							setCropSelectState({ ...CropSelectstate, crop: newCrop })
						}>
						<img
							style={{
								maxWidth: dimensions.width ?? "100px",
								maxHeight: dimensions.height
									? `${dimensions.height * 0.7}px`
									: "100px",
							}}
							src={CropSelectstate.src as string}
							alt="Crop"
							onLoad={onImageLoaded}
						/>
					</ReactCrop>
				</div>
			)}
			{imageSelected ? (
				<div className={styles.bottom_div}>
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
					<Avatar
						sx={{
							marginLeft: "25px",
							height: "100px",
							aspectRatio: "1/1",
							width: "auto",
							border: 2,
							borderColor: "primary.main",
						}}>
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
					</Avatar>
				</div>
			) : null}
		</div>
	);
};

export default ImageUploadCropModal;
