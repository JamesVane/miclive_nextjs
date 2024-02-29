/** @format */

import { useState } from "react";
import HomeProfilePaperTop from "./HomeProfilePaperTop";
import ImageUploadCrop from "@desk/ImageComponents/ImageUploadCrop/ImageUploadCrop";
import { setSrc } from "@/store/imgStore";
import { useDispatch, useSelector } from "react-redux";
import { getSignedUrl } from "@/api_functions/getAnySignedUrl";
import { RootState } from "@/app/LocalizationProviderHelper";
import { postUploadS3Image } from "@/api_functions/postUploadS3Image";
import { LinearProgress, Button, Tabs, Tab } from "@mui/material";
import {
	LinkRounded,
	Instagram,
	LocalPhoneRounded,
	EmailRounded,
	ArrowBackIosNewRounded,
	LocationOnRounded,
} from "@mui/icons-material";
import styles from "./styles.module.css";
import ProfileLink from "./ProfileLink";
import HomeBarV2 from "@desk/HomeBarV2";
import { useRouter } from "next/navigation";
import ProfileBannerComponent from "./ProfileBannerComponent";

interface HomeProfilePaperProps {
	performer?: boolean;
	dj?: boolean;
	promoter?: boolean;
}

function HomeProfilePaper({ performer, dj, promoter }: HomeProfilePaperProps) {
	const dispatch = useDispatch();
	const router = useRouter();
	const [editingPicture, setEditingPicture] = useState(false);
	const [imageSelected, setImageSelected] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [isUploadError, setIsUploadError] = useState(false);
	const [croppedImage, setCroppedImage] = useState<string | null>(null);

	const fromUrl = localStorage.getItem("fromUrl");

	const usersStateFromStore = useSelector(
		(state: RootState) => state.usersState
	);

	const handleCroppedImage = (croppedImageUrl: string) => {
		setCroppedImage(croppedImageUrl);
	};

	function handleImageUpload() {
		setIsUploading(true);
		if (croppedImage && usersStateFromStore?.primary_key) {
			try {
				postUploadS3Image(
					croppedImage,
					performer
						? `performer_pictures/performer_${usersStateFromStore.primary_key}.jpg`
						: promoter
						? `promoter_pictures/promoter_${usersStateFromStore.primary_key}.jpg`
						: dj
						? `dj_pictures/dj_${usersStateFromStore.primary_key}.jpg`
						: "none"
				).then(async (res) => {
					if (res.data.message == "Image uploaded successfully") {
						try {
							const userRoleId = usersStateFromStore.primary_key;
							const signedUrl = await getSignedUrl(
								performer
									? "performer"
									: dj
									? "dj"
									: promoter
									? "promoter"
									: "performer",
								userRoleId
							);
							if (signedUrl) {
								dispatch(
									setSrc({
										type: performer
											? "performer"
											: dj
											? "dj"
											: promoter
											? "promoter"
											: "performer",
										id: userRoleId,
										url: signedUrl,
									})
								);
							}
							setIsUploading(false);
							setEditingPicture(false);
							setImageSelected(false);
							setCroppedImage(null);
						} catch (error) {
							console.error("Error fetching signed URL:", error);
							setIsUploadError(true);
							setIsUploading(false);
						}
					} else {
						setIsUploadError(true);
						setIsUploading(false);
					}
				});
			} catch (error) {
				setIsUploadError(true);
				setIsUploading(false);
			}
		}
	}

	async function handleGoBack() {
		if (fromUrl) {
			await new Promise(() => router.push(fromUrl));
			localStorage.removeItem("fromUrl");
		} else {
			router.push(
				`/${performer ? "performer" : promoter ? "promoter" : dj ? "dj" : ""}`
			);
		}
	}

	return (
		<>
			<HomeBarV2 profileOpen>
				<Button
					onClick={handleGoBack}
					startIcon={<ArrowBackIosNewRounded />}
					variant="outlined"
					sx={{ position: "absolute", left: "230px" }}>
					back
				</Button>
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
							label={`${
								promoter
									? "Promoter"
									: performer
									? "Performer"
									: dj
									? "DJ"
									: "ERROR"
							} Profile`}
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
									onClick={handleImageUpload}
									disabled={!imageSelected || isUploading}
									color={"success"}
									variant="contained"
									size="large"
									sx={{ margin: "15px" }}>
									{isUploading ? "Submitting" : "Submit"}
								</Button>
								<Button
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
									variant="contained">
									cancel
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
					<HomeProfilePaperTop
						setEditingPicture={setEditingPicture}
						performer={performer}
						dj={dj}
					/>
					<ProfileLink
						promoter={promoter}
						performer={performer}
						dj={dj}
						type={"City"}
						left={
							<LocationOnRounded
								sx={{ color: "primary.main", height: "70px", width: "70px" }}
							/>
						}
						right={usersStateFromStore?.info?.City ?? "Add City"}
						isEmpty={usersStateFromStore?.info?.City === null}
					/>
					<ProfileLink
						promoter={promoter}
						performer={performer}
						dj={dj}
						type={"Email"}
						left={
							<EmailRounded
								sx={{ color: "primary.main", height: "70px", width: "70px" }}
							/>
						}
						right={usersStateFromStore?.info?.Email ?? "Add Email"}
						isEmpty={usersStateFromStore?.info?.Email === null}
					/>
					<ProfileLink
						promoter={promoter}
						performer={performer}
						dj={dj}
						type={"IG"}
						left={
							<Instagram
								sx={{ color: "primary.main", height: "70px", width: "70px" }}
							/>
						}
						right={usersStateFromStore?.info?.IG ?? "Add Instagram"}
						isEmpty={usersStateFromStore?.info?.IG === null}
						isLink={usersStateFromStore?.info?.IG === null ? false : true}
					/>
					<ProfileLink
						promoter={promoter}
						performer={performer}
						dj={dj}
						type={"Link"}
						left={
							<LinkRounded
								sx={{ color: "primary.main", height: "70px", width: "70px" }}
							/>
						}
						right={usersStateFromStore?.info?.Link ?? "Add Link"}
						isEmpty={usersStateFromStore?.info?.Link ? false : true}
						isLink={usersStateFromStore?.info?.Link === null ? false : true}
					/>
					<ProfileLink
						promoter={promoter}
						performer={performer}
						dj={dj}
						type={"Phone"}
						left={
							<LocalPhoneRounded
								sx={{ color: "primary.main", height: "70px", width: "70px" }}
							/>
						}
						right={usersStateFromStore?.info?.Phone ?? "Add Phone"}
						isEmpty={usersStateFromStore?.info?.Phone === null}
					/>
				</div>
				{promoter ? <ProfileBannerComponent /> : null}
			</div>
		</>
	);
}

export default HomeProfilePaper;
