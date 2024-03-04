/** @format */
import { useState, useCallback, useEffect } from "react";
import styles from "./styles.module.css";
import {
	Button,
	Divider,
	TextField,
	Avatar,
	Snackbar,
	Alert,
	LinearProgress,
} from "@mui/material";
import {
	ArrowBackIosNewRounded,
	PermMediaRounded,
	EmailRounded,
	LocationCityRounded,
	LocalPhoneRounded,
	Instagram,
	InsertLinkRounded,
	CheckRounded,
	ClearRounded,
} from "@mui/icons-material";
import _ from "lodash";
import AvatarSimpleMobile from "@mobi/small_components/AvatarSimpleMobile";
import ImageUploadCropMobile from "@mobi/ImageUploadCropMobile";
import { Crop } from "react-image-crop";
import ValidateTextInput from "./ValidateTextInput";
import debounce from "lodash/debounce";
import DividerH from "@/universalComponents/DividerH";

interface EditProfileInfoProps {
	setDisplayName: (displayName: string) => void;
	setDisplayURL: (displayURL: string) => void;
	roleType: "promoter" | "performer" | "dj";
	roleKey: string;
	handleBack: () => void;
	username: string;
	tagline: string;
	picture: string;
	pictureDisplayURL: string;
	pictureDisplayName: string;
	City: string;
	Email: string;
	IG: string;
	Link: string;
	Phone: string;
	setTagline: (tagline: string) => void;
	setCity: (city: string) => void;
	setEmail: (email: string) => void;
	setIG: (ig: string) => void;
	setLink: (link: string) => void;
	setPhone: (phone: string) => void;
	setPicture: (picture: string) => void;
	invalidTagline: string;
	validateTagline: (inputTagline: string) => void;
	pictureError: boolean;
	setPictureError: React.Dispatch<React.SetStateAction<boolean>>;
	croppedImage: string | null;
	setCroppedImage: React.Dispatch<React.SetStateAction<string | null>>;
	imageSelected: boolean;
	setImageSelected: React.Dispatch<React.SetStateAction<boolean>>;
	taglineError: boolean;
	setTaglineError: React.Dispatch<React.SetStateAction<boolean>>;
	infoError: boolean;
	setInfoError: React.Dispatch<React.SetStateAction<boolean>>;
	somethingUploading: boolean;
	handleSubmitUpdates: () => void;
}

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

