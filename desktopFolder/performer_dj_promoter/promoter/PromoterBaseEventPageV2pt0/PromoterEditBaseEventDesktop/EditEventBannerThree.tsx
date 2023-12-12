/** @format */

import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ImageUploadCrop from "@desk/ImageComponents/ImageUploadCrop/ImageUploadCrop";
import {
	setEditBanner3X10DisplayHelp,
	setBanner3X10,
} from "@/store/promoterEditEventSlice";
import { RootState } from "@/store/rootStore";

interface EditEventBannerThreeProps {
	holdSrc: any;
	selectDifferentHandle: () => void;
}

function EditEventBannerThree({
	holdSrc,
	selectDifferentHandle,
}: EditEventBannerThreeProps) {
	const dispatch = useDispatch();

	const { banner3X10DisplayHelp, banner4X10DisplayHelp } = useSelector(
		(state: RootState) => state.promoterEditEvent
	);

	const [refreshUploader, setRefreshUploader] = useState(false);

	const imageSelected = banner3X10DisplayHelp.imageSelected;

	const handleCroppedImage = (croppedImageUrl: string) => {
		dispatch(setBanner3X10(croppedImageUrl));
	};

	function handleClickSelect() {
		dispatch(
			setEditBanner3X10DisplayHelp({ key: "confirmImage", value: true })
		);
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

export default EditEventBannerThree;
