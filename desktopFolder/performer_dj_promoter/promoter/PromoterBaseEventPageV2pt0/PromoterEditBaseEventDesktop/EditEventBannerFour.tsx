/** @format */

import { useState, useEffect } from "react";
import ImageUploadCrop from "@desk/ImageComponents/ImageUploadCrop/ImageUploadCrop";
import { Button } from "@mui/material";
import {
	setEditBanner4X10DisplayHelp,
	setEditBanner3X10DisplayHelp,
	setBanner4X10,
} from "@/store/promoterEditEventSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";

interface EditEventBannerFourProps {
	selectDifferentHandle: () => void;
	nextPage: () => void;
	setThreeByFoursrc: React.Dispatch<React.SetStateAction<any>>;
}

function EditEventBannerFour({
	selectDifferentHandle,
	nextPage,
	setThreeByFoursrc,
}: EditEventBannerFourProps) {
	const dispatch = useDispatch();

	const { banner4X10DisplayHelp } = useSelector(
		(state: RootState) => state.promoterEditEvent
	);

	const imageSelected = banner4X10DisplayHelp.imageSelected;
	const displayName = banner4X10DisplayHelp.displayName;

	const [refreshUploader, setRefreshUploader] = useState(false);

	function handleClickSelect() {
		dispatch(
			setEditBanner3X10DisplayHelp({ key: "imageSelected", value: true })
		);
		dispatch(
			setEditBanner3X10DisplayHelp({ key: "displayName", value: displayName })
		);
		dispatch(
			setEditBanner4X10DisplayHelp({ key: "confirmImage", value: true })
		);
		nextPage();
	}

	const handleCroppedImage = (croppedImageUrl: string) => {
		dispatch(setBanner4X10(croppedImageUrl));
	};

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
							setEditBanner4X10DisplayHelp({
								key: "imageSelected",
								value: value,
							})
						)
					}
					onCroppedImage={handleCroppedImage}
					setDisplayURL={(value: string) =>
						dispatch(
							setEditBanner4X10DisplayHelp({ key: "displayURL", value: value })
						)
					}
					setDisplayName={(value: string) =>
						dispatch(
							setEditBanner4X10DisplayHelp({ key: "displayName", value: value })
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

export default EditEventBannerFour;
