// Store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { signupReducer } from './UserStates/UserEntry/SignupSlice';
import { userLoginReducer } from './UserStates/UserEntry/LoginSlice';
import { userForgotPasswordReducer } from './UserStates/UserEntry/ForgotSlice';
import { productReducer } from './CommonSlice/ProductSlice';

const rootReducer = combineReducers({
  signup: signupReducer,
  userlogin:userLoginReducer,
  userforgotpassword:userForgotPasswordReducer,
  products:productReducer
});

const middleware = [thunk];

export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...middleware, ...getDefaultMiddleware()],
});
