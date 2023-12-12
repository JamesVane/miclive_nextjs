/** @format */

import { useState } from "react";
import { Button } from "@mui/material";
import ImageUploadCrop from "../../../ImageComponents/ImageUploadCrop/ImageUploadCrop";

interface EditThreeBannerProps {
	holdSrc: any;
	selectDifferentHandle: () => void;
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
	setMain3: React.Dispatch<React.SetStateAction<string | null>>;
}

function EditThreeBanner({
	holdSrc,
	selectDifferentHandle,
	setBanner3X10DisplayHelp,
	banner3X10DisplayHelp,
	setMain3,
}: EditThreeBannerProps) {
	const [refreshUploader, setRefreshUploader] = useState(false);

	const imageSelected = banner3X10DisplayHelp.imageSelected;

	function handleClickSelect() {
		setBanner3X10DisplayHelp((prev) => ({
			...prev,
			confirmImage: true,
		}));
	}

	return (
		<>
			{!refreshUploader ? (
				<ImageUploadCrop
					forThreeByTen
					threeByTenSrc={holdSrc}
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

export default EditThreeBanner;
