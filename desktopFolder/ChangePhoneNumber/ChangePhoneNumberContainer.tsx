/** @format */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChangePhoneNumber from "./ChangePhoneNumber";
import { Auth } from "aws-amplify";
import SplashPage from "@/SplashPage";
import { unformatPhoneNumber } from "@/generic_functions/formatPhoneNumber";

function ChangePhoneNumberContainer() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [currentEmail, setCurrentEmail] = useState("");
	const [currentEmailIsVerified, setCurrentEmailIsVerified] = useState(false);
	const [accountPhoneNumber, setAccountPhoneNumber] = useState("");

	useEffect(() => {
		async function initState() {
			setIsLoading(true);
			try {
				const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
			} catch {
				router.push("/sign_in");
				return;
			}
			const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
			const currrentEmail = user.attributes.email;
			const accountPhone = user.attributes.phone_number;
			setAccountPhoneNumber(accountPhone);
			setCurrentEmail(currrentEmail);
			const emailIsVerified = user.attributes.email_verified;
			if (emailIsVerified) {
				setCurrentEmailIsVerified(true);
			}
			setIsLoading(false);
		}
		initState();
	}, []);

	function handleGoBack() {
		router.back();
	}

	function prettifyPhone(phoneNumber: string): string {
		// Check if the phone number is valid (11 characters long and starts with '1')
		if (phoneNumber.length !== 11 || !phoneNumber.startsWith("1")) {
			throw new Error("Invalid phone number format");
		}

		// Remove the country code ('1') and format the number
		const areaCode = phoneNumber.substring(1, 4);
		const firstPart = phoneNumber.substring(4, 7);
		const secondPart = phoneNumber.substring(7, 11);

		return `(${areaCode}) ${firstPart}-${secondPart}`;
	}

	const prettyPhoneNumber =
		accountPhoneNumber !== ""
			? prettifyPhone(unformatPhoneNumber(accountPhoneNumber))
			: "";

	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
				<ChangePhoneNumber
					currentEmail={currentEmail}
					currentEmailIsVerified={currentEmailIsVerified}
					accountPhoneNumber={prettyPhoneNumber}
					handleGoBack={handleGoBack}
				/>
			)}
		</>
	);
}

export default ChangePhoneNumberContainer;
