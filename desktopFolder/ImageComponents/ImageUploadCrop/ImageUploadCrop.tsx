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
	imageSelected: boolean;
	setImageSelected:
		| React.Dispatch<React.SetStateAction<boolean>>
		| ((value: boolean) => void);
	onCroppedImage: (croppedImageUrl: string) => void;
	isUploading?: boolean;
	isUploadError?: boolean;
	setDisplayURL?:
		| React.Dispatch<React.SetStateAction<string | null>>
		| ((value: string) => void);
	setDisplayName?:
		| React.Dispatch<React.SetStateAction<string | null>>
		| ((value: string) => void);
	fourByTen?: boolean;
	forThreeByTen?: boolean;
	threeByTenSrc?: any;
	setHoldSrc?: React.Dispatch<React.SetStateAction<any>>;
}

interface State {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
}

interface Dimensions {
	width: number | null;
	height: number | null;
}

const ImageUploadCrop = ({
	imageSelected,
	setImageSelected,
	onCroppedImage,
	isUploading,
	isUploadError,
	setDisplayURL,
	setDisplayName,
	fourByTen,
	forThreeByTen,
	threeByTenSrc,
	setHoldSrc,
}: ImageUploadCropProps) => {
	const [state, setState] = useState<State>({
		src: null,
		crop: {
			x: 0,
			y: 0,
			width: fourByTen ? 400 : forThreeByTen ? 300 : 150,
			height: fourByTen || forThreeByTen ? 100 : 150,
			aspect: fourByTen ? 4 / 1 : forThreeByTen ? 3 / 1 : 1 / 1,
			unit: "px",
			minWidth: fourByTen ? 40 : forThreeByTen ? 30 : 10,
			minHeight: 10,
			maxWidth: fourByTen ? 2000 : forThreeByTen ? 1500 : 500,
			maxHeight: 500,
		} as Crop,
		croppedImageUrl: null,
	});

	useEffect(() => {
		if (forThreeByTen) {
			setState({
				...state,
				src: threeByTenSrc,
			});
			console.log("threeByTenSrc", threeByTenSrc);
		}
	}, []);

	const imgRef = useRef<HTMLImageElement | null>(null);
	const inputFile = useRef<HTMLInputElement | null>(null);

	const onSelectFile = (file: File) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => {
			setState({ ...state, src: reader.result });
			if (fourByTen) {
				setHoldSrc!(reader.result);
			}
		});
		reader.readAsDataURL(file);
		if (setDisplayName) setDisplayName(file.name);
	};

	const onImageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
		imgRef.current = event.currentTarget;
		setImageSelected(true);
	};

	const onCropComplete = (crop: Crop) => {
		if (imgRef.current && crop.width && crop.height) {
			const croppedImageUrl = getCroppedImg(imgRef.current, crop);
			const base64String = croppedImageUrl.split(",")[1];
			setState({ ...state, croppedImageUrl });
			onCroppedImage(base64String);
			if (setDisplayURL) setDisplayURL(croppedImageUrl);
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
		setState({ ...state, src: null, croppedImageUrl: null });
		setImageSelected(false);
	};

	const { getRootProps, isDragAccept, isDragReject, isDragActive } =
		useDropzone({
			accept: {
				"image/jpeg": [".jpg", ".jpeg"],
				"image/png": [".png"],
				"image/gif": [".gif"],
				"image/webp": [".webp"],
				"application/pdf": [],
			},
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

	function DisplayImageHelp() {
		return (
			<>
				{state.croppedImageUrl ? (
					<img
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
						src={state.croppedImageUrl}
						alt="Cropped"
					/>
				) : (
					<div></div>
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
			{!imageSelected ? (
				<>
					<div
						className={styles.drop_zone}
						style={{
							border: isDragAccept
								? "5px dashed #66bb6aff"
								: isDragReject
								? "5px dashed #ff0000ff"
								: "5px dashed #888661ff",
						}}
						{...getRootProps()}>
						<Typography
							sx={{
								margin: "10px",
								fontSize: "40px",
								marginTop: "-20px",
								color: isDragAccept
									? "#66bb6aff"
									: isDragReject
									? "#ff0000ff"
									: "#9ca1a3ff",
							}}>
							{isDragAccept
								? "Drop Image file Here"
								: isDragReject
								? "File must me a single (1) Image file"
								: "Drag and Drop an Image file here, or"}
						</Typography>

						{!isDragActive ? (
							<Button
								endIcon={<UploadFileRounded />}
								size="large"
								variant="contained"
								onClick={() => inputFile.current?.click()}>
								click here to Upload Image
							</Button>
						) : null}
					</div>
				</>
			) : (
				<div className={styles.pick_new_div}>
					<Button
						disabled={isUploading}
						size="large"
						variant="contained"
						endIcon={<DriveFolderUploadRounded />}
						onClick={resetImageUpload}>
						Pick different Image
					</Button>
				</div>
			)}
			{state.src && (
				<div className={styles.ReactCrop_div}>
					<ReactCrop
						style={{
							border: "5px dashed #f8dca1ff",
						}}
						crop={state.crop}
						ruleOfThirds
						aspect={fourByTen ? 4 / 1 : forThreeByTen ? 3 / 1 : 1 / 1}
						onComplete={onCropComplete}
						onChange={(newCrop: Crop) => setState({ ...state, crop: newCrop })}>
						<img
							style={{
								maxWidth: dimensions.width ?? "100px",
								maxHeight: dimensions.height
									? `${dimensions.height * 0.7}px`
									: "100px",
							}}
							src={state.src as string}
							alt="Crop"
							onLoad={onImageLoaded}
						/>
					</ReactCrop>
				</div>
			)}
			{imageSelected ? (
				<div className={styles.bottom_div}>
					<p className={styles.cropped_image_text}>
						{state.croppedImageUrl ? "Cropped Image:" : "Begin Cropping Image"}
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
					{state.croppedImageUrl ? (
						<>
							{fourByTen ? (
								<div className={styles.four_display_pic}>
									<DisplayImageHelp />
								</div>
							) : forThreeByTen ? (
								<div className={styles.three_display_pic}>
									<DisplayImageHelp />
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
									<DisplayImageHelp />
								</Avatar>
							)}
						</>
					) : null}
				</div>
			) : null}
		</div>
	);
};

export default ImageUploadCrop;
