const API_ENDPOINT = 'https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/messages/getconversationlist';

export type InnerObjectType = {
    name: string;
    type: "performer" | "promoter" | "dj";
    roleId: string;
    DND: boolean;
    pinned: boolean;
    timestamp: number;
    topMessage: string;
    unOpened: boolean;
}

export type ConversationListType = {
    [userSub: string]: InnerObjectType
}

export const getConversationList = async (request_sub: string) => {
  try {
    const response = await fetch(`${API_ENDPOINT}?request_sub=${request_sub}`);
    const result = await response.json();

    const adjustedData = result.data === false ? false : Object.fromEntries(
      Object.entries(result as ConversationListType).map(([userSub, innerObject]) => {
        return [
          userSub,
          {
            ...innerObject,
            roleId: parseInt(innerObject.roleId, 10)
          }
        ];
      })
    );

    console.log("adjustedData",adjustedData)
    return adjustedData;
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err;
  }
};