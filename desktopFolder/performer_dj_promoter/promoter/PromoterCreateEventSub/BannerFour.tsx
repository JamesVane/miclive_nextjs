/** @format */

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ImageUploadCrop from "@desk/ImageComponents/ImageUploadCrop/ImageUploadCrop";
import { RootState } from "@/app/LocalizationProviderHelper";
import {
	setBanner4X10DisplayHelp,
	setBanner3X10DisplayHelp,
	setBaseEvent,
} from "@/store/promoterCreateEventSlice";
import { CheckRounded, CloseRounded } from "@mui/icons-material";

interface BannerFourProps {
	nextPage: () => void;
	setThreeByFoursrc: React.Dispatch<React.SetStateAction<any>>;
	selectDifferentHandle: () => void;
}

function BannerFour({
	nextPage,
	setThreeByFoursrc,
	selectDifferentHandle,
}: BannerFourProps) {
	const dispatch = useDispatch();

	const { banner4X10DisplayHelp } = useSelector(
		(state: RootState) => state.promoterCreateEvent
	);

	const imageSelected = banner4X10DisplayHelp.imageSelected;
	const displayName = banner4X10DisplayHelp.displayName;
	const [refreshUploader, setRefreshUploader] = useState(false);

	const handleCroppedImage = (croppedImageUrl: string) => {
		dispatch(setBaseEvent({ key: "banner4X10", value: croppedImageUrl }));
	};

	function handleClickSelect() {
		dispatch(setBanner3X10DisplayHelp({ key: "imageSelected", value: true }));
		dispatch(
			setBanner3X10DisplayHelp({ key: "displayName", value: displayName })
		);
		dispatch(setBanner4X10DisplayHelp({ key: "confirmImage", value: true }));
		nextPage();
	}

	useEffect(() => {
		if (refreshUploader) {
			setRefreshUploader(false);
		}
	}, [refreshUploader]);

	return (
		<>
			{!refreshUploader ? (
				<ImageUploadCrop
					setHoldSrc={setThreeByFoursrc}
					fourByTen
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

export default BannerFour;
