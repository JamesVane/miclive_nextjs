/** @format */
"use client";

import { useState, useEffect } from "react";
import SplashPage from "@/SplashPage";
import { Auth } from "aws-amplify";
import { getUserProfile } from "@/api_functions/getUserProfile";
import { useDispatch } from "react-redux";
import { setUsersStateProfile } from "@/store/usersStateStore";
import HomeProfilePaper from "./HomeProfilePaper";
import NotAuthProfilePage from "./NotAuthProfilePage";
import styles from "./styles.module.css";

function ProfileRootPage() {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [notAuthenticated, setNotAuthenticated] = useState(false);
	const [userType, setUserType] = useState<
		"" | "performer" | "promoter" | "dj"
	>("");

	async function loadProfileInfo() {
		try {
			const user = await Auth.currentAuthenticatedUser();
			const userSub = user.attributes.sub;
			const roleType = user.attributes["custom:RoleType"];
			setUserType(roleType);
			const fetchedUserProfile = await getUserProfile(roleType, userSub);
			dispatch(setUsersStateProfile(fetchedUserProfile));
		} catch {
			setNotAuthenticated(true);
		}
	}

	useEffect(() => {
		setIsLoading(true);
		loadProfileInfo().then(() => setIsLoading(false));
	}, []);

	return (
		<>
			{isLoading ? (
				<div className={styles.splash_container}>
					<SplashPage />
				</div>
			) : (
				<>
					{notAuthenticated ? (
						<NotAuthProfilePage />
					) : (
						<HomeProfilePaper
							promoter={userType === "promoter"}
							performer={userType === "performer"}
							dj={userType === "dj"}
						/>
					)}
				</>
			)}
		</>
	);
}

export default ProfileRootPage;
