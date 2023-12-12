/** @format */
"use client";

import { useState, useEffect } from "react";
import ProfilePage from "./ProfilePage";
import { Auth } from "aws-amplify";
import { setUsersStateProfile } from "@/store/usersStateStore";
import { useDispatch } from "react-redux";
import { getUserProfile } from "@/api_functions/getUserProfile";
import { useRouter } from "next/navigation";
import SplashPage from "@/SplashPage";
import EditProfileInfo from "@mobi/ProfileInfo/EditProfileInfo";
import { Snackbar, Alert } from "@mui/material";
import styles from "./styles.module.css";

function ProfilePageContainer() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [editingOpen, setEditingOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [successfullUpload, setSuccessfullUpload] = useState(false);
	const [userType, setUserType] = useState<
		"performer" | "dj" | "promoter" | ""
	>("");

	async function initPage() {
		try {
			const user = await Auth.currentAuthenticatedUser();
			const userId = user.attributes.sub;
			const roleType = user.attributes["custom:RoleType"];
			if (
				roleType === "performer" ||
				roleType === "dj" ||
				roleType === "promoter"
			) {
				setUserType(roleType);
			}
			const fetchedUserProfile = await getUserProfile(roleType, userId);
			dispatch(setUsersStateProfile(fetchedUserProfile));
		} catch {
			router.push("/m/sign_in");
		}
	}

	useEffect(() => {
		initPage().then(() => setIsLoading(false));
	}, []);

	return (
		<>
			{isLoading ? (
				<div className={styles.splash_container}>
					<SplashPage />
				</div>
			) : (
				<>
					<Snackbar
						open={successfullUpload}
						autoHideDuration={6000}
						onClose={() => setSuccessfullUpload(false)}>
						<Alert
							onClose={() => setSuccessfullUpload(false)}
							severity="success"
							sx={{ width: "100%" }}>
							Sucessfully Updated Profile!
						</Alert>
					</Snackbar>
					{editingOpen ? (
						<EditProfileInfo
							performer={userType === "performer"}
							promoter={userType === "promoter"}
							dj={userType === "dj"}
							handleBack={() => setEditingOpen(false)}
							setSuccessfullUpload={() => {
								setSuccessfullUpload(true);
							}}
						/>
					) : (
						<ProfilePage
							setEditingOpen={setEditingOpen}
							performer={userType === "performer"}
							promoter={userType === "promoter"}
							dj={userType === "dj"}
						/>
					)}
				</>
			)}
		</>
	);
}

export default ProfilePageContainer;
