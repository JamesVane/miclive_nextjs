/** @format */

import { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ImageUploadCrop from "@desk/ImageComponents/ImageUploadCrop/ImageUploadCrop";
import { RootState } from "@/app/LocalizationProviderHelper";
import {
	setBanner3X10DisplayHelp,
	setBaseEvent,
} from "@/store/promoterCreateEventSlice";
import { CheckRounded, CloseRounded } from "@mui/icons-material";

interface BannerThreeProps {
	holdSrc: any;
	selectDifferentHandle: () => void;
}

function BannerThree({ holdSrc, selectDifferentHandle }: BannerThreeProps) {
	const dispatch = useDispatch();

	const { banner3X10DisplayHelp } = useSelector(
		(state: RootState) => state.promoterCreateEvent
	);

	const imageSelected = banner3X10DisplayHelp.imageSelected;
	const [refreshUploader, setRefreshUploader] = useState(false);

	const handleCroppedImage = (croppedImageUrl: string) => {
		dispatch(setBaseEvent({ key: "banner3X10", value: croppedImageUrl }));
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
				<div style={{ marginBottom: "15px" }}>
					<Button
						startIcon={<CloseRounded />}
						size="large"
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
						startIcon={<CheckRounded />}
						size="large"
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
