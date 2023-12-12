/** @format */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setBanner4X10DisplayHelp,
	setBanner3X10DisplayHelp,
	setBanner4X10,
} from "@/store/createAccountSlice";
import { Button } from "@mui/material";
import { Crop } from "react-image-crop";
import ImageUploadCrop from "@desk/ImageComponents/ImageUploadCrop/ImageUploadCrop";
import { RootState } from "@/store/rootStore";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface CreateFourbannerProps {
	nextPage: () => void;
	setThreeByFoursrc: React.Dispatch<React.SetStateAction<any>>;
	selectDifferentHandle: () => void;
}

function CreateFourbanner({
	nextPage,
	setThreeByFoursrc,
	selectDifferentHandle,
}: CreateFourbannerProps) {
	const dispatch = useDispatch();

	const { banner4X10DisplayHelp } = useSelector(
		(state: RootState) => state.createAccount
	);

	const imageSelected = banner4X10DisplayHelp.imageSelected;
	const displayName = banner4X10DisplayHelp.displayName;
	const [refreshUploader, setRefreshUploader] = useState(false);

	const handleCroppedImage = (croppedImageUrl: string) => {
		dispatch(setBanner4X10(croppedImageUrl));
	};

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

export default CreateFourbanner;
