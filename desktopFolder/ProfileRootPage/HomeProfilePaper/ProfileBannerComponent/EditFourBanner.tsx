/** @format */

import { useState } from "react";
import { Button } from "@mui/material";
import ImageUploadCrop from "../../../ImageComponents/ImageUploadCrop/ImageUploadCrop";

interface EditFourBannerProps {
	nextPage: () => void;
	setThreeByFoursrc: React.Dispatch<React.SetStateAction<any>>;
	selectDifferentHandle: () => void;
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
	imageSelected: boolean;
	setMain4: React.Dispatch<React.SetStateAction<string | null>>;
	banner4X10DisplayHelp: {
		imageSelected: boolean;
		displayName: string | null;
		displayURL: string | null;
		confirmImage: boolean;
	};
}

function EditFourBanner({
	nextPage,
	setThreeByFoursrc,
	selectDifferentHandle,
	setBanner4X10DisplayHelp,
	setBanner3X10DisplayHelp,
	imageSelected,
	setMain4,
	banner4X10DisplayHelp,
}: EditFourBannerProps) {
	const [refreshUploader, setRefreshUploader] = useState(false);

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
			{!refreshUploader ? (
				<ImageUploadCrop
					setHoldSrc={setThreeByFoursrc}
					fourByTen
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

export default EditFourBanner;
