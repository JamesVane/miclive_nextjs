/** @format */

import React, { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	setBanner4X10DisplayHelp,
	setBanner3X10DisplayHelp,
	setBanner4X10,
} from "../../../store/createAccountSlice";
import { RootState } from "../../../store/rootStore";
import ImageUploadCropCreateEventMobile from "../AddInitialAccountInfo/ImageUploadCropCreateAccountMobile";
import { Crop } from "react-image-crop";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface FourBannerMobileProps {
	nextPage: () => void;
	selectDifferentHandle: () => void;
	cropSelectStateBanner: State;
	setCropSelectStateBanner: React.Dispatch<React.SetStateAction<State>>;
}

function FourBannerMobile({
	nextPage,
	selectDifferentHandle,
	cropSelectStateBanner,
	setCropSelectStateBanner,
}: FourBannerMobileProps) {
	const dispatch = useDispatch();

	const handleCroppedImage = (croppedImageUrl: string) => {
		dispatch(setBanner4X10(croppedImageUrl));
	};

	const { banner4X10DisplayHelp } = useSelector(
		(state: RootState) => state.createAccount
	);

	const imageSelected = banner4X10DisplayHelp.imageSelected;
	const displayName = banner4X10DisplayHelp.displayName;
	const confirmImage = banner4X10DisplayHelp.confirmImage;
	/* const [refreshUploader, setRefreshUploader] = useState(false); */
	const [notTouched, setNotTouched] = useState(true);
	const [isUploadError, setIsUploadError] = useState(false);

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
			<ImageUploadCropCreateEventMobile
				firProfile
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
			{imageSelected ? (
				<div style={{ marginBottom: "-5px", marginTop: "5px" }}>
					<Button
						sx={{ marginRight: "15px" }}
						variant="outlined"
						color="error"
						onClick={() => {
							// setRefreshUploader(true);
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

export default FourBannerMobile;
