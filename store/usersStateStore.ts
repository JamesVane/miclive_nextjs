/** @format */

// usersStateStore.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfileResponse {
	primary_key: string;
	username: string;
	tagline: string;
	info: {
		City: string | null;
		Email: string | null;
		Phone: string | null;
		IG: string | null;
		Link: string | null;
	} | null;
	
}

type UsersState = UserProfileResponse | null;

const usersStateSlice = createSlice({
	name: "usersState",
	initialState: null as UsersState,
	reducers: {
		setUsersStateProfile: (state, action: PayloadAction<UsersState>) => {
			return action.payload;
		},
	},
});

export const { setUsersStateProfile } = usersStateSlice.actions;
export default usersStateSlice.reducer;
