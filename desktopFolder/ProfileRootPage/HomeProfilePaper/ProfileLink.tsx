/** @format */
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { truncateLink } from "@/generic_functions/truncateLink";
import { getUserProfile } from "@/api_functions/getUserProfile";
import { UserProfileResponse } from "@/api_functions/getUserProfile";
import { Auth } from "aws-amplify";
import { setUsersStateProfile } from "@/store/usersStateStore";
import { postUserInfoObj } from "@/api_functions/postUserInfoObj";
import debounce from "lodash/debounce";
import styles from "./styles.module.css";
import {
	Button,
	Box,
	Typography,
	Link,
	IconButton,
	TextField,
} from "@mui/material";
import {
	Edit,
	CheckCircleRounded,
	CancelRounded,
	AddRounded,
} from "@mui/icons-material";

interface ProfileLinkProps {
	performer?: boolean;
	promoter?: boolean;
	dj?: boolean;
	left: React.ReactNode;
	right: string;
	isLink?: boolean;
	isEmpty?: boolean;
	type: "Email" | "Phone" | "Link" | "IG" | "City";
}

function ProfileLink({
	left,
	right,
	isLink,
	isEmpty,
	type,
	performer,
	promoter,
	dj,
}: ProfileLinkProps) {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [valueHolder, setValueHolder] = useState(right);
	const [isValid, setIsValid] = useState(true);
	const [validationInProgress, setValidationInProgress] = useState(false);
	const truncatedLink = isLink ? truncateLink(right as string, 20) : right;

	function isValidEmail(email: string): boolean {
		const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
		return emailRegex.test(email);
	}

	function isValidPhoneNumber(phoneNumber: string): boolean {
		const phoneRegex = /^\+?[\d\s()-]*$/;
		return (
			phoneRegex.test(phoneNumber) &&
			phoneNumber.length >= 10 &&
			phoneNumber.length <= 15
		);
	}

	function isValidInstagramLink(link: string): boolean {
		const instagramRegex =
			/^(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9._-]+)\/?$/;
		return instagramRegex.test(link);
	}

	function isValidLink(link: string): boolean {
		const linkRegex =
			/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)*\+,;=.]+$/;
		return linkRegex.test(link);
	}

	const validateValue = useCallback(
		debounce(() => {
			if (valueHolder !== "") {
				{
					switch (type) {
						case "Email":
							setIsValid(isValidEmail(valueHolder));
							break;
						case "Phone":
							setIsValid(isValidPhoneNumber(valueHolder));
							break;
						case "IG":
							setIsValid(isValidInstagramLink(valueHolder));
							break;
						case "Link":
							setIsValid(isValidLink(valueHolder));
							break;
						default:
							setIsValid(true);
							break;
					}
				}
			}
			setValidationInProgress(false);
		}, 500),
		[valueHolder, right, type]
	);

	useEffect(() => {
		validateValue();
	}, [validateValue]);

	function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
		setValidationInProgress(true);
		setValueHolder(e.target.value);
	}

	async function updateUserInfoObj(payload: Partial<UserProfileResponse>) {
		postUserInfoObj(
			performer ? "performer" : promoter ? "promoter" : "dj",
			payload
		).then(async (res) => {
			try {
				const user = await Auth.currentAuthenticatedUser();
				const userId = user.attributes.sub;
				const fetchedUserProfile = await getUserProfile(
					performer ? "performer" : promoter ? "promoter" : "dj",
					userId
				);
				const updatedProfile = {
					...fetchedUserProfile,
					info: {
						...fetchedUserProfile?.info,
						...payload,
					},
				} as UserProfileResponse | null;
				dispatch(setUsersStateProfile(updatedProfile));
			} catch (err) {
				console.log("Error updating user profile");
			}
		});
	}

	function handleInfoSubmit(
		type: "City" | "Email" | "IG" | "Phone" | "Link",
		value: string
	) {
		updateUserInfoObj({ [type]: value });
	}

	return (
		<Box className={styles.link_box}>
			<div className={styles.left_split}>{left}</div>
			<div className={styles.right_split}>
				<div className={styles.content_box}>
					{isEditing && !isValid ? (
						<Typography
							sx={{
								fontSize: "18px",
								position: "absolute",
								color: "error.main",
								bottom: 0,
								marginBottom: "-5px",
							}}>
							{type === "Email"
								? "Invalid email"
								: type === "Phone"
								? "Invalid phone number"
								: type === "IG"
								? "Invalid Instagram link"
								: type === "Link"
								? "Invalid link"
								: null}
						</Typography>
					) : null}
					{isEditing ? (
						<TextField
							sx={{ width: "80%" }}
							size="small"
							autoFocus
							onChange={handleTextChange}
							value={valueHolder}></TextField>
					) : isEmpty ? (
						<Button
							variant="contained"
							endIcon={<AddRounded />}
							onClick={() => {
								setIsEditing(!isEditing);
								setValueHolder("");
								setIsValid(true);
							}}>
							{right}
						</Button>
					) : isLink ? (
						<Link
							href={right as string}
							target="_blank"
							rel="noopener noreferrer">
							<Typography
								sx={{
									maxWidth: "250px",
									textOverflow: "ellipsis",
									overflow: "hidden",
									whiteSpace: "nowrap",
									fontSize: "18px",
								}}>
								{truncatedLink}
							</Typography>
						</Link>
					) : (
						<Typography
							sx={{
								maxWidth: "250px",
								textOverflow: "ellipsis",
								overflow: "hidden",
								whiteSpace: "nowrap",
								fontSize: "18px",
							}}>
							{truncatedLink}
						</Typography>
					)}
				</div>
				<div className={styles.edit_box}>
					{isEditing ? (
						<>
							<IconButton
								onClick={() => {
									handleInfoSubmit(
										type,
										valueHolder === "" ? right : valueHolder
									);
									setIsEditing(false);
									setIsValid(true);
								}}
								sx={{ color: "success.main" }}
								disabled={
									!isValid || valueHolder == right || validationInProgress
										? true
										: false
								}>
								<CheckCircleRounded />
							</IconButton>
							<IconButton
								sx={{ color: "error.main" }}
								onClick={() => {
									setIsEditing(false);
									setValueHolder(right);
								}}>
								<CancelRounded />
							</IconButton>
						</>
					) : isEmpty ? null : (
						<Button
							variant="outlined"
							size="small"
							endIcon={<Edit />}
							onClick={() => setIsEditing(!isEditing)}>
							EDIT
						</Button>
					)}
				</div>
			</div>
		</Box>
	);
}

export default ProfileLink;
