/** @format */

import React from "react";
import AlertButton from "./AlertButton";
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import { NotificationImportantRounded } from "@mui/icons-material";
import { Button, LinearProgress } from "@mui/material";

interface AlertButtonContainerProps {
	handleAlertModal: (value: boolean) => void;
}

function AlertButtonContainer({ handleAlertModal }: AlertButtonContainerProps) {
	const router = useRouter();

	const [hasEmail, setHasEmail] = useState(false);
	const [emailIsConfirmed, setEmailIsConfirmed] = useState(false);
	const [passwordIsSet, setPasswordIsSet] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function initAlertButton() {
			try {
				const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
			} catch {
				router.push("/sign_in");
				return;
			}
			const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
			const currrentEmail = user.attributes.email;
			if (currrentEmail && currrentEmail !== "empty@empty.com") {
				setHasEmail(true);
			}
			const emailIsVerified = user.attributes.email_verified;
			if (emailIsVerified) {
				setEmailIsConfirmed(true);
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
		initAlertButton();
	}, []);

	function handleOpenModal() {
		handleAlertModal(true);
	}

	return (
		<>
			{isLoading ? (
				<Button
					disabled={true}
					sx={{
						position: "relative",
						overflow: "hidden",
					}}
					size="small"
					color="info"
					variant="outlined"
					startIcon={<NotificationImportantRounded />}>
					?
					<LinearProgress
						color="info"
						sx={{
							position: "absolute",
							bottom: "0px",
							width: "100%",
						}}
					/>
				</Button>
			) : (
				<AlertButton
					passwordIsSet={passwordIsSet}
					emailIsConfirmed={emailIsConfirmed}
					hasEmail={hasEmail}
					handleOpenModal={handleOpenModal}
				/>
			)}
		</>
	);
}

export default AlertButtonContainer;
