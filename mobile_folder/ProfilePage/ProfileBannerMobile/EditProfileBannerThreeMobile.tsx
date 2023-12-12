/** @format */

import { useState } from "react";
import { Button } from "@mui/material";
import { Crop } from "react-image-crop";
import ImageUploadCropCreateEventMobile from "@mobi/StartPage/AddInitialAccountInfo/ImageUploadCropCreateAccountMobile";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface EditProfileBannerThreeMobileProps {
	setBanner3X10DisplayHelp: React.Dispatch<
		React.SetStateAction<{
			imageSelected: boolean;
			displayName: string | null;
			displayURL: string | null;
			confirmImage: boolean;
		}>
	>;
	banner3X10DisplayHelp: {
		imageSelected: boolean;
		displayName: string | null;
		displayURL: string | null;
		confirmImage: boolean;
	};
	selectDifferentHandle: () => void;
	setMain3: React.Dispatch<React.SetStateAction<string | null>>;
	cropSelectStateBanner: State;
	setCropSelectStateBanner: React.Dispatch<React.SetStateAction<State>>;
}

function EditProfileBannerThreeMobile({
	setBanner3X10DisplayHelp,
	banner3X10DisplayHelp,
	selectDifferentHandle,
	setMain3,
	cropSelectStateBanner,
	setCropSelectStateBanner,
}: EditProfileBannerThreeMobileProps) {
	const [refreshUploader, setRefreshUploader] = useState(false);
	const [notTouched, setNotTouched] = useState(true);
	const [isUploadError, setIsUploadError] = useState(false);

	const imageSelected = banner3X10DisplayHelp.imageSelected;
	const confirmImage = banner3X10DisplayHelp.confirmImage;
	const displayName = banner3X10DisplayHelp.displayName;

	function handleClickSelect() {
		setBanner3X10DisplayHelp((prev) => ({
			...prev,
			confirmImage: true,
		}));
	}

	return (
		<>
			{!refreshUploader ? (
				<ImageUploadCropCreateEventMobile
					forThreeByTen
					firProfile
					setConfirmedImageFalse={() => {
						setBanner3X10DisplayHelp((prev) => ({
							...prev,
							confirmImage: false,
						}));
					}}
					confirmedImage={confirmImage}
					CropSelectstate={cropSelectStateBanner}
					setCropSelectState={setCropSelectStateBanner}
					isUploadError={isUploadError}
					setNotTouched={setNotTouched}
					notTouched={notTouched}
					imageSelected={imageSelected}
					setImageSelected={(value: boolean) =>
						setBanner3X10DisplayHelp((prev) => ({
							...prev,
							imageSelected: value,
						}))
					}
					onCroppedImage={setMain3}
					setDisplayURL={(value: string) =>
						setBanner3X10DisplayHelp((prev) => ({
							...prev,
							displayURL: value,
						}))
					}
					setDisplayName={(value: string) =>
						setBanner3X10DisplayHelp((prev) => ({
							...prev,
							displayName: value,
						}))
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

export default EditProfileBannerThreeMobile;
