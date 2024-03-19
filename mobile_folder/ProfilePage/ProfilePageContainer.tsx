/** @format */
"use client";

import { useState, useEffect, useCallback } from "react";
import ProfilePage from "./ProfilePage";
import { Auth } from "aws-amplify";
import { setUsersStateProfile } from "@/store/usersStateStore";
import { useDispatch } from "react-redux";
import { getUserProfile } from "@/api_functions/getUserProfile";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import SplashPage from "@/SplashPage";
import EditProfileInfo from "@mobi/ProfileInfo/EditProfileInfo";
import { Snackbar, Alert } from "@mui/material";
import styles from "./styles.module.css";

function ProfilePageContainer() {
	const dispatch = useDispatch();
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const editingIsOpen = searchParams.get("editing")
		? searchParams.get("editing") === "true"
			? true
			: searchParams.get("editing") === "false"
			? false
			: false
		: false;

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	function openEditing() {
		router.push(pathname + "?" + createQueryString("editing", "true"));
	}

	function closeEditing() {
		router.push(pathname + "?" + createQueryString("editing", "false"));
	}

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
					{editingIsOpen ? (
						<EditProfileInfo
							performer={userType === "performer"}
							promoter={userType === "promoter"}
							dj={userType === "dj"}
							handleBack={closeEditing}
							setSuccessfullUpload={() => {
								setSuccessfullUpload(true);
							}}
						/>
					) : (
						<ProfilePage
							setEditingOpen={openEditing}
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
