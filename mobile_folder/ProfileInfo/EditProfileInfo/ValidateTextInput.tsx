/** @format */

import { useEffect, useCallback } from "react";
import styles from "./styles.module.css";
import { TextField, Divider } from "@mui/material";
import debounce from "lodash/debounce";
import {
	isValidLink,
	isValidInstagramLink,
} from "@/generic_functions/validationFunctions";

interface ValidateTextInputProps {
	handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setValidationInProgress: React.Dispatch<React.SetStateAction<boolean>>;
	setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
	isValid: boolean;
	type: "City" | "Email" | "Phone" | "IG" | "Link";
	value: string;
	placeholder: string;
	label: string;
	disabled: boolean;
}

function ValidateTextInput({
	handleOnChange,
	setValidationInProgress,
	setIsValid,
	isValid,
	type,
	value,
	placeholder,
	label,
	disabled,
}: ValidateTextInputProps) {
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

	const validateValue = useCallback(
		debounce(() => {
			if (value !== "") {
				{
					switch (type) {
						case "Email":
							setIsValid(isValidEmail(value));
							break;
						case "Phone":
							setIsValid(isValidPhoneNumber(value));
							break;
						case "IG":
							setIsValid(isValidInstagramLink(value));
							break;
						case "Link":
							setIsValid(isValidLink(value));
							break;
						default:
							setIsValid(true);
							break;
					}
				}
			}
			setValidationInProgress(false);
		}, 500),
		[value]
	);

	useEffect(() => {
		validateValue();
	}, [value]);

	return (
		<>
			<div className={styles.divider_div_vert}>
				<Divider orientation="vertical" variant="middle" flexItem />
			</div>
			<div className={styles.info_row_right}>
				<TextField
					disabled={disabled}
					error={!isValid}
					onChange={handleOnChange}
					size="small"
					label={label}
					placeholder={placeholder}
					value={value}
					sx={{ width: "90%" }}
				/>
				{isValid ? null : (
					<div className={styles.error_text}>{`Invalid ${label}!`}</div>
				)}
			</div>
		</>
	);
}

export default ValidateTextInput;
