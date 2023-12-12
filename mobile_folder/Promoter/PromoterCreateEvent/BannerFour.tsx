/** @format */
import React, { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import {
	setBanner4X10DisplayHelp,
	setBanner3X10DisplayHelp,
	setBaseEvent,
} from "@/store/promoterCreateEventSlice";
import ImageUploadCropCreateEventMobile from "./ImageUploadCropCreateEventMobile";
import { Crop } from "react-image-crop";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface BannerFourProps {
	nextPage: () => void;
	selectDifferentHandle: () => void;
	cropSelectStateBanner: State;
	setCropSelectStateBanner: React.Dispatch<React.SetStateAction<State>>;
}

function BannerFour({
	nextPage,
	selectDifferentHandle,
	cropSelectStateBanner,
	setCropSelectStateBanner,
}: BannerFourProps) {
	const dispatch = useDispatch();

	const { banner4X10DisplayHelp } = useSelector(
		(state: RootState) => state.promoterCreateEvent
	);

	const imageSelected = banner4X10DisplayHelp.imageSelected;
	const displayName = banner4X10DisplayHelp.displayName;
	const confirmImage = banner4X10DisplayHelp.confirmImage;
	const [refreshUploader, setRefreshUploader] = useState(false);
	const [notTouched, setNotTouched] = useState(true);
	const [isUploadError, setIsUploadError] = useState(false);

	const handleCroppedImage = (croppedImageUrl: string) => {
		dispatch(setBaseEvent({ key: "banner4X10", value: croppedImageUrl }));
	};

	function handleClickSelect() {
		dispatch(setBanner3X10DisplayHelp({ key: "imageSelected", value: true }));
		dispatch(
			setBanner3X10DisplayHelp({ key: "displayName", value: displayName })
		);
		dispatch(setBanner4X10DisplayHelp({ key: "confirmImage", value: true }));
		nextPage();
	}

	return (
		<>
			{!refreshUploader ? (
				<ImageUploadCropCreateEventMobile
					fourByTen
					setConfirmedImageFalse={() => {
						dispatch(
							setBanner3X10DisplayHelp({ key: "confirmImage", value: false })
						);
					}}
					confirmedImage={confirmImage}
					CropSelectstate={cropSelectStateBanner}
					setCropSelectState={setCropSelectStateBanner}
					isUploadError={isUploadError}
					setNotTouched={setNotTouched}
					notTouched={notTouched}
					imageSelected={imageSelected}
					setImageSelected={(value: boolean) =>
						dispatch(
							setBanner4X10DisplayHelp({
								key: "imageSelected",
								value: value,
							})
						)
					}
					onCroppedImage={handleCroppedImage}
					setDisplayURL={(value: string) =>
						dispatch(
							setBanner4X10DisplayHelp({ key: "displayURL", value: value })
						)
					}
					setDisplayName={(value: string) =>
						dispatch(
							setBanner4X10DisplayHelp({ key: "displayName", value: value })
						)
					}
					displayName={displayName}
				/>
			) : null}
			{imageSelected ? (
				<div style={{ marginBottom: "-5px", marginTop: "5px" }}>
					<Button
						sx={{ marginRight: "15px" }}
						variant="outlined"
						color="error"
						onClick={() => {
							setRefreshUploader(true);
							selectDifferentHandle();
							setNotTouched(true);
						}}>
						Cancel
					</Button>
					<Button
						color="success"
						sx={{ marginLeft: "15px" }}
						variant="outlined"
						onClick={handleClickSelect}>
						Select
					</Button>
				</div>
			) : null}
		</>
	);
}

export default BannerFour;
