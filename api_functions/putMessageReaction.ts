// api.ts

const API_ENDPOINT = "https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/messages/putmessagereaction";

interface Reaction {
    sender: "Thumb" | "?" | "!" | null;
    reciver: "Thumb" | "?" | "!" | null;
}

interface PutMessageReactionParams {
    my_sub: string;
    their_sub: string;
    request_primary_key: string;
    request_timestamp: number;
    request_reaction: Reaction;
    sender_name: string;
}

export const putMessageReaction = async (params: PutMessageReactionParams): Promise<Response> => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Assuming server responds with json
    } catch (error : any) {
        console.error("There was an error with the fetch operation:", error.message);
        throw error;
    }
};
