import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  Password: "",
  confirmPassword: "",
  numericCharacter: false,
  lowerCaseCharacter: false,
  upperCaseCharacter: false,
  specialCharacter: false,
  minimum8Character: false,
};

const userForgotPasswordSlice = createSlice({
  name: "userforgotpassword",
  initialState,
  reducers: {
    apiFetchRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    apiFetchSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.Password = "";
      state.confirmPassword = "";
      state.numericCharacter = false;
      state.lowerCaseCharacter = false;
      state.upperCaseCharacter = false;
      state.specialCharacter = false;
      state.minimum8Character = false;
    },
    apiFetchFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    setPassword: (state, action) => {
      state.Password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setNumericCharacter: (state, action) => {
      state.numericCharacter = action.payload;
    },
    setLowerCaseCharacter: (state, action) => {
      state.lowerCaseCharacter = action.payload;
    },
    setUpperCaseCharacter: (state, action) => {
      state.upperCaseCharacter = action.payload;
    },
    setSpecialCharacter: (state, action) => {
      state.specialCharacter = action.payload;
    },
    setMinimum8Character: (state, action) => {
      state.minimum8Character = action.payload;
    }
  },
});

export const {
  apiFetchRequest,
  apiFetchSuccess,
  apiFetchFailed,
  setPassword,
  setUpperCaseCharacter,
  setConfirmPassword,
  setNumericCharacter,
  setLowerCaseCharacter,
  setSpecialCharacter,
  setMinimum8Character
} = userForgotPasswordSlice.actions;
export const userForgotPasswordReducer = userForgotPasswordSlice.reducer;
