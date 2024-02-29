/** @format */

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ImageUploadCropCreateEventMobile from "../PromoterCreateEvent/ImageUploadCropCreateEventMobile";
import {
	setEditBanner4X10DisplayHelp,
	setEditBanner3X10DisplayHelp,
	setBanner3X10,
} from "@/store/promoterEditEventSlice";
import { RootState } from "@/app/LocalizationProviderHelper";
import { Crop } from "react-image-crop";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface EditEventThreeBannerMobileProps {
	selectDifferentHandle: () => void;
	cropSelectStateBanner: State;
	setCropSelectStateBanner: React.Dispatch<React.SetStateAction<State>>;
}

function EditEventThreeBannerMobile({
	selectDifferentHandle,
	cropSelectStateBanner,
	setCropSelectStateBanner,
}: EditEventThreeBannerMobileProps) {
	const dispatch = useDispatch();

	const { banner3X10DisplayHelp } = useSelector(
		(state: RootState) => state.promoterEditEvent
	);

	const [refreshUploader, setRefreshUploader] = useState(false);
	const [notTouched, setNotTouched] = useState(true);
	const [isUploadError, setIsUploadError] = useState(false);

	const imageSelected = banner3X10DisplayHelp.imageSelected;
	const displayName = banner3X10DisplayHelp.displayName;
	const confirmImage = banner3X10DisplayHelp.confirmImage;

	function handleClickSelect() {
		dispatch(
			setEditBanner3X10DisplayHelp({ key: "confirmImage", value: true })
		);
	}

	const handleCroppedImage = (croppedImageUrl: string) => {
		dispatch(setBanner3X10(croppedImageUrl));
	};

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
							setEditBanner3X10DisplayHelp({
								key: "confirmImage",
								value: false,
							})
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
							setEditBanner3X10DisplayHelp({
								key: "imageSelected",
								value: value,
							})
						)
					}
					onCroppedImage={handleCroppedImage}
					setDisplayURL={(value: string) =>
						dispatch(
							setEditBanner3X10DisplayHelp({ key: "displayURL", value: value })
						)
					}
					setDisplayName={(value: string) =>
						dispatch(
							setEditBanner3X10DisplayHelp({ key: "displayName", value: value })
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

export default EditEventThreeBannerMobile;
