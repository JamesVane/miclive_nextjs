/** @format */
"use client";

import { useEffect, useState } from "react";
import ChangeEmail from "./ChangeEmail";
import { Auth } from "aws-amplify";
import SplashPage from "@/SplashPage";
import { useRouter } from "next/navigation";

function ChangeEmailContainer() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [currentEmail, setCurrentEmail] = useState("");
	const [email, setEmail] = useState("");

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
				setIsLoading(false);
			} catch {
				router.push("/sign_in");
			}
		}
		getUserEmail();
	}, []);

	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
				<ChangeEmail
					removeWhitespace={removeWhitespace}
					currentEmail={currentEmail}
					email={email}
					setEmail={setEmail}
				/>
			)}
		</>
	);
}

export default ChangeEmailContainer;
