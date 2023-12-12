/** @format */

export const isValidEmail = (email: string): boolean => {
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailPattern.test(email) && email.length <= 255;
};

export function validatePassword(password: string): boolean {
	if (password.length < 8) return false; // Check for minimum length of 8 characters
	if (!/[A-Z]/.test(password)) return false; // Check for uppercase letter
	if (!/[a-z]/.test(password)) return false; // Check for lowercase letter
	if (!/[0-9]/.test(password)) return false; // Check for numeric character
	if (!/[!@#$%^&*()_+\-\[\]{}|\\:;"'<>,.?~]/.test(password)) return false; // Check for special character

	return true;
}

export function validatePasswordWithMessage(password: string): string {
	if (password === "") {
		return "";
	} else if (password.length < 8) {
		return "Password must me at least 8 characters long";
	} // Check for minimum length of 8 characters
	else if (!/[A-Z]/.test(password)) {
		return "Password must contain at least 1 uppercase letter";
	} // Check for uppercase letter
	else if (!/[a-z]/.test(password)) {
		return "Password must contain at least 1 lowercase letter";
	} // Check for lowercase letter
	else if (!/[0-9]/.test(password)) {
		return "Password must contain at least 1 number letter";
	} // Check for numeric character
	else if (!/[!@#$%^&*()_+\-\[\]{}|\\:;"'<>,.?~]/.test(password)) {
		return "Password must contain at least 1 special letter";
	} // Check for special character
	else {
		return "";
	}
}

export function validateUsername(username: string): boolean {
	// Check length
	if (username.length > 25) return false;

	// Check if username only contains alphanumeric characters and underscores
	if (!/^[a-zA-Z0-9_]+$/.test(username)) return false;

	return true;
}

export function validateUsernameWithMessage(username: string): string {
	// Check if username only contains alphanumeric characters
	if (username === "") {
		return "";
	} else if (username.length < 4) {
		return "Username must be at least 4 characters long";
	} else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
		return "Username can only contain numbers, letters and underscores";
	} else {
		return "";
	}
}

export function isValidPhoneNumber(phone: string): boolean {
	const regex = /^\(\d{3}\) \d{3}-\d{4}$/;
	return regex.test(phone);
}

export function isDomSafeString(input: string): boolean {
	// Check for HTML-like structures or JavaScript events
	const unsafePatterns = [
		/<[^>]*>/, // Matches HTML-like tags
		/on\w+=/i, // Matches event handlers like "onclick"
	];

	for (const pattern of unsafePatterns) {
		if (pattern.test(input)) {
			return false;
		}
	}

	// Extend the function with other checks if needed.

	return true;
}

export function isValidInstagramLink(link: string): boolean {
	const instagramRegex =
		/^(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9._-]+)\/?$/;
	return instagramRegex.test(link);
}

export function isValidLink(link: string): boolean {
	const linkRegex =
		/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)*\+,;=.]+$/;
	return linkRegex.test(link);
}
