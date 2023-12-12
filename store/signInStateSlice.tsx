/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const signInStateDefault = {
	phone: "",
	password: "",
};

type signInStateSliceType = {
	phone: string;
	password: string;
};

const SignInStateSlice = createSlice({
	name: "SignInStateSlice",
	initialState: signInStateDefault,
	reducers: {
		setSignInPasswordSlice: (
			state: signInStateSliceType,
			action: PayloadAction<string>
		) => {
			state.password = action.payload;
		},
		setSignInPhoneSlice: (
			state: signInStateSliceType,
			action: PayloadAction<string>
		) => {
			state.phone = action.payload;
		},
		setSignInDefault: (state: signInStateSliceType) => {
			state.phone = signInStateDefault.phone;
			state.password = signInStateDefault.password;
		},
	},
});

export const { setSignInPasswordSlice, setSignInPhoneSlice, setSignInDefault } =
	SignInStateSlice.actions;
export default SignInStateSlice.reducer;
