/** @format */

import { useState, useEffect } from "react";
import EditProfileInfo from "./EditProfileInfo";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import {
	setInitInfo,
	setPicNameTagline,
	setLinks,
} from "@/store/editProfileInfoMobileSlice";
import _ from "lodash";
import SplashPage from "@/SplashPage";
import { postUploadS3Image } from "@/api_functions/postUploadS3Image";
import { getSignedUrl } from "@/api_functions/getAnySignedUrl";
import { setSrc } from "@/store/imgStore";
import { UserProfileResponse } from "@/api_functions/getUserProfile";
import { postUserInfoObj } from "@/api_functions/postUserInfoObj";
import { getUserProfile } from "@/api_functions/getUserProfile";
import { setUsersStateProfile } from "@/store/usersStateStore";
import { postUserTagline } from "@/api_functions/postUserTagline";
import { putUserHasImage } from "@/api_functions/putUserHasImage";
import { Auth } from "aws-amplify";

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

	const [invalidTagline, setInvalidTagline] = useState("");
	const [pictureError, setPictureError] = useState(false);
	const [croppedImage, setCroppedImage] = useState<string | null>(null);
	const [imageSelected, setImageSelected] = useState(false);
	const [isUploadingImage, setIsUploadingImage] = useState(false);
	const [isUploadingInfo, setIsUploadingInfo] = useState(false);
	const [isUploadingTagline, setIsUploadingTagline] = useState(false);
	const [taglineError, setTaglineError] = useState(false);
	const [infoError, setInfoError] = useState(false);

	const somethingUploading =
		isUploadingImage || isUploadingInfo || isUploadingTagline;

	function setTagline(tagline: string) {
		dispatch(setPicNameTagline({ key: "tagline", value: tagline }));
	}
	function setCity(City: string) {
		dispatch(setLinks({ key: "City", value: City }));
	}
	function setEmail(Email: string) {
		dispatch(setLinks({ key: "Email", value: Email }));
	}
	function setIG(IG: string) {
		dispatch(setLinks({ key: "IG", value: IG }));
	}
	function setLink(Link: string) {
		dispatch(setLinks({ key: "Link", value: Link }));
	}
	function setPhone(Phone: string) {
		dispatch(setLinks({ key: "Phone", value: Phone }));
	}
	function setPicture(picture: string) {
		console.log("setPicture", picture);
		dispatch(setPicNameTagline({ key: "picture", value: picture }));
	}
	function setDisplayName(pictureDisplayName: string) {
		dispatch(
			setPicNameTagline({
				key: "pictureDisplayName",
				value: pictureDisplayName,
			})
		);
	}
	function setDisplayURL(pictureDisplayURL: string) {
		dispatch(
			setPicNameTagline({ key: "pictureDisplayURL", value: pictureDisplayURL })
		);
	}

	const [isInitializing, setIsInitializing] = useState<boolean>(true);

	const userState = useSelector((state: RootState) => state.usersState);
	const editProfileInfoMobile = useSelector(
		(state: RootState) => state.editProfileInfoMobile
	);

	const currentUsername = userState?.username ? userState.username : "";
	const currentTagline = userState?.tagline ? userState.tagline : "";
	const currentInfo = {
		City: userState?.info?.City ? userState.info.City : "",
		Email: userState?.info?.Email ? userState.info.Email : "",
		Phone: userState?.info?.Phone ? userState.info.Phone : "",
		IG: userState?.info?.IG ? userState.info.IG : "",
		Link: userState?.info?.Link ? userState.info.Link : "",
	};

	useEffect(() => {
		dispatch(
			setInitInfo({
				picture: "None",
				pictureDisplayURL: "None",
				pictureDisplayName: "None",
				name: currentUsername,
				tagline: currentTagline,
				links: currentInfo,
			})
		);
		setIsInitializing(false);
	}, []);

	function validateTagline(inputTagline: string) {
		const validCharactersRegex = /^[\w\s\.,!?]+$/;
		const linkRegex = /https?:\/\/[\w.]+/;
		const maxLength = 35;

		if (linkRegex.test(inputTagline)) {
			setInvalidTagline("Links are not allowed in the tagline.");
		} else if (
			validCharactersRegex.test(inputTagline) &&
			inputTagline.length <= maxLength
		) {
			setInvalidTagline("");
		} else if (!validCharactersRegex.test(inputTagline)) {
			setInvalidTagline("Invalid tagline. Only standard characters allowed.");
		} else {
			setInvalidTagline(
				"Tagline is too long. Maximum length is 35 characters."
			);
		}
	}

	function handleImageUpload() {
		const selectedPicture = editProfileInfoMobile.picture;
		const userRoleKey = userState?.primary_key;

		if (selectedPicture !== "None" && userRoleKey) {
			setIsUploadingImage(true);
			try {
				postUploadS3Image(
					selectedPicture,
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
									userRoleKey
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
											id: userRoleKey,
											url: signedUrl,
										})
									);
								}
								setIsUploadingImage(false);
								setImageSelected(false);
								setCroppedImage(null);
							} catch (error) {
								console.error("Error fetching signed URL:", error);
								setPictureError(true);
								setIsUploadingImage(false);
							}
						} else {
							setPictureError(true);
							setIsUploadingImage(false);
						}
					})
					.catch((err) => {
						setPictureError(true);
						setIsUploadingImage(false);
					});
			} catch (error) {
				setPictureError(true);
				setIsUploadingImage(false);
			}
		}
	}

	async function updateUserInfoObj(payload: Partial<UserProfileResponse>) {
		const user = await Auth.currentAuthenticatedUser();
		const userRoleKey = user.attributes.sub;
		postUserInfoObj(
			performer ? "performer" : promoter ? "promoter" : "dj",
			payload
		)
			.then(async (res) => {
				if (
					res.message ===
					`Updated ${
						performer ? "performer" : promoter ? "promoter" : "dj"
					} with id ${userRoleKey}`
				) {
					try {
						const fetchedUserProfile = await getUserProfile(
							performer ? "performer" : promoter ? "promoter" : "dj",
							userRoleKey
						);
						const updatedProfile = {
							...fetchedUserProfile,
							info: {
								...fetchedUserProfile?.info,
								...payload,
							},
						} as UserProfileResponse | null;
						dispatch(setUsersStateProfile(updatedProfile));
					} catch (err) {
						setInfoError(true);
					}
				} else {
					setInfoError(true);
				}
			})
			.catch((err) => {
				setInfoError(true);
			});
	}

	async function handleInfoSubmit(
		type: "City" | "Email" | "IG" | "Phone" | "Link",
		value: string
	) {
		if (value !== "") {
			await updateUserInfoObj({ [type]: value });
		}
	}

	async function updateUserTagline() {
		const currentTagline = editProfileInfoMobile.tagline;
		const user = await Auth.currentAuthenticatedUser();
		const userId = user.attributes.sub;
		const userRoleKey = userId;
		const userType = performer ? "performer" : promoter ? "promoter" : "dj";
		setIsUploadingTagline(true);

		postUserTagline(userType, currentTagline)
			.then(async (res) => {
				if (res === 200) {
					try {
						const fetchedUserProfile = await getUserProfile(
							userType,
							userRoleKey
						);
						const updatedProfile = {
							...fetchedUserProfile,
							tagline: currentTagline,
						} as UserProfileResponse | null;
						dispatch(setUsersStateProfile(updatedProfile));
						setIsUploadingTagline(false);
					} catch (err) {
						setIsUploadingTagline(true);
						setTaglineError(true);
					}
				} else {
					setTaglineError(true);
					setIsUploadingTagline(true);
				}
			})
			.catch((err) => {
				setIsUploadingTagline(true);
				setTaglineError(true);
			});
	}

	async function handleSubmitUpdates() {
		if (editProfileInfoMobile.picture !== "None") {
			console.log(
				"editProfileInfoMobile.picture",
				editProfileInfoMobile.picture
			);
			handleImageUpload();
		}
		if (editProfileInfoMobile.tagline !== "None") {
			updateUserTagline();
		}
		setIsUploadingInfo(true);
		await handleInfoSubmit("City", editProfileInfoMobile.links.City).then(
			async () => {
				await handleInfoSubmit("Email", editProfileInfoMobile.links.Email).then(
					async () => {
						await handleInfoSubmit("IG", editProfileInfoMobile.links.IG).then(
							async () => {
								await handleInfoSubmit(
									"Phone",
									editProfileInfoMobile.links.Phone
								).then(async () => {
									await handleInfoSubmit(
										"Link",
										editProfileInfoMobile.links.Link
									).then(async () => {
										setIsUploadingInfo(false);
										if (!taglineError && !pictureError && !infoError) {
											setSuccessfullUpload(true);
											handleBack();
										}
									});
								});
							}
						);
					}
				);
			}
		);
	}

	return (
		<>
			{isInitializing ? (
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
					handleSubmitUpdates={handleSubmitUpdates}
					setDisplayName={setDisplayName}
					setDisplayURL={setDisplayURL}
					roleKey={userState!.primary_key}
					handleBack={handleBack}
					username={editProfileInfoMobile.name}
					tagline={editProfileInfoMobile.tagline}
					picture={editProfileInfoMobile.picture}
					pictureDisplayURL={editProfileInfoMobile.pictureDisplayURL}
					pictureDisplayName={editProfileInfoMobile.pictureDisplayName}
					City={editProfileInfoMobile.links.City}
					Email={editProfileInfoMobile.links.Email}
					IG={editProfileInfoMobile.links.IG}
					Link={editProfileInfoMobile.links.Link}
					Phone={editProfileInfoMobile.links.Phone}
					setTagline={setTagline}
					setCity={setCity}
					setEmail={setEmail}
					setIG={setIG}
					setLink={setLink}
					setPhone={setPhone}
					setPicture={setPicture}
					invalidTagline={invalidTagline}
					validateTagline={validateTagline}
					pictureError={pictureError}
					setPictureError={setPictureError}
					croppedImage={croppedImage}
					setCroppedImage={setCroppedImage}
					imageSelected={imageSelected}
					setImageSelected={setImageSelected}
					taglineError={taglineError}
					setTaglineError={setTaglineError}
					infoError={infoError}
					setInfoError={setInfoError}
					somethingUploading={somethingUploading}
				/>
			)}
		</>
	);
}

export default EditProfileContainer;
