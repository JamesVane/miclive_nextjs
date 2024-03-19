/** @format */
import { useState } from "react";
import styles from "./styles.module.css";
import {
	Button,
	IconButton,
	TextField,
	Avatar,
	Snackbar,
	Alert,
	LinearProgress,
	InputAdornment,
} from "@mui/material";
import {
	Instagram,
	AccountBoxRounded,
	CheckRounded,
	ClearRounded,
	LocalOfferRounded,
} from "@mui/icons-material";
import _ from "lodash";
import AvatarSimpleMobile from "@mobi/small_components/AvatarSimpleMobile";
import ImageUploadCropMobile from "@mobi/ImageUploadCropMobile";
import { Crop } from "react-image-crop";
import DividerH from "@/universalComponents/DividerH";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface EditProfileInfoProps {
	setDisplayName: (displayName: string) => void;
	setDisplayURL: (displayURL: string) => void;
	roleType: "promoter" | "performer" | "dj";
	roleKey: string;
	handleBack: () => void;
	picture: string;
	pictureDisplayURL: string;
	pictureDisplayName: string;
	setPicture: (picture: string) => void;
	pictureError: boolean;
	setPictureError: React.Dispatch<React.SetStateAction<boolean>>;
	croppedImage: string | null;
	setCroppedImage: React.Dispatch<React.SetStateAction<string | null>>;
	imageSelected: boolean;
	setImageSelected: React.Dispatch<React.SetStateAction<boolean>>;
	usernameError: string;
	taglineError: string;
	instagramError: string;
	somethingUploading: boolean;
	whatIsFocused: {
		username: boolean;
		tagline: boolean;
		instagram: boolean;
	};
	handleWhatIsFocused: (key: string, value: boolean) => void;
	usernameValue: string;
	instagramValue: string;
	taglineValue: string;
	clearUsername: () => void;
	clearTagline: () => void;
	clearInstagram: () => void;
	handleSetTagline: (tagline: string) => void;
	handleSetInstagram: (instagram: string) => void;
	handleSetUsername: (username: string) => void;
	canSaveForm: boolean;
	handleSave: () => void;
}

