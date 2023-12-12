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
import { RootState } from "@/store/rootStore";
import { useRouter } from "next/navigation";
import { postCreateAccountRoleInfo } from "@/api_functions/postCreateAccountRoleInfo";
import { Auth } from "aws-amplify";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface AddInitialAccountInfoContainerProps {
	isForPurchase?: boolean;
	forDjEventInvite?: boolean;
	forDjDateInvite?: boolean;
	paramsType?: "dj" | "performer" | "promoter";
	paramsKey?: string;
}

function AddInitialAccountInfoContainer({
	isForPurchase,
	forDjEventInvite,
	forDjDateInvite,
	paramsType,
	paramsKey,
}: AddInitialAccountInfoContainerProps) {
	const router = useRouter();
	const dispatch = useDispatch();
	const userType = isForPurchase
		? "performer"
		: forDjEventInvite
		? "dj"
		: forDjDateInvite
		? "dj"
		: paramsType;

	const [isUploadError, setIsUploadError] = useState(false);
	const [notTouched, setNotTouched] = useState(true);
	const [justNavigated, setJustNavigated] = useState(true);
	const [taglineErrorText, setTaglineErrorText] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { imageDisplayHelp, imageFile, tagline } = useSelector(
		(state: RootState) => state.createAccount
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

	function goToNextStep() {
		if (!isDomSafeString(tagline)) {
			setTaglineErrorText("Tagline can not contain '<>'");
			return;
		} else {
			if (isForPurchase) {
				router.push(`/buy_ticket/add_more_info/${paramsKey}`);
			} else if (forDjEventInvite) {
				router.push(`/dj_accept_event/${paramsKey}/add_more_info`);
			} else if (forDjDateInvite) {
				router.push(`/dj_accept_date/${paramsKey}/add_more_info`);
			} else if (userType === "promoter") {
				router.push("/add_banner");
			} else {
				router.push(`/add_more_info/${userType}`);
			}
		}
	}

	async function handleSkip() {
		const currentUser = await Auth.currentAuthenticatedUser();
		const userSub = currentUser.attributes.sub;
		if (
			userType === "performer" ||
			userType === "promoter" ||
			userType === "dj"
		) {
			setIsSubmitting(true);
			postCreateAccountRoleInfo({
				has_no_image: true,
				request_tagline: "",
				request_sub: userSub,
				request_user_type: userType!,
				request_city: null,
				request_phone: null,
				request_email: null,
				request_ig: null,
				request_website: null,
				request_performer_role_key: null,
			}).then(async (res) => {
				const user = await Auth.currentAuthenticatedUser();
				await Auth.updateUserAttributes(user, {
					"custom:RoleId": res.new_id.toString(),
				});

				setIsSubmitting(false);
				dispatch(setCreateAccountDefault());
				if (isForPurchase) {
					router.push(`/buy_ticket/purchase/${paramsKey}`);
				} else if (forDjEventInvite) {
					router.push(`/dj_accept_event/${paramsKey}`);
				} else if (forDjDateInvite) {
					router.push(`/dj_accept_date/${paramsKey}`);
				} else {
					router.push(`/${userType}`);
				}
			});
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
				goToNextStep={goToNextStep}
				isSubmitting={isSubmitting}
				handleSkip={handleSkip}
				accountType={userType as "promoter" | "dj" | "performer"}
			/>
		</div>
	);
}

export default AddInitialAccountInfoContainer;
