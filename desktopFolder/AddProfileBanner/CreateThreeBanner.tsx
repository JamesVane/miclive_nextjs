/** @format */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { RootState } from "@/store/rootStore";
import {
	setBanner3X10DisplayHelp,
	setBanner3X10,
} from "@/store/createAccountSlice";
import ImageUploadCrop from "@desk/ImageComponents/ImageUploadCrop/ImageUploadCrop";

interface CreateThreeBannerProps {
	holdSrc: any;
	selectDifferentHandle: () => void;
}

function CreateThreeBanner({
	holdSrc,
	selectDifferentHandle,
}: CreateThreeBannerProps) {
	const dispatch = useDispatch();

	const { banner3X10DisplayHelp } = useSelector(
		(state: RootState) => state.createAccount
	);

	const imageSelected = banner3X10DisplayHelp.imageSelected;
	const [refreshUploader, setRefreshUploader] = useState(false);

	const handleCroppedImage = (croppedImageUrl: string) => {
		dispatch(setBanner3X10(croppedImageUrl));
	};

	function handleClickSelect() {
		dispatch(setBanner3X10DisplayHelp({ key: "confirmImage", value: true }));
	}

	return (
		<>
			{!refreshUploader ? (
				<ImageUploadCrop
					forThreeByTen
					threeByTenSrc={holdSrc}
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

export default CreateThreeBanner;
