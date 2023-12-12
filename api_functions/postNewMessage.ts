import axios from 'axios';

interface SendMessageParams {
  my_sub: string;
  their_sub: string;
  _request_timestamp: number;
  request_message: string;
}

export const postNewMessage = async ({
  my_sub,
  their_sub,
  _request_timestamp,
  request_message,
}: SendMessageParams): Promise<any> => {
  const endpoint = "https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/messages/putnewmessage";

  try {
    const response = await axios.post(endpoint, {
      my_sub,
      their_sub,
      _request_timestamp,
      request_message,
    });

    if (response.status === 200) {
      return {
        success: true,
        message: "Message sent successfully",
      };
    } else {
      return {
        success: false,
        message: "Failed to send message",
      };
    }
  } catch (error : any) {
    console.error("Error sending message:", error);
    return {
      success: false,
      message: error.message || "An error occurred",
    };
  }
};

