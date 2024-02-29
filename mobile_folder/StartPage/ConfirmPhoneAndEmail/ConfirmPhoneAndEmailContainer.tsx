/** @format */
"use client";

import React from "react";
import ConfirmPhone from "./ConfirmPhone";
import { Auth } from "aws-amplify";
import { RootState } from "@/app/LocalizationProviderHelper";
import { useSelector } from "react-redux";
import { unformatPhoneNumber } from "../../../generic_functions/formatPhoneNumber";
import { useRouter } from "next/navigation";
import { postCreateAccountBase } from "../../../api_functions/postCreateAccountBase";

interface ConfirmPhoneAndEmailContainerProps {
	isForPurchase?: boolean;
	forDjEventInvite?: boolean;
	forDjDateInvite?: boolean;
	forPerformerQr?: boolean;
	forPerformerKeyCheckin?: boolean;
	userTypeFromParams: "promoter" | "performer" | "dj";
	keyFromParams?: string;
	uuidFromParams?: string;
}

function ConfirmPhoneAndEmailContainer({
	isForPurchase,
	forDjEventInvite,
	forDjDateInvite,
	forPerformerQr,
	forPerformerKeyCheckin,
	userTypeFromParams,
	keyFromParams,
	uuidFromParams,
}: ConfirmPhoneAndEmailContainerProps) {
	const router = useRouter();
	const userType = isForPurchase
		? "performer"
		: forPerformerKeyCheckin
		? "performer"
		: forPerformerQr
		? "performer"
		: forDjEventInvite
		? "dj"
		: forDjDateInvite
		? "dj"
		: userTypeFromParams;

	const [message, setMessage] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false); // [1
	const [phoneCode, setPhoneCode] = React.useState("");
	const {
		phone: currentPhoneNumber,
		password: currentPassword,
		username,
		email,
	} = useSelector((state: RootState) => state.createAccountSlice);

	async function amplifySignIn(): Promise<boolean> {
		try {
			await Auth.signIn(
				`+1${unformatPhoneNumber(currentPhoneNumber)}`,
				currentPassword
			);
			return true;
		} catch (error) {
			console.error("Error signing in:", error);
			return false;
		}
	}

	const handleConfirmation = async (phoneCode: string) => {
		setIsLoading(true);
		try {
			await Auth.confirmSignUp(
				`+1${unformatPhoneNumber(currentPhoneNumber)}`,
				phoneCode
			).then((res) => {
				amplifySignIn().then(async (res) => {
					const user = await Auth.currentAuthenticatedUser();
					const userSub = user.attributes.sub;
					if (res) {
						postCreateAccountBase({
							request_primary_key: userSub,
							request_username: username,
							request_email: email,
							request_role_name_number:
								userType === "promoter" ? 1 : userType === "dj" ? 2 : 3,
							request_phone_number: `+1${unformatPhoneNumber(
								currentPhoneNumber
							)}`,
						}).then((res: any) => {
							const navRoute = isForPurchase
								? `/buy_ticket/add_info/${keyFromParams}`
								: forPerformerKeyCheckin
								? `/walkin_key/${keyFromParams}/add_info`
								: forPerformerQr
								? `/checkinqr/${uuidFromParams}/add_info`
								: forDjDateInvite
								? `/dj_accept_date/${keyFromParams}/add_info`
								: forDjEventInvite
								? `/dj_accept_event/${keyFromParams}/add_info`
								: `/add_info/${userType}`;

							router.push(navRoute);
							setMessage("");
							setIsLoading(false);
						});
					} else {
						setMessage("Login Failed.");
						setIsLoading(false);
					}
				});
			});
		} catch (err: any) {
			console.error("Error confirming sign up", err);
			setPhoneCode("");
			setMessage("Incorrect confirmation code.");
			setIsLoading(false);
		}
	};

	const handleResendCode = async () => {
		try {
			await Auth.resendSignUp(
				`+1${unformatPhoneNumber(currentPhoneNumber)}`
			).then(() => {
				setMessage("Confirmation code resent successfully!");
			});
		} catch (error: any) {
			setMessage(`Error resending code: ${error.message}`);
		}
	};

	const validateChar = (value: string) => {
		if (value.match(/^[0-9]+$/)) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div>
			<ConfirmPhone
				handleConfirmation={handleConfirmation}
				validateChar={validateChar}
				message={message}
				setMessage={setMessage}
				handleResendCode={handleResendCode}
				setPhoneCode={setPhoneCode}
				phoneCode={phoneCode}
				isLoading={isLoading}
			/>
		</div>
	);
}

export default ConfirmPhoneAndEmailContainer;
