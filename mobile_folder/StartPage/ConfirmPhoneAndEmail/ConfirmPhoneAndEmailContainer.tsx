/** @format */
"use client";

import React from "react";
import ConfirmPhone from "./ConfirmPhone";
import { Auth } from "aws-amplify";
import { RootState } from "@/app/LocalizationProviderHelper";
import { useSelector, useDispatch } from "react-redux";
import { unformatPhoneNumber } from "../../../generic_functions/formatPhoneNumber";
import { useRouter } from "next/navigation";
import { postCreateAccountBase } from "../../../api_functions/postCreateAccountBase";
import { setUserRoleId } from "@/store/createAccountSlice";

interface ConfirmPhoneAndEmailContainerProps {
	userTypeFromParams: "promoter" | "performer" | "dj";
}

function ConfirmPhoneAndEmailContainer({
	userTypeFromParams,
}: ConfirmPhoneAndEmailContainerProps) {
	const dispatch = useDispatch();
	const router = useRouter();

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
								userTypeFromParams === "promoter"
									? 1
									: userTypeFromParams === "dj"
									? 2
									: 3,
							request_phone_number: `+1${unformatPhoneNumber(
								currentPhoneNumber
							)}`,
						}).then(async (userRoleId) => {
							await Auth.updateUserAttributes(user, {
								"custom:RoleId": userRoleId.toString(),
							});
							await Auth.updateUserAttributes(user, {
								"custom:RoleType": userTypeFromParams,
							});
							dispatch(setUserRoleId(Number(userRoleId)));

							const navRoute = `/m/add_info/${userTypeFromParams}`;
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
