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

interface EditProfileBannerFourMobileProps {
	setBanner4X10DisplayHelp: React.Dispatch<
		React.SetStateAction<{
			imageSelected: boolean;
			displayName: string | null;
			displayURL: string | null;
			confirmImage: boolean;
		}>
	>;
	setBanner3X10DisplayHelp: React.Dispatch<
		React.SetStateAction<{
			imageSelected: boolean;
			displayName: string | null;
			displayURL: string | null;
			confirmImage: boolean;
		}>
	>;
	nextPage: () => void;
	banner4X10DisplayHelp: {
		imageSelected: boolean;
		displayName: string | null;
		displayURL: string | null;
		confirmImage: boolean;
	};
	setMain4: React.Dispatch<React.SetStateAction<string | null>>;
	cropSelectStateBanner: State;
	setCropSelectStateBanner: React.Dispatch<React.SetStateAction<State>>;
	selectDifferentHandle: () => void;
}

function EditProfileBannerFourMobile({
	setBanner4X10DisplayHelp,
	setBanner3X10DisplayHelp,
	nextPage,
	banner4X10DisplayHelp,
	setMain4,
	cropSelectStateBanner,
	setCropSelectStateBanner,
	selectDifferentHandle,
}: EditProfileBannerFourMobileProps) {
	const [notTouched, setNotTouched] = useState(true);
	const [isUploadError, setIsUploadError] = useState(false);

	const displayName = banner4X10DisplayHelp.displayName;
	const confirmImage = banner4X10DisplayHelp.confirmImage;
	const imageSelected = banner4X10DisplayHelp.imageSelected;

	function handleClickSelect() {
		setBanner3X10DisplayHelp((prev) => ({
			...prev,
			imageSelected: true,
		}));

		setBanner3X10DisplayHelp((prev) => ({
			...prev,
			displayName: banner4X10DisplayHelp.displayName,
		}));

		setBanner4X10DisplayHelp((prev) => ({
			...prev,
			confirmImage: true,
		}));
		nextPage();
	}

	return (
		<>
			<ImageUploadCropCreateEventMobile
				firProfile
				fourByTen
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
					setBanner4X10DisplayHelp((prev) => ({
						...prev,
						imageSelected: value,
					}))
				}
				onCroppedImage={setMain4}
				setDisplayURL={(value: string) =>
					setBanner4X10DisplayHelp((prev) => ({
						...prev,
						displayURL: value,
					}))
				}
				setDisplayName={(value: string) =>
					setBanner4X10DisplayHelp((prev) => ({
						...prev,
						displayName: value,
					}))
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

export default EditProfileBannerFourMobile;
