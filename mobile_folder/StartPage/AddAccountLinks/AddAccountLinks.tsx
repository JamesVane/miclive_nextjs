/** @format */

import React, { useState } from "react";
import styles from "./styles.module.css";
import {
	Divider,
	TextField,
	InputAdornment,
	Button,
	IconButton,
	LinearProgress,
} from "@mui/material";
import {
	LocationCityRounded,
	Instagram,
	EmailRounded,
	LocalPhoneRounded,
	LinkRounded,
	CheckRounded,
	ArrowBackIosRounded,
	ClearRounded,
} from "@mui/icons-material";

interface AddAccountLinksProps {
	city: string;
	phone: string;
	email: string;
	IG: string;
	website: string;
	setCity: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setPhone: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setInstagram: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setWebsite: (event: React.ChangeEvent<HTMLInputElement>) => void;
	phoneError: string;
	emailError: string;
	IGError: string;
	websiteError: string;
	handleBack: () => void;
	handleSubmit: () => void;
	handleClear: (what: "city" | "phone" | "email" | "IG" | "website") => void;
	isSubmitting: boolean;
}

function AddAccountLinks({
	city,
	phone,
	email,
	IG,
	website,
	setCity,
	setPhone,
	setEmail,
	setInstagram,
	setWebsite,
	phoneError,
	emailError,
	IGError,
	websiteError,
	handleBack,
	handleSubmit,
	handleClear,
	isSubmitting,
}: AddAccountLinksProps) {
	const [whatIsFocused, setWhatIsFocused] = useState({
		city: false,
		email: false,
		IG: false,
		website: false,
		phone: false,
	});

	function handleWhatIsFocused(key: string, value: boolean) {
		setWhatIsFocused({ ...whatIsFocused, [key]: value });
	}

	return (
		<>
			<div className={styles.main_div}>
				<div className={styles.header_div}>Add Profile Info/Links</div>
				<div className={styles.divider_div}>
					<Divider variant="middle" flexItem />
				</div>
				<div className={styles.input_div}>
					<TextField
						disabled={isSubmitting}
						onFocus={() => handleWhatIsFocused("city", true)}
						onBlur={() => handleWhatIsFocused("city", false)}
						value={city}
						onChange={setCity}
						label="City"
						placeholder="City"
						sx={{ width: "100%" }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LocationCityRounded
										sx={{
											color: whatIsFocused.city
												? "primary.main"
												: "action.disabled",
										}}
									/>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment sx={{ width: "30px" }} position="end">
									<IconButton
										disabled={isSubmitting}
										onClick={() => handleClear("city")}>
										<ClearRounded
											sx={{
												color: whatIsFocused.city
													? "primary.main"
													: "action.disabled",
											}}
										/>
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</div>
				<div className={styles.input_div}>
					<TextField
						disabled={isSubmitting}
						error={emailError !== ""}
						onFocus={() => handleWhatIsFocused("email", true)}
						onBlur={() => handleWhatIsFocused("email", false)}
						value={email}
						onChange={setEmail}
						label="Email"
						placeholder="Email"
						sx={{ width: "100%" }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<EmailRounded
										sx={{
											color:
												emailError !== ""
													? "error.main"
													: whatIsFocused.email
													? "primary.main"
													: "action.disabled",
										}}
									/>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment sx={{ width: "30px" }} position="end">
									<IconButton
										disabled={isSubmitting}
										onClick={() => handleClear("email")}>
										<ClearRounded
											sx={{
												color: whatIsFocused.email
													? "primary.main"
													: "action.disabled",
											}}
										/>
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</div>
				<div className={styles.error_styles}>{emailError}</div>
				<div className={styles.input_div}>
					<TextField
						disabled={isSubmitting}
						error={IGError !== ""}
						onFocus={() => handleWhatIsFocused("IG", true)}
						onBlur={() => handleWhatIsFocused("IG", false)}
						value={IG}
						onChange={setInstagram}
						label="Instagram"
						placeholder="Instagram"
						sx={{ width: "100%" }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Instagram
										sx={{
											color:
												IGError !== ""
													? "error.main"
													: whatIsFocused.IG
													? "primary.main"
													: "action.disabled",
										}}
									/>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment sx={{ width: "30px" }} position="end">
									<IconButton
										disabled={isSubmitting}
										onClick={() => handleClear("IG")}>
										<ClearRounded
											sx={{
												color: whatIsFocused.IG
													? "primary.main"
													: "action.disabled",
											}}
										/>
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</div>
				<div className={styles.error_styles}>{IGError}</div>
				<div className={styles.input_div}>
					<TextField
						disabled={isSubmitting}
						error={websiteError !== ""}
						onFocus={() => handleWhatIsFocused("website", true)}
						onBlur={() => handleWhatIsFocused("website", false)}
						value={website}
						onChange={setWebsite}
						label="Website"
						placeholder="Website"
						sx={{ width: "100%" }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LinkRounded
										sx={{
											color:
												websiteError !== ""
													? "error.main"
													: whatIsFocused.website
													? "primary.main"
													: "action.disabled",
										}}
									/>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment sx={{ width: "30px" }} position="end">
									<IconButton
										disabled={isSubmitting}
										onClick={() => handleClear("website")}>
										<ClearRounded
											sx={{
												color: whatIsFocused.website
													? "primary.main"
													: "action.disabled",
											}}
										/>
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</div>
				<div className={styles.error_styles}>{websiteError}</div>
				<div className={styles.input_div}>
					<TextField
						disabled={isSubmitting}
						error={phoneError !== ""}
						onFocus={() => handleWhatIsFocused("phone", true)}
						onBlur={() => handleWhatIsFocused("phone", false)}
						value={phone}
						onChange={setPhone}
						label="Phone"
						placeholder="Phone"
						sx={{ width: "100%" }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LocalPhoneRounded
										sx={{
											color:
												phoneError !== ""
													? "error.main"
													: whatIsFocused.phone
													? "primary.main"
													: "action.disabled",
										}}
									/>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment sx={{ width: "30px" }} position="end">
									<IconButton
										disabled={isSubmitting}
										onClick={() => handleClear("phone")}>
										<ClearRounded
											sx={{
												color: whatIsFocused.phone
													? "primary.main"
													: "action.disabled",
											}}
										/>
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</div>
				<div className={styles.error_styles}>{phoneError}</div>
			</div>
			<div className={styles.bottom_div}>
				{isSubmitting ? (
					<LinearProgress color="primary" sx={{ width: "100%" }} />
				) : (
					<Divider variant="middle" flexItem />
				)}
				<div className={styles.bottom_buttons}>
					<Button
						onClick={handleBack}
						disabled={isSubmitting}
						startIcon={<ArrowBackIosRounded />}
						size="large"
						variant="outlined"
						color="secondary">
						back
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={isSubmitting}
						startIcon={<CheckRounded />}
						size="large"
						variant="outlined"
						color="success">
						submit
					</Button>
				</div>
			</div>
		</>
	);
}

export default AddAccountLinks;