function EditProfileInfo({
	setDisplayName,
	setDisplayURL,
	roleType,
	roleKey,
	handleBack,
	picture,
	pictureDisplayURL,
	pictureDisplayName,
	setPicture,
	pictureError,
	setPictureError,
	croppedImage,
	setCroppedImage,
	imageSelected,
	setImageSelected,
	usernameError,
	taglineError,
	instagramError,
	somethingUploading,
	whatIsFocused,
	handleWhatIsFocused,
	usernameValue,
	instagramValue,
	taglineValue,
	clearUsername,
	clearTagline,
	clearInstagram,
	handleSetTagline,
	handleSetInstagram,
	handleSetUsername,
	canSaveForm,
	handleSave,
}: EditProfileInfoProps) {
	const [isUploadError, setIsUploadError] = useState(false);
	const [displayURLHold, setDisplayURLHold] = useState<string | null>(null);
	const [displayNameHold, setDisplayNameHold] = useState<string | null>(null);
	const [notTouched, setNotTouched] = useState(true);

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

	const [CropSelectstate, setCropSelectState] = useState<State>(
		defaultCropSelectState
	);

	const handleCroppedImage = (croppedImageUrl: string) => {
		setCroppedImage(croppedImageUrl);
	};

	function handleImageUpload() {
		console.log("picture", picture);
		setDisplayName(displayNameHold as string);
		setDisplayURL(displayURLHold as string);
		setPicture(croppedImage as string);
		setIsUploadError(false);
		setImageSelected(false);
		setDisplayNameHold(null);
		setDisplayURLHold(null);
		setCropSelectState(defaultCropSelectState);
	}

	return (
		<>
			<Snackbar
				open={pictureError}
				autoHideDuration={6000}
				onClose={() => setPictureError(false)}>
				<Alert
					onClose={() => setPictureError(false)}
					severity="error"
					sx={{ width: "100%" }}>
					Error Updating Profile Picture
				</Alert>
			</Snackbar>
			{imageSelected ? (
				<div className={styles.pic_edit_wrap_selected}>
					<div className={styles.pic_edit_wrap}>
						<ImageUploadCropMobile
							disabled={somethingUploading}
							displayName={pictureDisplayName}
							picture={picture}
							setDisplayURL={setDisplayURLHold}
							setDisplayName={setDisplayNameHold}
							CropSelectstate={CropSelectstate}
							setCropSelectState={setCropSelectState}
							isUploadError={isUploadError}
							imageSelected={imageSelected}
							setImageSelected={setImageSelected}
							onCroppedImage={handleCroppedImage}
							setNotTouched={setNotTouched}
							notTouched={notTouched}
						/>
					</div>

					<div className={styles.pic_edit_save_cancel}>
						<Button
							startIcon={<ClearRounded />}
							sx={{ margin: "15px" }}
							onClick={() => {
								setIsUploadError(false);
								setCroppedImage(null);
								setImageSelected(false);
								setCropSelectState(defaultCropSelectState);
							}}
							color="error"
							size="large"
							variant="outlined">
							cancel
						</Button>
						<Button
							disabled={notTouched}
							startIcon={<CheckRounded />}
							onClick={handleImageUpload}
							color={"success"}
							variant="outlined"
							size="large"
							sx={{ margin: "15px" }}>
							Select
						</Button>
					</div>
				</div>
			) : null}
			<div
				className={styles.main_div}
				style={{
					display: imageSelected ? "none" : "flex",
				}}>
				<div className={styles.header}>{`Edit profile`}</div>
				<div className={styles.pic_row}>
					<div className={styles.pic_div}>
						{picture === "None" ? (
							<AvatarSimpleMobile
								username={usernameValue}
								ninety
								type={roleType}
								id={Number(roleKey)}
							/>
						) : (
							<Avatar
								sx={{
									border: "1px solid #f4daa1ff",
									width: "85%",
									height: "85%",
								}}>
								<img
									style={{ width: "100%", height: "100%", objectFit: "cover" }}
									src={pictureDisplayURL}
									alt="Cropped"
								/>
							</Avatar>
						)}
					</div>
					<div className={styles.pic_row_right}>
						{imageSelected ? null : (
							<div className={styles.pic_edit_wrap}>
								<ImageUploadCropMobile
									disabled={somethingUploading}
									setDisplayURL={setDisplayURLHold}
									setDisplayName={setDisplayNameHold}
									displayName={pictureDisplayName}
									picture={picture}
									CropSelectstate={CropSelectstate}
									setCropSelectState={setCropSelectState}
									isUploadError={isUploadError}
									imageSelected={imageSelected}
									setImageSelected={setImageSelected}
									onCroppedImage={handleCroppedImage}
									setNotTouched={setNotTouched}
									notTouched={notTouched}
								/>
							</div>
						)}
					</div>
				</div>
				<DividerH />
				<div className={styles.edit_info_row}>
					<TextField
						disabled={somethingUploading}
						onFocus={() => handleWhatIsFocused("username", true)}
						onBlur={() => handleWhatIsFocused("username", false)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AccountBoxRounded
										sx={{
											color:
												usernameError !== ""
													? "error.main"
													: whatIsFocused.username
													? "primary.main"
													: "action.disabled",
										}}
									/>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment sx={{ width: "30px" }} position="end">
									<IconButton onClick={clearUsername}>
										<ClearRounded
											sx={{
												color:
													usernameError !== ""
														? "error.main"
														: whatIsFocused.username
														? "primary.main"
														: "action.disabled",
											}}
										/>
									</IconButton>
								</InputAdornment>
							),
						}}
						error={usernameError !== ""}
						helperText={usernameError}
						onChange={(e) => {
							handleSetUsername(e.target.value);
						}}
						sx={{ width: "100%" }}
						label={"Username"}
						value={usernameValue}
						placeholder="Username"
					/>
				</div>
				<div className={styles.edit_info_row}>
					<TextField
						disabled={somethingUploading}
						onFocus={() => handleWhatIsFocused("tagline", true)}
						onBlur={() => handleWhatIsFocused("tagline", false)}
						error={taglineError !== ""}
						helperText={taglineError}
						onChange={(e) => {
							handleSetTagline(e.target.value);
						}}
						sx={{ width: "100%" }}
						label={"Tagline"}
						value={taglineValue}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LocalOfferRounded
										sx={{
											color:
												taglineError !== ""
													? "error.main"
													: whatIsFocused.tagline
													? "primary.main"
													: "action.disabled",
										}}
									/>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment sx={{ width: "30px" }} position="end">
									<IconButton onClick={clearTagline}>
										<ClearRounded
											sx={{
												color:
													taglineError !== ""
														? "error.main"
														: whatIsFocused.tagline
														? "primary.main"
														: "action.disabled",
											}}
										/>
									</IconButton>
								</InputAdornment>
							),
						}}
						placeholder="Tagline"
					/>
				</div>
				<div className={styles.edit_info_row}>
					<TextField
						disabled={somethingUploading}
						onFocus={() => handleWhatIsFocused("instagram", true)}
						onBlur={() => handleWhatIsFocused("instagram", false)}
						error={instagramError !== ""}
						helperText={instagramError}
						onChange={(e) => {
							handleSetInstagram(e.target.value);
						}}
						sx={{ width: "100%" }}
						label={"Instagram"}
						value={instagramValue}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Instagram
										sx={{
											color:
												instagramError !== ""
													? "error.main"
													: whatIsFocused.instagram
													? "primary.main"
													: "action.disabled",
										}}
									/>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment sx={{ width: "30px" }} position="end">
									<IconButton onClick={clearInstagram}>
										<ClearRounded
											sx={{
												color:
													instagramError !== ""
														? "error.main"
														: whatIsFocused.instagram
														? "primary.main"
														: "action.disabled",
											}}
										/>
									</IconButton>
								</InputAdornment>
							),
						}}
						placeholder="Instagram"
					/>
				</div>

				<div className={styles.bottom_row}>
					<DividerH />
					<div className={styles.bottom_row_buttons}>
						<Button
							disabled={somethingUploading}
							variant="outlined"
							color="secondary"
							startIcon={<ClearRounded />}
							onClick={handleBack}>
							cancel
						</Button>
						<Button
							onClick={handleSave}
							disabled={!canSaveForm || somethingUploading}
							variant="outlined"
							color="success"
							startIcon={<CheckRounded />}>
							save
							{somethingUploading ? (
								<LinearProgress
									color="success"
									sx={{
										position: "absolute",
										bottom: "0px",
										width: "100%",
									}}
								/>
							) : null}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default EditProfileInfo;
