/** @format */

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { RootState } from "@/app/LocalizationProviderHelper";
import { useDispatch, useSelector } from "react-redux";
import {
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

interface BannerThreeProps {
	selectDifferentHandle: () => void;
	cropSelectStateBanner: State;
	setCropSelectStateBanner: React.Dispatch<React.SetStateAction<State>>;
}

function BannerThree({
	selectDifferentHandle,
	cropSelectStateBanner,
	setCropSelectStateBanner,
}: BannerThreeProps) {
	const dispatch = useDispatch();

	const { baseEvent, banner3X10DisplayHelp } = useSelector(
		(state: RootState) => state.promoterCreateEvent
	);

	const imageSelected = banner3X10DisplayHelp.imageSelected;
	const displayName = banner3X10DisplayHelp.displayName;
	const confirmImage = banner3X10DisplayHelp.confirmImage;

	const [refreshUploader, setRefreshUploader] = useState(false);
	const [notTouched, setNotTouched] = useState(true);
	const [isUploadError, setIsUploadError] = useState(false);

	const handleCroppedImage = (croppedImageUrl: string) => {
		dispatch(setBaseEvent({ key: "banner3X10", value: croppedImageUrl }));
	};

	function handleClickSelect() {
		dispatch(setBanner3X10DisplayHelp({ key: "confirmImage", value: true }));
	}

	useEffect(() => {
		if (refreshUploader) {
			setRefreshUploader(false);
		}
	}, [refreshUploader]);

	return (
		<>
			{!refreshUploader ? (
				<ImageUploadCropCreateEventMobile
					forThreeByTen
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
							setBanner3X10DisplayHelp({
								key: "imageSelected",
								value: value,
							})
						)
					}
					onCroppedImage={handleCroppedImage}
					setDisplayURL={(value: string) =>
						dispatch(
							setBanner3X10DisplayHelp({ key: "displayURL", value: value })
						)
					}
					setDisplayName={(value: string) =>
						dispatch(
							setBanner3X10DisplayHelp({ key: "displayName", value: value })
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

export default BannerThree;
