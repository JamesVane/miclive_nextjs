import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const currentSubStoreDefault = {
    userSub: null
}

type CurrentSubStoreType = {
    userSub: string | null
}


const CurrentSubStore = createSlice({
	name: "CurrentSubStore",
	initialState: currentSubStoreDefault as CurrentSubStoreType,
	reducers: {
        setCurrentSub: (state, action: PayloadAction<string | null>) => {
            state.userSub = action.payload;
        } }

});

export const { setCurrentSub  } = CurrentSubStore.actions;
export default CurrentSubStore.reducer; 