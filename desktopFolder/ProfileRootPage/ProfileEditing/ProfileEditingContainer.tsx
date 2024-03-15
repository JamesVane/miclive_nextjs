/** @format */

import { useState, useEffect } from "react";
import ProfileEditing from "./ProfileEditing";
import { RootState } from "@/app/LocalizationProviderHelper";
import { useDispatch, useSelector } from "react-redux";
import SplashPage from "@/SplashPage";
import { postUploadS3Image } from "@/api_functions/postUploadS3Image";
import { Auth } from "aws-amplify";
import { putUserHasImage } from "@/api_functions/putUserHasImage";
import { setSrc } from "@/store/imgStore";
import { getSignedUrl } from "@/api_functions/getAnySignedUrl";
import { UserProfileResponse } from "@/api_functions/getUserProfile";
import { postUserInfoObj } from "@/api_functions/postUserInfoObj";
import { getUserProfile } from "@/api_functions/getUserProfile";
import { setUsersStateProfile } from "@/store/usersStateStore";
import { postUserTagline } from "@/api_functions/postUserTagline";
import { putUpdateUsername } from "@/api_functions/putUpdateUsername";
import { useRouter } from "next/navigation";
import { setUsername } from "@/store/usersStateStore";

interface ProfileEditingContainerProps {
	promoter: boolean;
	performer: boolean;
	dj: boolean;
	handleGoBack: () => void;
}

