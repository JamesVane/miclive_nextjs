/** @format */

import { useState } from "react";
import BannerThree from "./BannerThree";
import BannerFour from "./BannerFour";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { Button } from "@mui/material";
import {
	ArrowBackIosRounded,
	ArrowForwardIosRounded,
} from "@mui/icons-material";
import BothBannersSelected from "./BothBannersSelected";
import CreateEventCrumbsMobile from "./CreateEventCrumbsMobile";
import { switchPage } from "@/store/promoterCreateEventSlice";
import {
	setBanner4X10DisplayHelp,
	setBanner3X10DisplayHelp,
	setBaseEvent,
} from "@/store/promoterCreateEventSlice";
import { Crop } from "react-image-crop";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

function CreateEventBanner() {
	const dispatch = useDispatch();
	const [page, setPage] = useState<1 | 2>(1);

	const { baseEvent, banner3X10DisplayHelp, banner4X10DisplayHelp } =
		useSelector((state: RootState) => state.promoterCreateEvent);
	const threeDisplay = banner3X10DisplayHelp.displayURL;
	const fourDisplay = banner4X10DisplayHelp.displayURL;

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

	const [cropSelectStateBanner, setCropSelectStateBanner] = useState<State>(
		defaultCropSelectStateBanner
	);

	const bothConfirmed =
		banner3X10DisplayHelp.confirmImage && banner4X10DisplayHelp.confirmImage;
	const buttonsAndCrumbsNOTDisplayed =
		!bothConfirmed && cropSelectStateBanner.src;

	function selectDifferentHandle() {
		dispatch(setBanner3X10DisplayHelp({ key: "imageSelected", value: false }));
		dispatch(setBanner3X10DisplayHelp({ key: "displayName", value: null }));
		dispatch(setBanner3X10DisplayHelp({ key: "displayURL", value: null }));
		dispatch(setBaseEvent({ key: "banner3X10", value: null }));
		dispatch(setBanner3X10DisplayHelp({ key: "confirmImage", value: false }));

		dispatch(setBanner4X10DisplayHelp({ key: "imageSelected", value: false }));
		dispatch(setBanner4X10DisplayHelp({ key: "displayName", value: null }));
		dispatch(setBanner4X10DisplayHelp({ key: "displayURL", value: null }));
		dispatch(setBaseEvent({ key: "banner4X10", value: null }));
		dispatch(setBanner4X10DisplayHelp({ key: "confirmImage", value: false }));
		setCropSelectStateBanner(defaultCropSelectStateBanner);
		setPage(1);
	}

	return (
		<>
			{buttonsAndCrumbsNOTDisplayed ? null : (
				<>
					<Button
						onClick={() =>
							dispatch(switchPage({ page: "baseEventDescription" }))
						}
						endIcon={<ArrowForwardIosRounded />}
						variant="outlined"
						sx={{
							position: "fixed",
							right: "10px",
							bottom: "10px",
							zIndex: "600",
						}}>
						Continue
					</Button>
					<Button
						onClick={() => dispatch(switchPage({ page: "baseEvent" }))}
						startIcon={<ArrowBackIosRounded />}
						variant="outlined"
						sx={{
							position: "fixed",
							left: "10px",
							bottom: "10px",
							zIndex: "600",
						}}>
						Back
					</Button>
				</>
			)}

			<></>
			<div
				className={styles.banner_body}
				style={{
					height: buttonsAndCrumbsNOTDisplayed ? "680" : "625px",
				}}>
				{bothConfirmed ? (
					<BothBannersSelected
						fileName={
							banner4X10DisplayHelp.displayName
								? banner4X10DisplayHelp.displayName
								: ""
						}
						selectDifferentHandle={selectDifferentHandle}
						threeDisplay={threeDisplay ? threeDisplay : ""}
						fourDisplay={fourDisplay ? fourDisplay : ""}
					/>
				) : (
					<>
						{page === 1 ? (
							<BannerFour
								cropSelectStateBanner={cropSelectStateBanner}
								setCropSelectStateBanner={setCropSelectStateBanner}
								selectDifferentHandle={selectDifferentHandle}
								nextPage={() => {
									setPage(2);
									setCropSelectStateBanner((prev) => {
										return {
											...prev,
											crop: {
												...prev.crop,
												width: 150,
												height: 50,
												aspect: 3 / 1,
												minWidth: 30,
												minHeight: 10,
												maxWidth: 1500,
												maxHeight: 500,
											},
										};
									});
								}}
							/>
						) : page === 2 ? (
							<BannerThree
								selectDifferentHandle={selectDifferentHandle}
								cropSelectStateBanner={cropSelectStateBanner}
								setCropSelectStateBanner={setCropSelectStateBanner}
							/>
						) : null}
					</>
				)}
			</div>

			{buttonsAndCrumbsNOTDisplayed ? null : <CreateEventCrumbsMobile />}
		</>
	);
}

export default CreateEventBanner;
