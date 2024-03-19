/** @format */

import styles from "./styles.module.css";
import HomeBarV2 from "@desk/HomeBarV2";
import {
	LinearProgress,
	Button,
	Tabs,
	Tab,
	Divider,
	TextField,
	InputAdornment,
	IconButton,
} from "@mui/material";
import {
	Instagram,
	CloseRounded,
	EditRounded,
	ClearRounded,
	AccountBoxRounded,
	LocalOfferRounded,
	CheckRounded,
	CameraAltRounded,
} from "@mui/icons-material";
import AvatarSimple from "@desk/AvatarSimple";
import { UserProfileResponse } from "@/store/usersStateStore";

import ImageUploadCrop from "@desk/ImageComponents/ImageUploadCrop/ImageUploadCrop";

interface ProfileEditingProps {
	handleGoBack: () => void;
	performer: boolean;
	dj: boolean;
	editingPicture: boolean;
	isUploadError: boolean;
	isUploading: boolean;
	imageSelected: boolean;
	handleImageUpload: () => void;
	handleCroppedImage: (croppedImageUrl: string) => void;
	setImageSelected: React.Dispatch<React.SetStateAction<boolean>>;
	setIsUploadError: React.Dispatch<React.SetStateAction<boolean>>;
	setEditingPicture: React.Dispatch<React.SetStateAction<boolean>>;
	setCroppedImage: React.Dispatch<React.SetStateAction<string | null>>;
	usersStateFromStore: UserProfileResponse;
	handleSetTagline: (tagline: string) => void;
	taglineValue: string;
	taglineError: string;
	handleSetUsername: (username: string) => void;
	usernameValue: string;
	usernameError: string;
	whatIsFocused: {
		username: boolean;
		tagline: boolean;
		instagram: boolean;
	};
	clearUsername: () => void;
	clearTagline: () => void;
	instagramValue: string;
	handleSetInstagram: (instagram: string) => void;
	clearInstagram: () => void;
	instagramError: string;
	handleWhatIsFocused: (key: string, value: boolean) => void;
	canSaveForm: boolean;
	handleSaveAllData: () => void;
	formUploadingInProgress: boolean;
}

function ProfileEditing({
	handleGoBack,
	performer,
	dj,
	editingPicture,
	isUploadError,
	isUploading,
	imageSelected,
	handleImageUpload,
	handleCroppedImage,
	setImageSelected,
	setIsUploadError,
	setEditingPicture,
	setCroppedImage,
	usersStateFromStore,
	handleSetTagline,
	taglineValue,
	taglineError,
	handleSetUsername,
	usernameValue,
	usernameError,
	whatIsFocused,
	clearUsername,
	clearTagline,
	instagramValue,
	handleSetInstagram,
	clearInstagram,
	instagramError,
	handleWhatIsFocused,
	canSaveForm,
	handleSaveAllData,
	formUploadingInProgress,
}: ProfileEditingProps) {
	return (
		<>
			<HomeBarV2>
				<div
					style={{
						height: "100%",
						display: "flex",
						flexDirection: "row",
						alignItems: "flex-end",
					}}>
					<Tabs
						value={"profile"}
						textColor="primary"
						indicatorColor="primary"
						aria-label="secondary tabs example">
						<Tab
							value="profile"
							label={"edit profile"}
							sx={{ fontSize: "25px" }}
						/>
					</Tabs>
				</div>
			</HomeBarV2>
			<div className={styles.main_div}>
				<div className={styles.paper_wrapper}>
					{editingPicture ? (
						<div className={styles.pic_edit_modal}>
							<div className={styles.pic_edit_wrap}>
								<ImageUploadCrop
									isUploadError={isUploadError}
									isUploading={isUploading}
									imageSelected={imageSelected}
									setImageSelected={setImageSelected}
									onCroppedImage={handleCroppedImage}
								/>
							</div>
							<div className={styles.pic_edit_save_cancel}>
								<Button
									startIcon={<CloseRounded />}
									disabled={isUploading}
									sx={{ margin: "15px" }}
									onClick={() => {
										setIsUploadError(false);
										setEditingPicture(false);
										setImageSelected(false);
										setCroppedImage(null);
									}}
									color="error"
									size="large"
									variant="outlined">
									cancel
								</Button>
								<Button
									startIcon={<CheckRounded />}
									onClick={handleImageUpload}
									disabled={!imageSelected || isUploading}
									color={"success"}
									variant="outlined"
									size="large"
									sx={{ margin: "15px" }}>
									{isUploading ? "Submitting" : "Submit"}
								</Button>

								{isUploading && (
									<LinearProgress
										sx={{ position: "absolute", bottom: 0, width: "100%" }}
										color="primary"
									/>
								)}
							</div>
						</div>
					) : null}
					<div className={styles.pic_div}>
						<div className={styles.pic_square}>
							<AvatarSimple
								doNotCache
								username={
									usersStateFromStore ? usersStateFromStore.username : "error"
								}
								type={performer ? "performer" : dj ? "dj" : "promoter"}
								id={Number(usersStateFromStore?.primary_key)}
							/>
						</div>
						<Button
							disabled={formUploadingInProgress}
							onClick={() => {
								setEditingPicture(true);
							}}
							sx={{
								alignSelf: "flex-end",
								marginLeft: "10px",
								marginBottom: "5px",
							}}
							startIcon={<CameraAltRounded />}
							size="large">
							change profile avatar
						</Button>
					</div>
					<div className={styles.edit_info_row}>
						<TextField
							disabled={formUploadingInProgress}
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
							disabled={formUploadingInProgress}
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
							disabled={formUploadingInProgress}
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

					<div className={styles.divider_bottom}>
						<Divider variant="middle" flexItem />
					</div>
					<div className={styles.bottom_div}>
						<Button
							disabled={formUploadingInProgress}
							startIcon={<CloseRounded />}
							size="large"
							color="secondary"
							variant="outlined"
							onClick={handleGoBack}>
							cancel
						</Button>
						<Button
							sx={{
								position: "relative",
								overflow: "hidden",
							}}
							onClick={handleSaveAllData}
							disabled={!canSaveForm || formUploadingInProgress}
							size="large"
							color="success"
							variant="outlined"
							startIcon={<CheckRounded />}>
							save
							{formUploadingInProgress ? (
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

export default ProfileEditing;