function ProfileEditingContainer({
	promoter,
	performer,
	dj,
	handleGoBack,
}: ProfileEditingContainerProps) {
	const dispatch = useDispatch();
	const router = useRouter();

	const usersStateFromStore = useSelector(
		(state: RootState) => state.usersState
	);

	const initUsername = usersStateFromStore?.username || "";
	const initTagline = usersStateFromStore?.tagline || "";
	const initInstagram = usersStateFromStore?.info?.IG || "";

	const [editingPicture, setEditingPicture] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [isUploadError, setIsUploadError] = useState(false);
	const [croppedImage, setCroppedImage] = useState<string | null>(null);
	const [imageSelected, setImageSelected] = useState(false);
	const [taglineValue, setTaglineValue] = useState(initTagline);
	const [taglineError, setTaglineError] = useState("");
	const [usernameValue, setUsernameValue] = useState(initUsername);
	const [usernameError, setUsernameError] = useState("");
	const [instagramValue, setInstagramValue] = useState(initInstagram);
	const [instagramError, setInstagramError] = useState("");
	const [formUploadingInProgress, setFormUploadingInProgress] = useState(false);

	const [whatIsFocused, setWhatIsFocused] = useState({
		username: false,
		tagline: false,
		instagram: false,
	});

	function isLettersAndSpacesOnly(str: string): boolean {
		const regex = /^[A-Za-z\s]+$/;
		return regex.test(str);
	}

	function normalizeWhitespace(str: string): string {
		const regex = /\s+/g;
		return str.replace(regex, " ");
	}

	function isValidInstagramLink(url: string): boolean {
		const regex = /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/;
		return url !== "" ? regex.test(url) : true;
	}

	function removeWhitespace(str: string): string {
		const regex = /\s+/g;
		return str.replace(regex, "");
	}

	async function handleUpdateInstagram() {
		let theresAnError = false;
		const payload = { IG: instagramValue } as Partial<UserProfileResponse>;
		const postIgResponse = await postUserInfoObj(
			performer ? "performer" : promoter ? "promoter" : "dj",
			payload
		);
		if (postIgResponse.status === 200) {
			try {
				const user = await Auth.currentAuthenticatedUser();
				const userId = user.attributes.sub;
				const fetchedUserProfile = await getUserProfile(
					performer ? "performer" : promoter ? "promoter" : "dj",
					userId
				);
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
		const userSub = user.attributes.sub;
		const userType = performer ? "performer" : promoter ? "promoter" : "dj";
		const postTaglineResponse = await postUserTagline(userType, taglineValue);
		if (postTaglineResponse === "Tagline updated successfully") {
			try {
				const fetchedUserProfile = await getUserProfile(userType, userSub);
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
			const userSub = user.attributes.sub;
			const updateUsernameResponse = await putUpdateUsername(
				usernameValue,
				userSub
			);
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
		setIsUploading(true);
		if (croppedImage && usersStateFromStore?.primary_key) {
			try {
				postUploadS3Image(
					croppedImage,
					performer
						? `performer_pictures/performer_${usersStateFromStore.primary_key}.jpg`
						: promoter
						? `promoter_pictures/promoter_${usersStateFromStore.primary_key}.jpg`
						: dj
						? `dj_pictures/dj_${usersStateFromStore.primary_key}.jpg`
						: "none"
				).then(async (res) => {
					if (res.data.message == "Image uploaded successfully") {
						try {
							const userRoleId = usersStateFromStore.primary_key;
							const user = await Auth.currentAuthenticatedUser();
							const userSub = user.attributes.sub;
							await putUserHasImage(userSub);
							const signedUrl = await getSignedUrl(
								performer
									? "performer"
									: dj
									? "dj"
									: promoter
									? "promoter"
									: "performer",
								userRoleId
							);
							if (signedUrl) {
								dispatch(
									setSrc({
										type: performer
											? "performer"
											: dj
											? "dj"
											: promoter
											? "promoter"
											: "performer",
										id: userRoleId,
										url: signedUrl,
									})
								);
							}
							setIsUploading(false);
							setEditingPicture(false);
							setImageSelected(false);
							setCroppedImage(null);
							handleGoBack();
						} catch (error) {
							console.error("Error fetching signed URL:", error);
							setIsUploadError(true);
							setIsUploading(false);
						}
					} else {
						setIsUploadError(true);
						setIsUploading(false);
					}
				});
			} catch (error) {
				setIsUploadError(true);
				setIsUploading(false);
			}
		}
	}

	const handleCroppedImage = (croppedImageUrl: string) => {
		setCroppedImage(croppedImageUrl);
	};

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

	function handleWhatIsFocused(key: string, value: boolean) {
		setWhatIsFocused((prev) => {
			return { ...prev, [key]: value };
		});
	}

	const instagramChanged = instagramValue !== initInstagram;
	const usernameChanged = usernameValue !== initUsername;
	const taglineChanged = taglineValue !== initTagline;

	const noErrors =
		usernameError === "" && taglineError === "" && instagramError === "";

	const somethingHasChanged =
		instagramChanged || usernameChanged || taglineChanged;

	const canSaveForm = noErrors && somethingHasChanged;

	async function handleSaveAllData() {
		let somethingReturnedAnError = false;
		try {
			const user = await Auth.currentAuthenticatedUser();
		} catch {
			router.push("/sign_in");
			return;
		}
		const user = await Auth.currentAuthenticatedUser();
		if (!formUploadingInProgress) {
			setFormUploadingInProgress(true);
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
			setFormUploadingInProgress(false);
			console.log("somethingReturnedAnError:", somethingReturnedAnError);
			if (!somethingReturnedAnError) {
				handleGoBack();
			}
		}
	}

	return (
		<>
			{usersStateFromStore ? (
				<ProfileEditing
					handleGoBack={handleGoBack}
					dj={dj}
					performer={performer}
					promoter={promoter}
					editingPicture={editingPicture}
					isUploadError={isUploadError}
					isUploading={isUploading}
					imageSelected={imageSelected}
					handleImageUpload={handleImageUpload}
					handleCroppedImage={handleCroppedImage}
					setImageSelected={setImageSelected}
					setCroppedImage={setCroppedImage}
					setEditingPicture={setEditingPicture}
					setIsUploadError={setIsUploadError}
					usersStateFromStore={usersStateFromStore}
					handleSetTagline={handleSetTagline}
					taglineValue={taglineValue}
					taglineError={taglineError}
					handleSetUsername={handleSetUsername}
					usernameValue={usernameValue}
					usernameError={usernameError}
					whatIsFocused={whatIsFocused}
					clearUsername={clearUsername}
					clearTagline={clearTagline}
					clearInstagram={clearInstagram}
					instagramValue={instagramValue}
					handleSetInstagram={handleSetInstagram}
					instagramError={instagramError}
					handleWhatIsFocused={handleWhatIsFocused}
					canSaveForm={canSaveForm}
					handleSaveAllData={handleSaveAllData}
					formUploadingInProgress={formUploadingInProgress}
				/>
			) : (
				<SplashPage />
			)}
		</>
	);
}

export default ProfileEditingContainer;
