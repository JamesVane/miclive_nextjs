/** @format */

"use client";

import { useEffect, useState } from "react";
import ChangeEmail from "./ChangeEmail";
import { Auth } from "aws-amplify";
import SplashPage from "@/SplashPage";
import { useRouter } from "next/navigation";
import EmailIsVerified from "./EmailIsVerified";

function ChangeEmailContainer() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [currentEmail, setCurrentEmail] = useState("");
	const [email, setEmail] = useState("");
	const [currentEmailIsVerified, setCurrentEmailIsVerified] = useState(false);
	const [accountPhoneNumber, setAccountPhoneNumber] = useState("");

	function removeWhitespace(str: string) {
		const adjusted = str.replace(/\s+/g, "");
		return adjusted;
	}

	useEffect(() => {
		async function getUserEmail() {
			try {
				const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
				const currrentEmail = user.attributes.email;
				setCurrentEmail(currrentEmail);
				const emailIsVerified = user.attributes.email_verified;
				if (emailIsVerified) {
					setCurrentEmailIsVerified(true);
				}
				const accPhone = user.attributes.phone_number;
				if (accPhone) {
					setAccountPhoneNumber(accPhone);
				}
				setIsLoading(false);
			} catch {
				router.push("/sign_in");
			}
		}
		getUserEmail();
	}, []);

	function handleSetCurrentEmailIsVerified() {
		setCurrentEmailIsVerified(true);
	}
	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
				<>
					{currentEmailIsVerified ? (
						<EmailIsVerified
							currentEmail={currentEmail}
							accountPhoneNumber={accountPhoneNumber}
						/>
					) : (
						<ChangeEmail
							removeWhitespace={removeWhitespace}
							currentEmail={currentEmail}
							email={email}
							setEmail={setEmail}
							currentEmailIsVerified={currentEmailIsVerified}
							handleSetCurrentEmailIsVerified={handleSetCurrentEmailIsVerified}
						/>
					)}
				</>
			)}
		</>
	);
}

export default ChangeEmailContainer;
