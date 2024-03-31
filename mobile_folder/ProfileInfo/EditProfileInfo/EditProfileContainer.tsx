/** @format */

import { useState, useEffect } from "react";
import EditProfileInfo from "./EditProfileInfo";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import _ from "lodash";
import SplashPage from "@/SplashPage";
import { postUploadS3Image } from "@/api_functions_need_to_add_auth/postUploadS3Image";
import { UserProfileResponse } from "@/api_functions/getUserProfile";
import { postUserInfoObj } from "@/api_functions/postUserInfoObj";
import { getUserProfile } from "@/api_functions/getUserProfile";
import { setUsersStateProfile } from "@/store/usersStateStore";
import { postUserTagline } from "@/api_functions/postUserTagline";
import { putUserHasImage } from "@/api_functions/putUserHasImage";
import { Auth } from "aws-amplify";
import {
	isLettersAndSpacesOnly,
	normalizeWhitespace,
	isValidInstagramLink,
	removeWhitespace,
} from "@/validationFunctions";
import { putUpdateUsername } from "@/api_functions/putUpdateUsername";
import { setUsername } from "@/store/usersStateStore";
import { useRouter } from "next/navigation";

interface EditProfileContainerProps {
	performer?: boolean;
	promoter?: boolean;
	dj?: boolean;
	setSuccessfullUpload: React.Dispatch<React.SetStateAction<boolean>>;
	handleBack: () => void;
}

