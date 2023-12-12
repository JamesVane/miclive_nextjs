/** @format */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploadCropCreateEventMobile from "../AddInitialAccountInfo/ImageUploadCropCreateAccountMobile";
import { RootState } from "../../../store/rootStore";
import {
	setBanner3X10DisplayHelp,
	setBanner3X10,
} from "../../../store/createAccountSlice";
import { Button } from "@mui/material";
import { Crop } from "react-image-crop";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface ThreeBannerMobileProps {
	selectDifferentHandle: () => void;
	cropSelectStateBanner: State;
	setCropSelectStateBanner: React.Dispatch<React.SetStateAction<State>>;
}

function ThreeBannerMobile({
	selectDifferentHandle,
	cropSelectStateBanner,
	setCropSelectStateBanner,
}: ThreeBannerMobileProps) {
	const dispatch = useDispatch();

	const handleCroppedImage = (croppedImageUrl: string) => {
		dispatch(setBanner3X10(croppedImageUrl));
	};

	function handleClickSelect() {
		dispatch(setBanner3X10DisplayHelp({ key: "confirmImage", value: true }));
	}

	const { banner3X10DisplayHelp } = useSelector(
		(state: RootState) => state.createAccount
	);

	const imageSelected = banner3X10DisplayHelp.imageSelected;
	const displayName = banner3X10DisplayHelp.displayName;
	const confirmImage = banner3X10DisplayHelp.confirmImage;

	const [refreshUploader, setRefreshUploader] = useState(false);
	const [notTouched, setNotTouched] = useState(true);
	const [isUploadError, setIsUploadError] = useState(false);

	return (
		<>
			{!refreshUploader ? (
				<ImageUploadCropCreateEventMobile
					forThreeByTen
					firProfile
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

export default ThreeBannerMobile;
