/** @format */

import { useState, useEffect } from "react";
import SettingsModal from "./SettingsModal";
import { setCurrentSub as setCurrentSubSlice } from "@/store/currentSubStore";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { unformatPhoneNumber } from "@/generic_functions/formatPhoneNumber";
import styles from "./styles.module.css";
import { Triangle } from "react-loader-spinner";

interface SettingsModalContainerProps {
	closeModal: () => void;
}

function SettingsModalContainer({ closeModal }: SettingsModalContainerProps) {
	function prettifyPhone(phoneNumber: string): string {
		if (phoneNumber.length !== 11 || !phoneNumber.startsWith("1")) {
			throw new Error("Invalid phone number format");
		}
		const areaCode = phoneNumber.substring(1, 4);
		const firstPart = phoneNumber.substring(4, 7);
		const secondPart = phoneNumber.substring(7, 11);

		return `(${areaCode}) ${firstPart}-${secondPart}`;
	}

	const dispatch = useDispatch();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [currentEmail, setCurrentEmail] = useState("");
	const [currentEmailIsVerified, setCurrentEmailIsVerified] = useState(false);
	const [accountPhoneNumber, setAccountPhoneNumber] = useState("");
	const [passwordIsSet, setPasswordIsSet] = useState(false);

	async function handleLogOut() {
		try {
			await Auth.signOut();
			dispatch(setCurrentSubSlice(null));
			localStorage.clear();
			sessionStorage.clear();
			router.push("");
		} catch (error) {
			console.log("error signing out: ", error);
		}
	}

	function handleVerifyEmail() {
		router.push("/confirm_email");
	}

	function handleChangeEmail() {
		router.push("/change_email");
	}

	function handleChangePhone() {
		router.push("/change_phone");
	}

	function handleChangePassword() {
		router.push("/forgot_password?frompath=profile");
	}

	function handleSetPassword() {
		router.push("/set_password?frompath=profile");
	}

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
			try {
				const isPasswordSet = user.attributes["custom:hasPasswordSet"];
				if (isPasswordSet && isPasswordSet === "true") {
					setPasswordIsSet(true);
				}
			} catch {
				await Auth.updateUserAttributes(user, {
					"custom:hasPasswordSet": "false",
				});
			}
			setIsLoading(false);
		}
		initState();
	}, []);

	const accountHasemailSet = currentEmail !== "empty@empty.com";

	const prettyPhoneNumber =
		accountPhoneNumber !== ""
			? prettifyPhone(unformatPhoneNumber(accountPhoneNumber))
			: "";

	return (
		<div onClick={closeModal} className={styles.settings_overlay_modal}>
			<div
				className={styles.settings_paper}
				onClick={(e) => {
					e.stopPropagation();
				}}>
				{isLoading ? (
					<div className={styles.loading_div}>
						<Triangle color="#888661" height={200} width={200} />
					</div>
				) : (
					<SettingsModal
						closeModal={closeModal}
						handleLogOut={handleLogOut}
						handleChangeEmail={handleChangeEmail}
						handleChangePhone={handleChangePhone}
						handleChangePassword={handleChangePassword}
						handleVerifyEmail={handleVerifyEmail}
						passwordIsSet={passwordIsSet}
						handleSetPassword={handleSetPassword}
						prettyPhoneNumber={prettyPhoneNumber}
						accountHasemailSet={accountHasemailSet}
						currentEmail={currentEmail}
						currentEmailIsVerified={currentEmailIsVerified}
					/>
				)}
			</div>
		</div>
	);
}

export default SettingsModalContainer;
