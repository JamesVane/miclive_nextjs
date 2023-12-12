/** @format */
"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import AppBarMobile from "@mobi/AppBarMobile";
import { Button, LinearProgress } from "@mui/material";
import { ArrowBackIosRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import EditProfileBannerThreeMobile from "./EditProfileBannerThreeMobile";
import EditProfileBannerFourMobile from "./EditProfileBannerFourMobile";
import BothBannersSelectedMobile from "./BothBannersSelectedMobile";
import { useSessionState } from "@/custom_hooks/useSessionState";
import { Crop } from "react-image-crop";
import { CheckRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { postUploadS3Image } from "@/api_functions/postUploadS3Image";
import { getSignedUrl } from "@/api_functions/getAnySignedUrl";
import { setSrc } from "@/store/imgStore";
import { imgRequestQueue } from "@/utilityFunctions/requestQueue";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

function EditProfileBanner() {
	const dispatch = useDispatch();
	const router = useRouter();

	const usersStateFromStore = useSelector(
		(state: RootState) => state.usersState
	);

	const [isUploading, setIsUploading] = useState(false);
	const [uploadingError, setUploadingError] = useState(false);
	const [page, setPage] = useSessionState("page", 1);

	function handleClickBack() {
		selectDifferentHandle();
		router.back();
	}

	const [main4, setMain4] = useSessionState<any>("main4image", null);
	const [main3, setMain3] = useSessionState<any>("main3image", null);
	const [displayHelp4, setDisplayHelp4] = useSessionState<any>("displayHelp4", {
		imageSelected: false,
		displayName: null,
		displayURL: null,
		confirmImage: false,
	});
	const [displayHelp3, setDisplayHelp3] = useSessionState<any>("displayHelp3", {
		imageSelected: false,
		displayName: null,
		displayURL: null,
		confirmImage: false,
	});

	const bothConfirmed = displayHelp3.confirmImage && displayHelp4.confirmImage;

	const defaultCropSelectStateBanner = {
		src: null,
		crop: {
			x: 0,
			y: 0,
			width: 200,
			height: 50,
			aspect: 4 / 1,
			unit: "px",
			minWidth: 40,
			minHeight: 10,
			maxWidth: 2000,
			maxHeight: 500,
		} as Crop,
		croppedImageUrl: null,
	};

	const [cropSelectStateBanner, setCropSelectStateBanner] =
		useSessionState<State>(
			"cropSelectStateBanner",
			defaultCropSelectStateBanner
		);

	function handleNextPage() {
		setPage(2);
		setCropSelectStateBanner((prev) => {
			return {
				...prev,
				crop: {
					...prev.crop,
					width: 150,
					aspect: 3 / 1,
					minWidth: 30,
					maxWidth: 1500,
				},
			};
		});
	}

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
		setCropSelectStateBanner(defaultCropSelectStateBanner);
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
					imgRequestQueue.add(async () => {
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
					});
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
				setUploadingError(false);
				setIsUploading(false);
				handleClickBack();
			}
		} catch (error) {
			setUploadingError(true);
			setIsUploading(false);
		}
	}

	return (
		<>
			<AppBarMobile>
				<Button
					disabled={isUploading}
					onClick={handleClickBack}
					sx={{ position: "absolute", left: "0px", top: "0px" }}
					color="secondary"
					size="small"
					startIcon={<ArrowBackIosRounded />}>
					back
				</Button>
				<div>Edit Profile Banner</div>
			</AppBarMobile>
			<div className={styles.main_div}>
				{bothConfirmed ? (
					<BothBannersSelectedMobile
						isUploading={isUploading}
						fileName={displayHelp4.displayName ? displayHelp4.displayName : ""}
						selectDifferentHandle={selectDifferentHandle}
						threeDisplay={threeDisplay ? threeDisplay : ""}
						fourDisplay={fourDisplay ? fourDisplay : ""}
					/>
				) : (
					<>
						{page === 1 ? (
							<EditProfileBannerFourMobile
								cropSelectStateBanner={cropSelectStateBanner}
								setBanner4X10DisplayHelp={setDisplayHelp4}
								setBanner3X10DisplayHelp={setDisplayHelp3}
								nextPage={handleNextPage}
								banner4X10DisplayHelp={displayHelp4}
								setMain4={setMain4}
								setCropSelectStateBanner={setCropSelectStateBanner}
								selectDifferentHandle={selectDifferentHandle}
							/>
						) : page === 2 ? (
							<EditProfileBannerThreeMobile
								setBanner3X10DisplayHelp={setDisplayHelp3}
								banner3X10DisplayHelp={displayHelp3}
								selectDifferentHandle={selectDifferentHandle}
								setMain3={setMain3}
								cropSelectStateBanner={cropSelectStateBanner}
								setCropSelectStateBanner={setCropSelectStateBanner}
							/>
						) : null}
					</>
				)}
				{bothConfirmed ? (
					<div className={styles.submit_button_div}>
						<Button
							size="large"
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
		</>
	);
}

export default EditProfileBanner;
