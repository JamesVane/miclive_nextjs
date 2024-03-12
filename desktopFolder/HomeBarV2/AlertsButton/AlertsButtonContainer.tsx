/** @format */

import { useState, useEffect } from "react";
import AlertsButton from "./AlertsButton";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import { Button, LinearProgress } from "@mui/material";
import { NotificationImportantRounded } from "@mui/icons-material";

interface AlertsButtonContainerProps {
	onProfilePage: boolean;
}

function AlertsButtonContainer({ onProfilePage }: AlertsButtonContainerProps) {
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

	return (
		<>
			{isLoading ? (
				<Button
					disabled={true}
					sx={{
						height: "45px",
						position: "relative",
						overflow: "hidden",
						fontSize: "25px",
						marginRight: "10px",
					}}
					size="large"
					color="info"
					variant="outlined"
					startIcon={
						<NotificationImportantRounded
							sx={{
								height: "30px",
								width: "30px",
							}}
						/>
					}>
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
				<AlertsButton
					passwordIsSet={passwordIsSet}
					emailIsConfirmed={emailIsConfirmed}
					hasEmail={hasEmail}
					onProfilePage={onProfilePage}
				/>
			)}
		</>
	);
}

export default AlertsButtonContainer;
