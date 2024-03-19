/** @format */

export function isLettersAndSpacesOnly(str: string): boolean {
	const regex = /^[A-Za-z\s]+$/;
	return regex.test(str);
}

export function normalizeWhitespace(str: string): string {
	const regex = /\s+/g;
	return str.replace(regex, " ");
}

export function isValidInstagramLink(url: string): boolean {
	const regex = /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/;
	return url !== "" ? regex.test(url) : true;
}

export function removeWhitespace(str: string): string {
	const regex = /\s+/g;
	return str.replace(regex, "");
}
