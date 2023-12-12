/** @format */

import React, { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import {
	Box,
	Typography,
	IconButton,
	TextField,
	ButtonBase,
	Avatar,
} from "@mui/material";
import {
	EditRounded,
	CheckCircleRounded,
	CancelRounded,
} from "@mui/icons-material";
import { Auth } from "aws-amplify";
import { postUserTagline } from "@/api_functions/postUserTagline";
import { getUserProfile } from "@/api_functions/getUserProfile";
import { useDispatch } from "react-redux";
import { setUsersStateProfile } from "@/store/usersStateStore";
import { useSelector } from "react-redux";
import AvatarSimple from "@desk/AvatarSimple";
import { RootState } from "@/store/rootStore";
import { UserProfileResponse } from "@/api_functions/getUserProfile";
import styles from "./styles.module.css";

interface HomeProfilePaperTopProps {
	performer?: boolean;
	dj?: boolean;
	promoter?: boolean;
	setEditingPicture: React.Dispatch<React.SetStateAction<boolean>>;
}

interface EditingModal {
	userType: "performer" | "dj" | "promoter";
	usersState: UserProfileResponse | null;
	editingState: boolean;
	setEditingState: React.Dispatch<React.SetStateAction<boolean>>;
}

function AvatarButton({ buttonOut }: { buttonOut: () => void }) {
	const [hovering, setHovering] = useState(false);
	return (
		<Avatar
			onClick={buttonOut}
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
			sx={{
				position: "absolute",
				zIndex: 25,
				right: 5,
				bottom: 5,
				width: "35px",
				height: "35px",
				backgroundColor: hovering ? "primary.dark" : "#272727ff",
				transition: "all 0.2s ease-in-out",
				overflow: "hidden",
				border: "1px solid #888661ff",
			}}>
			<EditRounded sx={{ color: "primary.main" }} />
		</Avatar>
	);
}

function EditingModal({
	userType,
	usersState,
	editingState,
	setEditingState,
}: EditingModal) {
	const dispatch = useDispatch();
	const defaultState = usersState?.tagline ?? "";
	const [valueState, setValueState] = useState<string>(defaultState);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [isError, setIsError] = useState<boolean>(false);
	const [validationInProgress, setValidationInProgress] =
		useState<boolean>(false);

	function validateTagline() {
		const validCharactersRegex = /^[\w\s\.,!?]+$/;
		const linkRegex = /https?:\/\/[\w.]+/;
		const maxLength = 35;

		if (linkRegex.test(valueState)) {
			setIsError(true);
			setErrorMessage("Links are not allowed in the tagline.");
		} else if (
			validCharactersRegex.test(valueState) &&
			valueState.length <= maxLength
		) {
			setIsError(false);
			setErrorMessage("");
		} else if (!validCharactersRegex.test(valueState)) {
			setIsError(true);
			setErrorMessage("Invalid tagline. Only standard characters allowed.");
		} else {
			setIsError(true);
			setErrorMessage("Tagline is too long. Maximum length is 35 characters.");
		}
	}

	const validateValue = useCallback(
		debounce(() => {
			if (valueState !== "") {
				if (editingState) {
					validateTagline();
				}
			}
			setValidationInProgress(false);
		}, 500),
		[valueState]
	);

	async function updateUserTagline(
		payload: string,
		performer?: boolean,
		dj?: boolean,
		promoter?: boolean
	) {
		postUserTagline(userType, payload).then(async (res) => {
			try {
				/* const userInfo = await Auth.currentUserInfo(); */
				const fetchedUserProfile = await getUserProfile(
					userType,
					performer
						? process.env.REACT_APP_PERFORMER_ID!
						: dj
						? process.env.REACT_APP_DJ_ID!
						: promoter
						? process.env.REACT_APP_PROMOTER_ID!
						: ""
				);
				const updatedProfile = {
					...fetchedUserProfile,
					tagline: payload,
				} as UserProfileResponse | null;
				dispatch(setUsersStateProfile(updatedProfile));
			} catch (err) {
				console.log("Error updating user profile");
			}
		});
	}

	useEffect(() => {
		validateValue();
	}, [validateValue]);
	return (
		<Box className={styles.editing_top_modal}>
			{editingState ? (
				<>
					<Typography
						sx={{
							position: "absolute",
							width: "100%",
							bottom: 0,
							textAlign: "center",
							color: "error.main",
						}}>
						{errorMessage}
					</Typography>
					<div className={styles.name_tag_input}>
						<TextField
							onChange={(e) => {
								setValueState(e.target.value);
								setValidationInProgress(true);
							}}
							sx={{ width: "80%" }}
							autoFocus
							label={"Tagline"}
							value={valueState}
						/>
					</div>
				</>
			) : null}
			<div className={styles.name_tag_confirm}>
				<IconButton
					onClick={() => {
						updateUserTagline(valueState);
						setEditingState(false);
					}}
					size="large"
					sx={{ width: "55px", height: "55px", color: "success.main" }}
					disabled={
						valueState === defaultState ||
						isError === true ||
						validationInProgress
							? true
							: false
					}>
					<CheckCircleRounded sx={{ height: "150%", width: "150%" }} />
				</IconButton>
				<IconButton
					sx={{ width: "55px", height: "55px" }}
					size="large"
					onClick={() => {
						setEditingState(false);
						setValueState(defaultState);
					}}>
					<CancelRounded
						sx={{ color: "error.main", height: "150%", width: "150%" }}
					/>
				</IconButton>
			</div>
		</Box>
	);
}

function HomeProfilePaperTop({
	performer,
	dj,
	promoter,
	setEditingPicture,
}: HomeProfilePaperTopProps) {
	const [editingState, setEditingState] = useState<boolean>(false);

	const usersStateFromStore = useSelector(
		(state: RootState) => state.usersState
	);

	return (
		<Box
			className={styles.picture_box}
			sx={{ borderBottom: 2, borderColor: "background.default" }}>
			{!editingState ? (
				<>
					<div className={styles.pic_square}>
						<AvatarButton buttonOut={() => setEditingPicture(true)} />
						<AvatarSimple
							type={performer ? "performer" : dj ? "dj" : "promoter"}
							id={Number(usersStateFromStore?.primary_key)}
						/>
					</div>
					<div className={styles.name_and_tagline}>
						<div
							className={styles.name_tagline_row}
							style={{ fontSize: "24px", alignItems: "end" }}>
							{usersStateFromStore?.username}
						</div>
						<div
							className={styles.name_tagline_row}
							style={{ fontSize: "18px" }}>
							{usersStateFromStore?.tagline}
							<IconButton onClick={() => setEditingState(true)}>
								<EditRounded
									sx={{
										height: "20px",
										width: "20px",
										color: "primary.main",
									}}
								/>
							</IconButton>
						</div>
					</div>
				</>
			) : (
				<EditingModal
					userType={performer ? "performer" : dj ? "dj" : "promoter"}
					usersState={usersStateFromStore}
					editingState={editingState}
					setEditingState={setEditingState}
				/>
			)}
		</Box>
	);
}

export default HomeProfilePaperTop;
