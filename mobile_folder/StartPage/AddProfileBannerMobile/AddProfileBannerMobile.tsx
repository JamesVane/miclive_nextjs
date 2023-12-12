/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Divider, Button } from "@mui/material";
import FourBannerMobile from "./FourBannerMobile";
import ThreeBannerMobile from "./ThreeBannerMobile";
import BothBannersSelectedMobile from "./BothBannersSelectedMobile";
import { Crop } from "react-image-crop";
import {
	ArrowForwardIosRounded,
	ArrowBackIosRounded,
} from "@mui/icons-material";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface AddProfileBannerMobileProps {
	handleBack: () => void;
	page: number;
	selectDifferentHandle: () => void;
	cropSelectStateBanner: State;
	setCropSelectStateBanner: React.Dispatch<React.SetStateAction<State>>;
	bothConfirmed: boolean;
	banner4X10DisplayHelpDisplayName: string;
	threeDisplay: string;
	fourDisplay: string;
	buttonsAndCrumbsNOTDisplayed: boolean;
	handleNextPage: () => void;
	goToNextStep: () => void;
}

function AddProfileBannerMobile({
	handleBack,
	page,
	selectDifferentHandle,
	cropSelectStateBanner,
	setCropSelectStateBanner,
	bothConfirmed,
	banner4X10DisplayHelpDisplayName,
	threeDisplay,
	fourDisplay,
	buttonsAndCrumbsNOTDisplayed,
	handleNextPage,
	goToNextStep,
}: AddProfileBannerMobileProps) {
	return (
		<>
			<div className={styles.top_banner}>
				{bothConfirmed
					? "Confirm Profile Banners"
					: page === 1
					? "Large Profile Banner"
					: page === 2
					? "Normal Profile Banner"
					: null}{" "}
			</div>
			<div className={styles.divider_div}>
				<Divider variant="middle" flexItem />
			</div>
			<div
				className={styles.banner_body}
				style={{
					height: buttonsAndCrumbsNOTDisplayed
						? "calc(100% - 42px)"
						: "calc(100% - 92px)",
				}}>
				{bothConfirmed ? (
					<BothBannersSelectedMobile
						fileName={banner4X10DisplayHelpDisplayName}
						selectDifferentHandle={selectDifferentHandle}
						threeDisplay={threeDisplay ? threeDisplay : ""}
						fourDisplay={fourDisplay ? fourDisplay : ""}
					/>
				) : (
					<>
						{page === 1 ? (
							<FourBannerMobile
								cropSelectStateBanner={cropSelectStateBanner}
								setCropSelectStateBanner={setCropSelectStateBanner}
								selectDifferentHandle={selectDifferentHandle}
								nextPage={handleNextPage}
							/>
						) : page === 2 ? (
							<ThreeBannerMobile
								selectDifferentHandle={selectDifferentHandle}
								setCropSelectStateBanner={setCropSelectStateBanner}
								cropSelectStateBanner={cropSelectStateBanner}
							/>
						) : null}
					</>
				)}
			</div>
			{buttonsAndCrumbsNOTDisplayed ? null : (
				<>
					<Button
						onClick={handleBack}
						sx={{ position: "fixed", left: 10, bottom: 10 }}
						startIcon={<ArrowBackIosRounded />}
						size="large"
						variant="outlined"
						color="secondary">
						Back
					</Button>
					<Button
						onClick={goToNextStep}
						disabled={!bothConfirmed}
						sx={{ position: "fixed", right: 10, bottom: 10 }}
						endIcon={<ArrowForwardIosRounded />}
						size="large"
						variant="outlined"
						color="success">
						Continue
					</Button>
				</>
			)}
		</>
	);
}

export default AddProfileBannerMobile;