function EditProfileContainer({
	performer,
	promoter,
	dj,
	setSuccessfullUpload,
	handleBack,
}: EditProfileContainerProps) {
	const dispatch = useDispatch();
	const router = useRouter();

	const userState = useSelector((state: RootState) => state.usersState);

	const initUsername = userState?.username || "";
	const initTagline =
		userState && userState.tagline
			? userState.tagline === "EMPTY"
				? ""
				: userState.tagline
			: "";
	const initInstagram = userState?.info?.IG || "";

	const [pictureError, setPictureError] = useState(false);
	const [croppedImage, setCroppedImage] = useState<string | null>(null);
	const [imageSelected, setImageSelected] = useState(false);
	const [isUploadingImage, setIsUploadingImage] = useState(false);
	const [displayName, setDisplayName] = useState("");
	const [displayUrlvalue, setDisplayURLValue] = useState("");
	const [pictureState, setPictureState] = useState("None");
	const [usernameError, setUsernameError] = useState("");
	const [taglineError, setTaglineError] = useState("");
	const [instagramError, setInstagramError] = useState("");
	const [somethingUploading, setSomethingUploading] = useState(false);
	const [taglineValue, setTaglineValue] = useState(initTagline);
	const [instagramValue, setInstagramValue] = useState(initInstagram);
	const [usernameValue, setUsernameValue] = useState(initUsername);

	const [whatIsFocused, setWhatIsFocused] = useState({
		username: false,
		tagline: false,
		instagram: false,
	});

	function handleWhatIsFocused(key: string, value: boolean) {
		setWhatIsFocused((prev) => {
			return { ...prev, [key]: value };
		});
	}

	function handleSetDisplayName(pictureDisplayName: string) {
		setDisplayName(pictureDisplayName);
	}
	function setDisplayURL(pictureDisplayURL: string) {
		setDisplayURLValue(pictureDisplayURL);
	}

	function setPicture(picture: string) {
		setPictureState(picture);
	}

	async function handleUpdateInstagram() {
		let theresAnError = false;
		const payload = { IG: instagramValue } as Partial<UserProfileResponse>;
		const postIgResponse = await postUserInfoObj(payload);
		if (postIgResponse.status === 200) {
			try {
				const user = await Auth.currentAuthenticatedUser();
				const fetchedUserProfile = await getUserProfile();
				const updatedProfile = {
					...fetchedUserProfile,
					info: {
						...fetchedUserProfile?.info,
						...payload,
					},
				} as UserProfileResponse | null;
				dispatch(setUsersStateProfile(updatedProfile));
				theresAnError = false;
				setInstagramError("");
			} catch (err) {
				theresAnError = true;
				setInstagramError("Error updating Instagram");
			}
		} else {
			theresAnError = true;
			setInstagramError("Invalid Instagram link");
		}
		return theresAnError;
	}

	async function updateUserTagline(user: any) {
		let theresAnError = false;
		const postTaglineResponse = await postUserTagline(taglineValue);
		if (postTaglineResponse === "Tagline updated successfully") {
			try {
				const fetchedUserProfile = await getUserProfile();
				const updatedProfile = {
					...fetchedUserProfile,
					tagline: taglineValue,
				} as UserProfileResponse | null;
				dispatch(setUsersStateProfile(updatedProfile));
				theresAnError = false;
				setTaglineError("");
			} catch (err) {
				theresAnError = true;
				setTaglineError(
					"Error uploading tagline. Refresh your page and see if it changed"
				);
			}
		} else {
			theresAnError = true;
			setTaglineError("Error updating tagline");
		}
		return theresAnError;
	}

	async function updateUsername(user: any) {
		let theresAnError = false;
		try {
			const updateUsernameResponse = await putUpdateUsername(usernameValue);
			if (updateUsernameResponse === "Successfully changed username") {
				try {
					await Auth.updateUserAttributes(user, {
						"custom:DisplayUsername": usernameValue,
					});
					theresAnError = false;
					dispatch(setUsername(usernameValue));
					setUsernameError("");
				} catch {
					theresAnError = true;
					setUsernameError("An Error occured while setting username");
				}
			} else if (updateUsernameResponse === "Invalid Username") {
				theresAnError = true;
				setUsernameError("Username is invalid.");
			} else if (updateUsernameResponse === "Username exists") {
				theresAnError = true;
				setUsernameError("This username is already in use.");
			} else if (updateUsernameResponse === "An error occurred") {
				theresAnError = true;
				setUsernameError("An error occured while updating username.");
			} else if (updateUsernameResponse === "Unexpected response code") {
				theresAnError = true;
				setUsernameError(
					"An unexpected error occured while updating username."
				);
			} else {
				theresAnError = true;
				setUsernameError(
					"An unexpected error occured while updating username."
				);
			}
		} catch {
			theresAnError = true;
			setUsernameError("An unexpected error occured while updating username.");
			return;
		}
		return theresAnError;
	}

	function handleImageUpload() {
		const userRoleKey = userState?.primary_key;
		let theresAnError = false;

		if (pictureState !== "None" && userRoleKey) {
			setIsUploadingImage(true);
			try {
				postUploadS3Image(
					pictureState,
					performer
						? `performer_pictures/performer_${userRoleKey}.jpg`
						: promoter
						? `promoter_pictures/promoter_${userRoleKey}.jpg`
						: dj
						? `dj_pictures/dj_${userRoleKey}.jpg`
						: "none"
				)
					.then(async (res) => {
						if (res.data.message == "Image uploaded successfully") {
							try {
								await putUserHasImage();
								setIsUploadingImage(false);
								setImageSelected(false);
								setCroppedImage(null);
								theresAnError = false;
							} catch {
								setPictureError(true);
								setIsUploadingImage(false);
								theresAnError = true;
							}
						} else {
							setPictureError(true);
							setIsUploadingImage(false);
							theresAnError = true;
						}
					})
					.catch(() => {
						setPictureError(true);
						setIsUploadingImage(false);
						theresAnError = true;
					});
			} catch {
				setPictureError(true);
				setIsUploadingImage(false);
				theresAnError = true;
			}
		}
		return theresAnError;
	}

	function validateTagline(inputTagline: string) {
		if (inputTagline !== "") {
			const validCharactersRegex = /^[\w\s\.,!?]+$/;
			const linkRegex = /https?:\/\/[\w.]+/;
			const maxLength = 35;

			if (linkRegex.test(inputTagline)) {
				setTaglineError("Links are not allowed in the tagline.");
			} else if (
				validCharactersRegex.test(inputTagline) &&
				inputTagline.length <= maxLength
			) {
				setTaglineError("");
			} else if (!validCharactersRegex.test(inputTagline)) {
				setTaglineError("Invalid tagline. Only standard characters allowed.");
			} else {
				setTaglineError(
					"Tagline is too long. Maximum length is 35 characters."
				);
			}
		} else {
			setTaglineError("");
		}
	}

	function validateUsername(inputUsername: string) {
		if (inputUsername !== "") {
			const isValidTagline = isLettersAndSpacesOnly(inputUsername);
			if (isValidTagline) {
				setUsernameError("");
			} else {
				setUsernameError("Invalid username. Only letters and spaces.");
			}
		} else {
			setUsernameError("");
		}
	}

	function validateInstagram(inputInstagram: string) {
		const isValidInstagram = isValidInstagramLink(inputInstagram);
		if (isValidInstagram) {
			setInstagramError("");
		} else {
			setInstagramError("Invalid Instagram link.");
		}
	}

	function clearUsername() {
		setUsernameValue("");
		setUsernameError("");
	}

	function clearTagline() {
		setTaglineValue("");
		setTaglineError("");
	}

	function clearInstagram() {
		setInstagramValue("");
		setInstagramError("");
	}

	function handleSetTagline(tagline: string) {
		const trimmedtagline = normalizeWhitespace(tagline);
		setTaglineValue(trimmedtagline);
		validateTagline(trimmedtagline);
	}

	function handleSetInstagram(instagram: string) {
		const noWhitespaceInstagram = removeWhitespace(instagram);
		setInstagramValue(noWhitespaceInstagram);
		validateInstagram(noWhitespaceInstagram);
	}

	function handleSetUsername(username: string) {
		const trimmedUsername = normalizeWhitespace(username);
		setUsernameValue(trimmedUsername);
		validateUsername(trimmedUsername);
	}

	const pictureChanged = pictureState !== "None";
	const instagramChanged = instagramValue !== initInstagram;
	const usernameChanged = usernameValue !== initUsername;
	const taglineChanged = taglineValue !== initTagline;

	const noErrors =
		usernameError === "" && taglineError === "" && instagramError === "";

	const somethingHasChanged =
		instagramChanged || usernameChanged || taglineChanged || pictureChanged;

	const canSaveForm = noErrors && somethingHasChanged;

	async function handleSave() {
		let somethingReturnedAnError = false;
		try {
			const user = await Auth.currentAuthenticatedUser();
		} catch {
			router.push("/sign_in");
			return;
		}
		const user = await Auth.currentAuthenticatedUser();
		if (!somethingUploading) {
			setSomethingUploading(true);
			if (taglineChanged) {
				const taglineResponseStatus = await updateUserTagline(user);
				console.log("taglineResponseStatus:", taglineResponseStatus);
				if (taglineResponseStatus === true) {
					somethingReturnedAnError = true;
				}
			}
			if (usernameChanged) {
				const usernameResponseStatus = await updateUsername(user);
				console.log("usernameResponseStatus:", usernameResponseStatus);
				if (usernameResponseStatus === true) {
					somethingReturnedAnError = true;
				}
			}
			if (instagramChanged) {
				const instagramresponseStatus = await handleUpdateInstagram();
				console.log("instagramresponseStatus:", instagramresponseStatus);
				if (instagramresponseStatus === true) {
					somethingReturnedAnError = true;
				}
			}
			if (pictureChanged) {
				const imageUploadedReturned = await handleImageUpload();
				if (imageUploadedReturned === true) {
					somethingReturnedAnError = true;
				}
			}
			setSomethingUploading(false);
			console.log("somethingReturnedAnError:", somethingReturnedAnError);
			if (!somethingReturnedAnError) {
				handleBack();
			}
		}
	}

	return (
		<>
			{!userState ? (
				<SplashPage />
			) : (
				<EditProfileInfo
					roleType={
						performer
							? "performer"
							: promoter
							? "promoter"
							: dj
							? "dj"
							: "performer"
					}
					setDisplayName={handleSetDisplayName}
					setDisplayURL={setDisplayURL}
					roleKey={userState!.primary_key}
					handleBack={handleBack}
					picture={pictureState}
					pictureDisplayURL={displayUrlvalue}
					pictureDisplayName={displayName}
					setPicture={setPicture}
					pictureError={pictureError}
					setPictureError={setPictureError}
					croppedImage={croppedImage}
					setCroppedImage={setCroppedImage}
					imageSelected={imageSelected}
					setImageSelected={setImageSelected}
					taglineError={taglineError}
					instagramError={instagramError}
					usernameError={usernameError}
					somethingUploading={somethingUploading}
					whatIsFocused={whatIsFocused}
					handleWhatIsFocused={handleWhatIsFocused}
					usernameValue={usernameValue}
					instagramValue={instagramValue}
					taglineValue={taglineValue}
					clearUsername={clearUsername}
					clearTagline={clearTagline}
					clearInstagram={clearInstagram}
					handleSetInstagram={handleSetInstagram}
					handleSetTagline={handleSetTagline}
					handleSetUsername={handleSetUsername}
					canSaveForm={canSaveForm}
					handleSave={handleSave}
				/>
			)}
		</>
	);
}

export default EditProfileContainer;
