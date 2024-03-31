/** @format */

const API_ENDPOINT =
	"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/createaccount/postcreateaccountbase";

type CreateAccountParams = {
	request_username: string;
	request_email: string;
	request_role_name_number: number;
	request_phone_number: string;
};

export const postCreateAccountBase = async (
	authKey: any,
	data: CreateAccountParams
): Promise<string> => {
	try {
		const response = await fetch(API_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authKey}`,
			},
			body: JSON.stringify(data),
		});

		if (response.status !== 200) {
			const result = await response.json();
			throw new Error(result.message || "Unknown error");
		}

		const returnData = await response.json();
		return returnData.returned_id;
	} catch (error) {
		throw error;
	}
};
