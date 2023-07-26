// App.js
import React, { useEffect } from "react";
import {useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import SignUP from "./COMPONENTS/MainComponents/User/UserEntry/SignUp";
import Body from "./COMPONENTS/MainComponents/User/Body";
import { SnackbarProvider } from "notistack";
import {useCommonContext } from "./ContextAPI/CommonContextApi";
import Login from "./COMPONENTS/MainComponents/User/UserEntry/Login";
import ForgotPassword, { OTPVerificationComponent, ResetPassword } from "./COMPONENTS/MainComponents/User/UserEntry/ForgotPassword";

function App() {
 
  const {handleSnackbar,secureURL} = useCommonContext()
  


  
  return (
    
      <SnackbarProvider
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        maxSnack={1}
      >
        <div className="App">
          {/* Your other component code here */}
          <Routes>
            <Route exact path="/" element={<Body />} />
            <Route exact path="/user/signup" element={<SignUP />} />
            <Route path="/user/login" element={<Login/>}/>
            {/* parent route */}
            <Route exact path="/user/forgotpassword" element={<ForgotPassword/>} />
            {/* child route */}
               <Route path="/user/forgotpassword/otpverification" element={<OTPVerificationComponent/>} />
               <Route path="/user/resetpassword" element={<ResetPassword/>} />
         
          </Routes>
        </div>
      </SnackbarProvider>
    
  );
}

export default App;
