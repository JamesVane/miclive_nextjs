/** @format */
"use client";

import { useState, useEffect, useCallback } from "react";
import SplashPage from "@/SplashPage";
import { Auth } from "aws-amplify";
import { getUserProfile } from "@/api_functions/getUserProfile";
import { useDispatch } from "react-redux";
import { setUsersStateProfile } from "@/store/usersStateStore";
import HomeProfilePaper from "./HomeProfilePaper";
import NotAuthProfilePage from "./NotAuthProfilePage";
import styles from "./styles.module.css";
import ProfileEditing from "./ProfileEditing";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

function ProfileRootPage() {
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
	const [notAuthenticated, setNotAuthenticated] = useState(false);
	const [userType, setUserType] = useState<
		"" | "performer" | "promoter" | "dj"
	>("");

	async function loadProfileInfo() {
		try {
			const user = await Auth.currentAuthenticatedUser();
			const roleType = user.attributes["custom:RoleType"];
			setUserType(roleType);
			const fetchedUserProfile = await getUserProfile();
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
						<>
							{editingIsOpen ? (
								<ProfileEditing
									promoter={userType === "promoter"}
									performer={userType === "performer"}
									dj={userType === "dj"}
									handleGoBack={closeEditing}
								/>
							) : (
								<HomeProfilePaper
									handleEdit={openEditing}
									promoter={userType === "promoter"}
									performer={userType === "performer"}
									dj={userType === "dj"}
								/>
							)}
						</>
					)}
				</>
			)}
		</>
	);
}

export default ProfileRootPage;
