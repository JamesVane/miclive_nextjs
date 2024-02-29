/** @format */
"use client";

import { useState } from "react";
import AddInitialAccountInfo from "./AddInitialAccountInfo";
import { Crop } from "react-image-crop";
import { useDispatch } from "react-redux";
import {
	setImageDisplayHelp,
	setImageFile,
	setTagline,
	setCreateAccountDefault,
} from "@/store/createAccountSlice";
import { isDomSafeString } from "@/generic_functions/validationFunctions";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import { useRouter } from "next/navigation";
import { Auth } from "aws-amplify";
import { postUserTagline } from "@/api_functions/postUserTagline";
import { postUploadS3Image } from "@/api_functions/postUploadS3Image";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface AddInitialAccountInfoContainerProps {
	paramsType?: "dj" | "performer" | "promoter";
}

function AddInitialAccountInfoContainer({
	paramsType,
}: AddInitialAccountInfoContainerProps) {
	const router = useRouter();
	const dispatch = useDispatch();
	const userType = paramsType;

	const [isUploadError, setIsUploadError] = useState(false);
	const [notTouched, setNotTouched] = useState(true);
	const [justNavigated, setJustNavigated] = useState(true);
	const [taglineErrorText, setTaglineErrorText] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { imageDisplayHelp, imageFile, tagline, userRoldId } = useSelector(
		(state: RootState) => state.createAccountSlice
	);

	const defaultCropSelectState = {
		src: null,
		crop: {
			x: 0,
			y: 0,
			width: 150,
			height: 150,
			aspect: 1,
			unit: "px",
			minWidth: 10,
			minHeight: 10,
			maxWidth: 500,
			maxHeight: 500,
		} as Crop,
		croppedImageUrl: null,
	};

	const [CropSelectstate, setCropSelectState] = useState<State>(
		defaultCropSelectState
	);

	function handleSetConfirmedImageFalse() {
		dispatch(setImageDisplayHelp({ key: "confirmImage", value: false }));
	}

	function handleCroppedImage(croppedImageUrl: string | null) {
		dispatch(setImageFile(croppedImageUrl));
	}

	function checkTaglineInput(str: string) {
		if (/\n/.test(str) || /\t/.test(str) || /\s{2,}/.test(str)) {
			return true;
		} else {
			return false;
		}
	}

	function handleSetTagline(tagline: string) {
		if (checkTaglineInput(tagline)) return;
		setTaglineErrorText("");
		dispatch(setTagline(tagline));
	}

	function handleSetImageSelected(input: boolean) {
		dispatch(
			setImageDisplayHelp({
				key: "imageSelected",
				value: input,
			})
		);
	}

	function handleSetDisplayURL(displayURL: string) {
		dispatch(
			setImageDisplayHelp({
				key: "displayURL",
				value: displayURL,
			})
		);
	}

	function handleSetDisplayName(displayName: string) {
		dispatch(
			setImageDisplayHelp({
				key: "displayName",
				value: displayName,
			})
		);
	}

	function setConfirmImage(input: boolean) {
		dispatch(
			setImageDisplayHelp({
				key: "confirmImage",
				value: input,
			})
		);
	}

	function handleSubmit() {
		if (!isDomSafeString(tagline)) {
			console.log("uhoj");
			setTaglineErrorText("Tagline can not contain '<>'");
			return;
		} else {
			if (
				userType === "performer" ||
				userType === "promoter" ||
				userType === "dj"
			) {
				setIsSubmitting(true);
				postUserTagline(userType, tagline).then(async () => {
					const imagePath = `${userType}_pictures/performer_${userRoldId}.jpg`;
					postUploadS3Image(imageFile, imagePath);

					setIsSubmitting(false);
					dispatch(setCreateAccountDefault());
					router.push(`/${userType}`);
				});
			} else {
				console.log("poop:", paramsType);
			}
		}
	}

	return (
		<div>
			<AddInitialAccountInfo
				CropSelectstate={CropSelectstate}
				setCropSelectState={setCropSelectState}
				defaultCropSelectState={defaultCropSelectState}
				justNavigated={justNavigated}
				setJustNavigated={setJustNavigated}
				notTouched={notTouched}
				setNotTouched={setNotTouched}
				isUploadError={isUploadError}
				setIsUploadError={setIsUploadError}
				handleSetConfirmedImageFalse={handleSetConfirmedImageFalse}
				handleCroppedImage={handleCroppedImage}
				handleSetTagline={handleSetTagline}
				handleSetImageSelected={handleSetImageSelected}
				handleSetDisplayURL={handleSetDisplayURL}
				handleSetDisplayName={handleSetDisplayName}
				setConfirmImage={setConfirmImage}
				tagline={tagline}
				imageFile={imageFile}
				imageDisplayHelp={imageDisplayHelp}
				taglineErrorText={taglineErrorText}
				handleSubmit={handleSubmit}
				isSubmitting={isSubmitting}
				accountType={userType as "promoter" | "dj" | "performer"}
			/>
		</div>
	);
}

export default AddInitialAccountInfoContainer;