function EditProfileInfo({
	setDisplayName,
	setDisplayURL,
	roleType,
	roleKey,
	handleBack,
	username,
	tagline,
	picture,
	pictureDisplayURL,
	pictureDisplayName,
	City,
	Email,
	IG,
	Link,
	Phone,
	setTagline,
	setCity,
	setEmail,
	setIG,
	setLink,
	setPhone,
	setPicture,
	invalidTagline,
	validateTagline,
	pictureError,
	setPictureError,
	croppedImage,
	setCroppedImage,
	imageSelected,
	setImageSelected,
	taglineError,
	setTaglineError,
	infoError,
	setInfoError,
	somethingUploading,
	handleSubmitUpdates,
}: EditProfileInfoProps) {
	const [isUploadError, setIsUploadError] = useState(false);
	const [displayURLHold, setDisplayURLHold] = useState<string | null>(null);
	const [displayNameHold, setDisplayNameHold] = useState<string | null>(null);
	const [ValidationInProgress, setValidationInProgress] = useState(false);
	const [cityValid, setCityValid] = useState(true);
	const [emailValid, setEmailValid] = useState(true);
	const [phoneValid, setPhoneValid] = useState(true);
	const [igValid, setIGValid] = useState(true);
	const [linkValid, setLinkValid] = useState(true);
	const [notTouched, setNotTouched] = useState(true);

	const disableSubmit =
		invalidTagline !== "" ||
		ValidationInProgress ||
		!cityValid ||
		!emailValid ||
		!phoneValid ||
		!igValid ||
		!linkValid ||
		somethingUploading;

	const validateTaglineDebounce = useCallback(
		debounce(() => {
			if (tagline !== "") {
				if (tagline) {
					validateTagline(tagline);
				}
			}
			setValidationInProgress(false);
		}, 500),
		[tagline]
	);

	useEffect(() => {
		validateTaglineDebounce();
	}, [tagline]);

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

	const avatarStyles = {
		width: "75%",
		height: "75%",
		backgroundColor: "transparent",
		border: "1px solid #f4daa1ff",
	};

	const iconStyles = {
		width: "60%",
		height: "60%",
		color: "#f4daa1ff",
	};

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
			<Snackbar
				open={taglineError}
				autoHideDuration={6000}
				onClose={() => setTaglineError(false)}>
				<Alert
					onClose={() => setTaglineError(false)}
					severity="error"
					sx={{ width: "100%" }}>
					Error Updating Profile Tagline
				</Alert>
			</Snackbar>
			<Snackbar
				open={infoError}
				autoHideDuration={6000}
				onClose={() => setInfoError(false)}>
				<Alert
					onClose={() => setInfoError(false)}
					severity="error"
					sx={{ width: "100%" }}>
					Error Updating Profile Info
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
				<div className={styles.header}>
					<Button
						onClick={handleBack}
						color="secondary"
						startIcon={<ArrowBackIosNewRounded />}
						size="small"
						sx={{ position: "absolute", left: "0px", top: "0px" }}>
						back
					</Button>
					{`Edit ${username}'s Profile`}
				</div>
				<div className={styles.pic_row}>
					<div className={styles.pic_div}>
						{picture === "None" ? (
							<AvatarSimpleMobile
								username={username}
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
				<div className={styles.tagline_row}>
					<div className={styles.error_text} style={{ marginBottom: "7.5px" }}>
						{invalidTagline}
					</div>
					<div className={styles.tagline_left}>Tagline</div>
					<div className={styles.tagline_right}>
						<TextField
							disabled={somethingUploading}
							error={invalidTagline !== ""}
							size="small"
							multiline
							rows={2}
							label="Tagline"
							placeholder="Tagline"
							value={tagline}
							onChange={(e) => {
								setValidationInProgress(true);
								setTagline(e.target.value);
							}}
							sx={{ width: "90%" }}
						/>
					</div>
				</div>
				<DividerH />
				<div className={styles.info_row}>
					<div className={styles.info_row_left}>
						<div className={styles.info_row_icon}>
							<Avatar sx={avatarStyles}>
								<LocationCityRounded sx={iconStyles} />
							</Avatar>
						</div>
						City
					</div>
					<ValidateTextInput
						disabled={somethingUploading}
						setValidationInProgress={setValidationInProgress}
						type="City"
						handleOnChange={(e) => {
							setValidationInProgress(true);
							setCity(e.target.value);
						}}
						label="City"
						placeholder="City"
						value={City}
						setIsValid={setCityValid}
						isValid={cityValid}
					/>
				</div>
				<div className={styles.info_row}>
					<div className={styles.info_row_left}>
						<div className={styles.info_row_icon}>
							<Avatar sx={avatarStyles}>
								<EmailRounded sx={iconStyles} />
							</Avatar>
						</div>
						Email
					</div>
					<ValidateTextInput
						disabled={somethingUploading}
						handleOnChange={(e) => {
							setValidationInProgress(true);
							setEmail(e.target.value);
						}}
						label="Email"
						placeholder="Email"
						value={Email}
						type="Email"
						setIsValid={setEmailValid}
						isValid={emailValid}
						setValidationInProgress={setValidationInProgress}
					/>
				</div>
				<div className={styles.info_row}>
					<div className={styles.info_row_left}>
						<div className={styles.info_row_icon}>
							<Avatar sx={avatarStyles}>
								<LocalPhoneRounded sx={iconStyles} />
							</Avatar>
						</div>
						Phone
					</div>
					<ValidateTextInput
						disabled={somethingUploading}
						handleOnChange={(e) => {
							setValidationInProgress(true);
							setPhone(e.target.value);
						}}
						label="Phone"
						placeholder="Phone"
						value={Phone}
						type="Phone"
						setIsValid={setPhoneValid}
						isValid={phoneValid}
						setValidationInProgress={setValidationInProgress}
					/>
				</div>
				<div className={styles.info_row}>
					<div className={styles.info_row_left}>
						<div className={styles.info_row_icon}>
							<Avatar sx={avatarStyles}>
								<Instagram sx={iconStyles} />
							</Avatar>
						</div>
						IG
					</div>
					<ValidateTextInput
						disabled={somethingUploading}
						handleOnChange={(e) => {
							setValidationInProgress(true);
							setIG(e.target.value);
						}}
						label="Instagrem"
						placeholder="Instagram"
						value={IG}
						type="IG"
						setIsValid={setIGValid}
						isValid={igValid}
						setValidationInProgress={setValidationInProgress}
					/>
				</div>
				<div className={styles.info_row}>
					<div className={styles.info_row_left}>
						<div className={styles.info_row_icon}>
							<Avatar sx={avatarStyles}>
								<InsertLinkRounded sx={iconStyles} />
							</Avatar>
						</div>
						Link
					</div>
					<ValidateTextInput
						disabled={somethingUploading}
						handleOnChange={(e) => {
							setValidationInProgress(true);
							setLink(e.target.value);
						}}
						label="Link"
						placeholder="Link"
						value={Link}
						type="Link"
						setIsValid={setLinkValid}
						isValid={linkValid}
						setValidationInProgress={setValidationInProgress}
					/>
				</div>
				<div className={styles.bottom_row}>
					{somethingUploading ? (
						<div className={styles.linear_prog_div}>
							<LinearProgress color="primary" sx={{ width: "100%" }} />
						</div>
					) : (
						<DividerH />
					)}
					<div className={styles.bottom_row_buttons}>
						<Button
							disabled={somethingUploading}
							variant="outlined"
							color="error"
							startIcon={<ClearRounded />}
							onClick={handleBack}>
							discard changes
						</Button>
						<Button
							onClick={handleSubmitUpdates}
							disabled={disableSubmit}
							variant="outlined"
							color="success"
							startIcon={<CheckRounded />}>
							save changes
						</Button>
						D
					</div>
				</div>
			</div>
		</>
	);
}

export default EditProfileInfo;
