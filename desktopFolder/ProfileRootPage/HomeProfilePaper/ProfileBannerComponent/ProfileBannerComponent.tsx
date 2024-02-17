/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootStore";
import { Button, LinearProgress } from "@mui/material";
import { EditRounded, CheckRounded, CloseRounded } from "@mui/icons-material";
// import { useSessionState } from "../../../../custom_hooks/useSessionState";
import EditFourBanner from "./EditFourBanner";
import EditThreeBanner from "./EditThreeBanner";
import BothBannersSelected from "./BothBannersSelected";
import { postUploadS3Image } from "../../../../api_functions/postUploadS3Image";
import { getSignedUrl } from "../../../../api_functions/getAnySignedUrl";
import { setSrc } from "../../../../store/imgStore";
import DividerH from "@/universalComponents/DividerH";

function ProfileBannerComponent() {
	const dispatch = useDispatch();

	const usersStateFromStore = useSelector(
		(state: RootState) => state.usersState
	);

	const [editingProfileBanner, setEditingProfileBanner] = useState(false);
	/* const [editingProfileBanner, setEditingProfileBanner] = useSessionState(
		"editProfilebanner",
		false
	); */

	const [page, setPage] = useState(1);
	// const [page, setPage] = useSessionState("page", 1);

	const [threeByFoursrc, setThreeByFoursrc] = useState<any>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadingError, setUploadingError] = useState(false);

	// const [main4, setMain4] = useSessionState<any>("main4image", null);
	const [main4, setMain4] = useState<any>(null);
	// const [main3, setMain3] = useSessionState<any>("main3image", null);
	const [main3, setMain3] = useState<any>(null);
	const [displayHelp4, setDisplayHelp4] = useState<any>({
		imageSelected: false,
		displayName: null,
		displayURL: null,
		confirmImage: false,
	});
	/* const [displayHelp4, setDisplayHelp4] = useSessionState<any>("displayHelp4", {
		imageSelected: false,
		displayName: null,
		displayURL: null,
		confirmImage: false,
	}); */
	const [displayHelp3, setDisplayHelp3] = useState<any>({
		imageSelected: false,
		displayName: null,
		displayURL: null,
		confirmImage: false,
	});
	/* const [displayHelp3, setDisplayHelp3] = useSessionState<any>("displayHelp3", {
		imageSelected: false,
		displayName: null,
		displayURL: null,
		confirmImage: false,
	}); */

	const bothConfirmed = displayHelp3.confirmImage && displayHelp4.confirmImage;

	const buttonsAndCrumbsNOTDisplayed = !bothConfirmed && threeByFoursrc;

	function selectDifferentHandle() {
		setDisplayHelp3((prev: any) => ({
			...prev,
			imageSelected: false,
			displayName: null,
			displayURL: null,
			confirmImage: false,
		}));
		setDisplayHelp4((prev: any) => ({
			...prev,
			imageSelected: false,
			displayName: null,
			displayURL: null,
			confirmImage: false,
		}));
		setThreeByFoursrc(null);
		setPage(1);
		setMain4(null);
		setMain3(null);
	}

	const threeDisplay = displayHelp3.displayURL;
	const fourDisplay = displayHelp4.displayURL;

	async function postBanner(
		size: "3" | "4",
		croppedImage: any
	): Promise<boolean> {
		try {
			if (usersStateFromStore?.primary_key) {
				const res = await postUploadS3Image(
					croppedImage,
					`promoter_banner_${size}X1/banner_${usersStateFromStore.primary_key}`
				);
				if (res.data.message == "Image uploaded successfully") {
					try {
						const userRoleId = usersStateFromStore.primary_key;
						const signedUrl = await getSignedUrl(
							`promoter${size}X1`,
							userRoleId
						);
						if (signedUrl) {
							dispatch(
								setSrc({
									type: `promoter${size}X1`,
									id: userRoleId,
									url: signedUrl,
								})
							);
						}
					} catch (error: any) {
						throw new Error("Error fetching signed URL:", error);
					}

					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} catch (error: any) {
			return false;
		}
	}

	async function handleImageUpload() {
		setIsUploading(true);
		try {
			const [bannerThreeResponse, bannerFourResponse] = await Promise.all([
				postBanner("3", main3),
				postBanner("4", main4),
			]);

			if (bannerThreeResponse === true && bannerFourResponse === true) {
				setEditingProfileBanner(false);
				selectDifferentHandle();
				setUploadingError(false);
				setIsUploading(false);
			}
		} catch (error) {
			setUploadingError(true);
			setIsUploading(false);
		}
	}

	return (
		<div className={styles.main_div}>
			{editingProfileBanner ? (
				<Button
					disabled={isUploading}
					onClick={() => {
						selectDifferentHandle();
						setEditingProfileBanner(false);
					}}
					startIcon={<CloseRounded />}
					color="secondary"
					sx={{
						position: "absolute",
						top: "5px",
						left: "5px",
					}}>
					cancel
				</Button>
			) : null}
			{editingProfileBanner ? (
				<>
					<div className={styles.header_div}>
						{bothConfirmed
							? "Confirm Profile Banner"
							: page === 1
							? "Large Banner"
							: page === 2
							? "Small Banner"
							: null}
					</div>
					<DividerH />
					<div
						className={styles.banner_body_div}
						style={{
							height: buttonsAndCrumbsNOTDisplayed
								? "calc(100% - 57px)"
								: "calc(100% - 105px)",
						}}>
						{bothConfirmed ? (
							<BothBannersSelected
								isUploading={isUploading}
								fileName={
									displayHelp4.displayName ? displayHelp4.displayName : ""
								}
								selectDifferentHandle={selectDifferentHandle}
								threeDisplay={threeDisplay ? threeDisplay : ""}
								fourDisplay={fourDisplay ? fourDisplay : ""}
							/>
						) : (
							<>
								{page === 1 ? (
									<EditFourBanner
										imageSelected={displayHelp4.imageSelected}
										setMain4={setMain4}
										setBanner3X10DisplayHelp={setDisplayHelp3}
										setBanner4X10DisplayHelp={setDisplayHelp4}
										banner4X10DisplayHelp={displayHelp4}
										selectDifferentHandle={selectDifferentHandle}
										setThreeByFoursrc={setThreeByFoursrc}
										nextPage={() => {
											setPage(2);
										}}
									/>
								) : page === 2 ? (
									<EditThreeBanner
										selectDifferentHandle={selectDifferentHandle}
										holdSrc={threeByFoursrc}
										setBanner3X10DisplayHelp={setDisplayHelp3}
										banner3X10DisplayHelp={displayHelp3}
										setMain3={setMain3}
									/>
								) : null}
							</>
						)}
					</div>
				</>
			) : (
				<>
					<div className={styles.profile_page_banners_text_header}>
						Profile Page Banners
					</div>
					<DividerH />
					<div className={styles.row_div}>4 X 1</div>
					<div className={styles.four_banner}>
						<img
							src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/promoter_banner_4X1/banner_${usersStateFromStore?.primary_key}`}
							style={{ height: "100%", width: "100%" }}
						/>
					</div>
					<div className={styles.row_div}>3 X 1</div>
					<div className={styles.three_banner}>
						<img
							src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/promoter_banner_3X1/banner_${usersStateFromStore?.primary_key}`}
							style={{ height: "100%", width: "100%" }}
						/>
					</div>
					<Button
						onClick={() => setEditingProfileBanner(true)}
						startIcon={<EditRounded />}
						sx={{ marginTop: "10px" }}
						variant="outlined"
						size="large">
						change profile banner
					</Button>
				</>
			)}
			{bothConfirmed ? (
				<div style={{ position: "absolute", bottom: "5px", right: "5px" }}>
					<Button
						disabled={isUploading}
						onClick={handleImageUpload}
						startIcon={<CheckRounded />}
						color="success"
						variant="outlined"
						sx={{ position: "relative", overflow: "hidden" }}>
						{isUploading ? (
							<LinearProgress
								color="success"
								sx={{ position: "absolute", bottom: 0, width: "100%" }}
							/>
						) : null}
						save changes
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default ProfileBannerComponent;
