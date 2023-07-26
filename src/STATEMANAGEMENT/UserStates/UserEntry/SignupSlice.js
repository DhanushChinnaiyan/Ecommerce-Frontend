import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Password: "",
  confirmPassword: "",
  numericCharacter: false,
  lowerCaseCharacter: false,
  upperCaseCharacter: false,
  specialCharacter: false,
  minimum8Character: false,
};

const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
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
    },
    resetSignupForm: (state) => {
      state.Password = "";
      state.confirmPassword = "";
      state.numericCharacter = false;
      state.lowerCaseCharacter = false;
      state.upperCaseCharacter = false;
      state.specialCharacter = false;
      state.minimum8Character = false;
    },
  },
});

export const {
  setPassword,
  setConfirmPassword,
  setNumericCharacter,
  setLowerCaseCharacter,
  setUpperCaseCharacter,
  setSpecialCharacter,
  setMinimum8Character,
  resetSignupForm,
} = signUpSlice.actions;

export const signupReducer = signUpSlice.reducer;
