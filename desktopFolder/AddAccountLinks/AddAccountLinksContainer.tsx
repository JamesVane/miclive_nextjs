/** @format */

import React, { useState } from "react";
import AddAccountLinks from "./AddAccountLinks";
import { useDispatch } from "react-redux";
import { formatPhoneNumber } from "@/generic_functions/formatPhoneNumber";
import {
	isValidPhoneNumber,
	isValidEmail,
	isValidInstagramLink,
	isValidLink,
} from "@/generic_functions/validationFunctions";
import { setSingleLink, setSingleLinkError } from "@/store/createAccountSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { useRouter } from "next/navigation";
import { postCreateAccountRoleInfo } from "@/api_functions/postCreateAccountRoleInfo";
import { postUploadS3Image } from "@/api_functions/postUploadS3Image";
import { Auth } from "aws-amplify";

interface AddAccountLinksContainerProps {
	isForPurchase?: boolean;
	forDjEventInvite?: boolean;
	forDjDateInvite?: boolean;
	paramsType: "performer" | "promoter" | "dj";
	paramsKey?: string;
}

function AddAccountLinksContainer({
	isForPurchase,
	forDjDateInvite,
	forDjEventInvite,
	paramsType,
	paramsKey,
}: AddAccountLinksContainerProps) {
	const router = useRouter();
	const dispatch = useDispatch();
	const userType = isForPurchase
		? "performer"
		: forDjDateInvite
		? "dj"
		: forDjEventInvite
		? "dj"
		: paramsType;

	const [isSubmitting, setIsSubmitting] = useState(false);

	const { links, linkErrors, imageFile, tagline, banner3X10, banner4X10 } =
		useSelector((state: RootState) => state.createAccount);
	const { city, phone, email, IG, website } = links;
	const {
		phone: phoneError,
		email: emailError,
		IG: IGError,
		website: websiteError,
	} = linkErrors;

	function removeWhitespace(str: string) {
		const adjusted = str.replace(/\s+/g, "");
		return adjusted;
	}

	function setCity(event: React.ChangeEvent<HTMLInputElement>) {
		dispatch(
			setSingleLink({
				key: "city",
				value: event.target.value,
			})
		);
	}

	function setPhone(event: React.ChangeEvent<HTMLInputElement>) {
		const adjustedValue = formatPhoneNumber(event.target.value);
		if (adjustedValue !== null) {
			dispatch(
				setSingleLink({
					key: "phone",
					value: adjustedValue,
				})
			);
			dispatch(
				setSingleLinkError({
					key: "phone",
					value: "",
				})
			);
		}
	}

	function setEmail(event: React.ChangeEvent<HTMLInputElement>) {
		const adjustedValue = removeWhitespace(event.target.value);
		dispatch(
			setSingleLink({
				key: "email",
				value: adjustedValue,
			})
		);
		dispatch(
			setSingleLinkError({
				key: "email",
				value: "",
			})
		);
	}

	function setInstagram(event: React.ChangeEvent<HTMLInputElement>) {
		const adjustedValue = removeWhitespace(event.target.value);
		dispatch(
			setSingleLink({
				key: "IG",
				value: adjustedValue,
			})
		);
		dispatch(
			setSingleLinkError({
				key: "IG",
				value: "",
			})
		);
	}

	function setWebsite(event: React.ChangeEvent<HTMLInputElement>) {
		const adjustedValue = removeWhitespace(event.target.value);
		dispatch(
			setSingleLink({
				key: "website",
				value: adjustedValue,
			})
		);
		dispatch(
			setSingleLinkError({
				key: "website",
				value: "",
			})
		);
	}

	async function validateSubmit() {
		if (!isValidPhoneNumber(phone) && phone !== "") {
			dispatch(
				setSingleLinkError({
					key: "phone",
					value: "Invalid phone number",
				})
			);
		}
		if (!isValidEmail(email) && email !== "") {
			dispatch(
				setSingleLinkError({
					key: "email",
					value: "Invalid email",
				})
			);
		}
		if (!isValidInstagramLink(IG) && IG !== "") {
			dispatch(
				setSingleLinkError({
					key: "IG",
					value: "Invalid Instagram link",
				})
			);
		}
		if (!isValidLink(website) && website !== "") {
			dispatch(
				setSingleLinkError({
					key: "website",
					value: "Invalid website link",
				})
			);
		}
		if (!isValidLink(website) && website !== "") {
			return false;
		} else if (!isValidInstagramLink(IG) && IG !== "") {
			return false;
		} else if (!isValidEmail(email) && email !== "") {
			return false;
		} else if (!isValidPhoneNumber(phone) && phone !== "") {
			return false;
		} else {
			return true;
		}
	}

	function handleNavigateOut() {
		setIsSubmitting(false);
		if (isForPurchase) {
			router.push(`/buy_ticket/purchase/${paramsKey}`);
		} else if (forDjDateInvite) {
			router.push(`/dj_accept_date/${paramsKey}`);
		} else if (forDjEventInvite) {
			router.push(`/dj_accept_event/${paramsKey}`);
		} else {
			router.push(`/${userType}`);
		}
	}

	async function handleSubmit() {
		try {
			const user = await Auth.currentAuthenticatedUser();
			const userSub = user.attributes.sub;
			await validateSubmit().then((isValid) => {
				if (isValid) {
					if (
						userType === "performer" ||
						userType === "promoter" ||
						userType === "dj"
					) {
						setIsSubmitting(true);
						postCreateAccountRoleInfo({
							has_no_image: imageFile === null ? true : false,
							request_tagline: tagline,
							request_sub: userSub,
							request_user_type: userType!,
							request_city: city === "" ? null : city,
							request_phone: phone === "" ? null : phone,
							request_email: email === "" ? null : email,
							request_ig: IG === "" ? null : IG,
							request_website: website === "" ? null : website,
							request_performer_role_key: null,
						}).then(async (res) => {
							if (imageFile !== null && res.request_image_path && res.new_id) {
								await Auth.updateUserAttributes(user, {
									"custom:RoleId": res.new_id.toString(),
								});
								if (userType === "promoter") {
									const [threeBanner, fourBanner] = await Promise.all([
										postUploadS3Image(
											banner3X10,
											`promoter_banner_3X1/banner_${res.new_id}`
										),
										postUploadS3Image(
											banner4X10,
											`promoter_banner_4X1/banner_${res.new_id}`
										),
									]);
								}
								postUploadS3Image(imageFile, res.request_image_path).then(
									() => {
										handleNavigateOut();
									}
								);
							} else {
								handleNavigateOut();
							}
						});
					}
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	function handleBack() {
		if (userType === "promoter") {
			router.push("/add_banner");
		} else {
			router.push(`/add_info/${userType}`);
		}
	}

	function handleClear(what: "city" | "phone" | "email" | "IG" | "website") {
		dispatch(setSingleLink({ key: what, value: "" }));
		if (what !== "city") {
			dispatch(setSingleLinkError({ key: what, value: "" }));
		}
	}

	return (
		<div>
			<AddAccountLinks
				city={city}
				phone={phone}
				email={email}
				IG={IG}
				website={website}
				setCity={setCity}
				setPhone={setPhone}
				setEmail={setEmail}
				setInstagram={setInstagram}
				setWebsite={setWebsite}
				phoneError={phoneError}
				emailError={emailError}
				IGError={IGError}
				websiteError={websiteError}
				handleBack={handleBack}
				handleSubmit={handleSubmit}
				handleClear={handleClear}
				isSubmitting={isSubmitting}
			/>
		</div>
	);
}

export default AddAccountLinksContainer;
