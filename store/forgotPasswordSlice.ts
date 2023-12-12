import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const forgotPasswordSliceDefault = {
    phone: "",
    phoneIsValid: false,
    resetCode: "",
    newPassword: "",
    forgotPasswordError: "",
    step: 1,    

}

type forgotPasswordSliceType = {
    phone: string;
    phoneIsValid: boolean;
    resetCode: string;
    newPassword: string;
    forgotPasswordError: string;
    step: number;    
}


const forgotPasswordSlice = createSlice({
	name: "forgotPasswordSlice",
	initialState: forgotPasswordSliceDefault as forgotPasswordSliceType,
	reducers: {
        setForgotPasswordPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setForgotPasswordResetCode: (state, action: PayloadAction<string>) => {
            state.resetCode = action.payload;
        },
        setForgotPasswordNewPassword: (state, action: PayloadAction<string>) => {
            state.newPassword = action.payload;
        },
        setForgotPasswordError: (state, action: PayloadAction<string>) => {
            state.forgotPasswordError = action.payload;
        },
        setForgotPasswordPhoneIsValid: (state, action: PayloadAction<boolean>) => {
            state.phoneIsValid = action.payload;
        },
        setForgotPasswordStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        setForgotPasswordDefault: (state) => {
            state.phone = "";
            state.phoneIsValid = false;
            state.resetCode = "";
            state.newPassword = "";
            state.forgotPasswordError = "";
            state.step = 1;
        }

    }

});

export const { setForgotPasswordPhone, setForgotPasswordResetCode, setForgotPasswordNewPassword, setForgotPasswordError, setForgotPasswordPhoneIsValid, setForgotPasswordStep, setForgotPasswordDefault } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer; 