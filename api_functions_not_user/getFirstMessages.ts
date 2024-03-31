import axios from 'axios';

export async function getFirstMessages(mySub: string, theirSub: string) {
    try {
        const response = await axios.get(`https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/messages/getfirstmessages?mySub=${mySub}&theirSub=${theirSub}`);
  
        return response.data;
    } catch(error) {
        console.error("An error occurred:", error);
    }
}
