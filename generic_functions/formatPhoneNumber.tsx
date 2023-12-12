/** @format */

function retainOnlyNumbers(inputString: string) {
	return inputString.replace(/[^0-9]/g, "");
}

function isValidPhoneNumber(input: string): boolean {
	const phonePattern = /^\(\d{1,3}\)?( \d{0,3}(?:-\d{0,4})?)?$/;
	return phonePattern.test(input);
}

function formatToPhoneNumber(input: string) {
	const onlyNumbers = input.replace(/[^0-9]/g, "");

	if (onlyNumbers.length > 10) {
		return null; // More than 10 digits are not allowed.
	}

	if (onlyNumbers.length <= 3) {
		return `(${onlyNumbers}`;
	} else if (onlyNumbers.length <= 6) {
		return `(${onlyNumbers.substring(0, 3)}) ${onlyNumbers.substring(3)}`;
	} else {
		return `(${onlyNumbers.substring(0, 3)}) ${onlyNumbers.substring(
			3,
			6
		)}-${onlyNumbers.substring(6)}`;
	}
}

function hasInvalidCharacters(input: string): boolean {
	// Check if string contains any characters that aren't a number, "(", ")", or "-"
	const invalidCharPattern = /[^0-9()\-\s]/;
	if (invalidCharPattern.test(input)) {
		return true;
	}

	// Check if string contains more than one consecutive whitespace or newline
	const consecutiveWhitespacePattern = /\s{2,}/;
	if (consecutiveWhitespacePattern.test(input)) {
		return true;
	}

	return false;
}

export function formatPhoneNumber(phoneNumber: string) {
	if (hasInvalidCharacters(phoneNumber)) {
		return null;
	} else if (phoneNumber === "") {
		return phoneNumber;
	} else if (isValidPhoneNumber(phoneNumber)) {
		console.log("Valid phone number");
		return phoneNumber;
	} else {
		const strippedNumbers = retainOnlyNumbers(phoneNumber);
		return formatToPhoneNumber(strippedNumbers);
	}
}

export function unformatPhoneNumber(phoneNumber: string) {
	// Remove all non-digit characters and return
	return phoneNumber.replace(/\D/g, "");
}
