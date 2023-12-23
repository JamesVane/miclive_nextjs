/** @format */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import styles from "./styles.module.css";
import DividerH from "@/universalComponents/DividerH";
import {
	IconButton,
	TextField,
	Button,
	InputAdornment,
	LinearProgress,
	Switch,
} from "@mui/material";
import {
	CloseRounded,
	ClearRounded,
	LocalPhoneRounded,
	CheckRounded,
	AccountBoxRounded,
} from "@mui/icons-material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	formatPhoneNumber,
	unformatPhoneNumber,
} from "@/generic_functions/formatPhoneNumber";
import { postCreateAndReturnTempAccountCode } from "@/api_functions/postCreateAndReturnTempAccountCode";
import { validateUsernameWithMessage } from "@/generic_functions/validationFunctions";
import { debounce } from "lodash";

interface AddPerformerModalProps {
	baseEventId: number;
}

function AddPerformerModal({ baseEventId }: AddPerformerModalProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const [phoneFocused, setPhoneFocused] = useState(false);
	const [phoneError, setPhoneError] = useState("");
	const [phone, setPhone] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [usernameFocused, setUsernameFocused] = useState(false);
	const [usernameError, setUsernameError] = useState("");
	const [username, setUsername] = useState("");
	const [isNewUser, setIsNewUser] = useState(true);

	function handleSetPhone(event: React.ChangeEvent<HTMLInputElement>) {
		const adjustedValue = formatPhoneNumber(event.target.value);
		if (adjustedValue !== null) {
			setPhone(adjustedValue);
		}
	}

	function clearPhone() {
		setPhone("");
		setPhoneError("");
	}

	function closeModal() {
		if (!isLoading) {
			router.push(`/promoter/manage_event/${baseEventId}`);
		}
	}

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	async function handleSubmit() {
		const usernameToSend = username === "" ? "EMPTY" : username;
		setIsLoading(true);
		const unformattedPhone = unformatPhoneNumber(phone);
		const plusOnePhone = `+1${unformattedPhone}`;
		await postCreateAndReturnTempAccountCode(
			plusOnePhone,
			usernameToSend,
			isNewUser
		).then((res) => {
			if (res) {
				if (res === "Code Created") {
					router.push(
						`${pathname}/${unformattedPhone}` +
							"?" +
							createQueryString("username", usernameToSend)
					);
				} else if (res === "Username already exists") {
					setUsernameError("Username already exists");
				} else if (
					res ===
					"Phone has never been used. Please provide a username and try again"
				) {
					setIsNewUser(true);
					setUsernameError(
						"Phone has never been used. Please provide a username and try again"
					);
				}
			}
		});
		setIsLoading(false);
	}

	function handleSetUsername(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value.length <= 25) {
			setUsername(event.target.value);
		}
	}

	function clearUsername() {
		setUsername("");
		setUsernameError("");
	}

	useEffect(() => {
		const debouncedValidation = debounce(() => {
			setUsernameError(validateUsernameWithMessage(username));
		}, 1000);

		debouncedValidation();
		return () => {
			debouncedValidation.cancel();
		};
	}, [username]);

	return (
		<div className={styles.modal_main_div}>
			<div
				className={styles.modal_phone_paper}
				style={{
					height: isNewUser ? "375px" : "335px",
				}}>
				<div className={styles.add_performer_header}>
					<IconButton
						sx={{
							position: "absolute",
							right: "5px",
							top: "5px",
							height: "40px",
							width: "40px",
						}}
						onClick={closeModal}>
						<CloseRounded
							sx={{
								height: "35px",
								width: "35px",
							}}
						/>
					</IconButton>
					Add Performer
				</div>
				<DividerH />
				<div className={styles.modal_below_header}>
					<div className={styles.switch_div}>
						<Switch
							onChange={() => setIsNewUser((prev) => !prev)}
							checked={isNewUser}
						/>{" "}
						New User
					</div>

					<TextField
						helperText={phoneError}
						disabled={isLoading}
						sx={{ width: "65%" }}
						label="Phone Number"
						error={phoneError !== ""}
						autoComplete="tel"
						onFocus={() => setPhoneFocused(true)}
						onBlur={() => setPhoneFocused(false)}
						placeholder="(123) 456-7890"
						value={phone}
						onChange={handleSetPhone}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LocalPhoneRounded
										sx={{
											color:
												phoneError !== ""
													? "error.main"
													: phoneFocused
													? "primary.main"
													: "action.disabled",
										}}
									/>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment sx={{ width: "30px" }} position="end">
									<IconButton onClick={clearPhone}>
										<ClearRounded
											sx={{
												color:
													phoneError !== ""
														? "error.main"
														: phoneFocused
														? "primary.main"
														: "action.disabled",
											}}
										/>
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					{isNewUser ? (
						<TextField
							sx={{ width: "65%", marginTop: "20px" }}
							error={usernameError !== ""}
							helperText={usernameError}
							autoComplete="username"
							onFocus={() => setUsernameFocused(true)}
							onBlur={() => setUsernameFocused(false)}
							placeholder="Username"
							value={username}
							type="string"
							label="Username"
							onChange={handleSetUsername}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AccountBoxRounded
											sx={{
												color:
													usernameError !== ""
														? "error.main"
														: usernameFocused
														? "primary.main"
														: "action.disabled",
											}}
										/>
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment sx={{ width: "30px" }} position="end">
										<IconButton onClick={clearUsername}>
											<ClearRounded
												sx={{
													color:
														usernameError !== ""
															? "error.main"
															: usernameFocused
															? "primary.main"
															: "action.disabled",
												}}
											/>
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					) : null}
					<Button
						onClick={handleSubmit}
						disabled={
							(username.length < 2 && isNewUser) ||
							usernameError !== "" ||
							isLoading ||
							phoneError !== "" ||
							phone.length !== 14
						}
						color="success"
						size="large"
						sx={{
							position: "relative",
							overflow: "hidden",
							marginTop: "20px",
						}}
						variant="outlined"
						startIcon={<CheckRounded />}>
						{isLoading ? (
							<LinearProgress
								color="success"
								sx={{
									position: "absolute",
									bottom: "0px",
									width: "100%",
								}}
							/>
						) : null}
						submit
					</Button>
				</div>
			</div>
		</div>
	);
}

export default AddPerformerModal;
