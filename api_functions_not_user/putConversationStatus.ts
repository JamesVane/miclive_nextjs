import axios from 'axios';  // You can install this package using npm install axios if you haven't already

export async function putConversationStatus(
    inputData : {sender_sub: string,
    reciver_sub: string,
    pinned_value: boolean,
    DND_value: boolean,}
): Promise<any> {
    const url = "https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/messages/putconversationstatus";
    
    try {
        // Send PUT request to the endpoint
        const response = await axios.put(url, {
            sender_sub: inputData.sender_sub,
            reciver_sub: inputData.reciver_sub,
            pinned_value: inputData.pinned_value,
            DND_value: inputData.DND_value,
        });

        return response.data;

    } catch (error) {
        // Handle any errors here
        console.error("Error updating conversation status:", error);
        throw error;
    }
}
