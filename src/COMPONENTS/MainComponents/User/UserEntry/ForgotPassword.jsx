import { Box, Button, CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { urlVerificationApi, usePasswordChangeApi, useResetPasswordApi, userForgotPasswordApi } from '../../../../CommonBackendLinks'
import { useCommonContext } from '../../../../ContextAPI/CommonContextApi'
import { useDispatch, useSelector } from 'react-redux'
import {apiFetchRequest, apiFetchFailed, apiFetchSuccess, setLowerCaseCharacter, setNumericCharacter, setUpperCaseCharacter, setSpecialCharacter, setMinimum8Character, setPassword, setConfirmPassword } from '../../../../STATEMANAGEMENT/UserStates/UserEntry/ForgotSlice'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import CheckIcon from "@mui/icons-material/Check"






// Create component for send mail to user
const ForgotPassword = () => {
    const {handleSnackbar,secureURL} = useCommonContext()
    const dispatch = useDispatch()
    const {loading,error} = useSelector(state=>state.userforgotpassword)
    const [clicked,setClicked] = useState(false)
    const navigate = useNavigate()
    
  // email validation method using yup
  const validation = yup.object({
    Email:yup.string().email("Email is not valid").required("Email is required")
  })

  // validating the fiels method using formik
  const {values,handleSubmit,handleChange,handleBlur,errors,touched} = useFormik({
    initialValues:{
      Email:""
    },
    validationSchema:validation,
    onSubmit:(email) => {
      dispatch(apiFetchRequest()) 
      forgotPasswordFuction(email)
    }
  })

  // mail sending to user
  const forgotPasswordFuction = async(email) => {
  try {
    
    const OTPVerificationURL = secureURL(email.Email)
    const response = await fetch(userForgotPasswordApi,{
      method:"post",
      body:JSON.stringify(email),
      headers:{
        "Content-Type":"application/json"
      }
    })

    const data = await response.json()
    console.log(data)

    if(data.message === "Email sent successfully"){
        dispatch(apiFetchSuccess())
        handleSnackbar(data.message,"success")
        setClicked(true)
        navigate(`/user/forgotPassword/otpverification${OTPVerificationURL}`)
        
    }else{
        dispatch(apiFetchFailed())
        handleSnackbar(data.message,"error")
    }
    
    
  } catch (error) {
    handleSnackbar("Something went wrong","error")
    dispatch(apiFetchFailed())
  }
  }

  return (
    <div className='forgotPasswordDiv'>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        className='forgotPasswordInputDiv'
        onSubmit={handleSubmit}
      >

        <TextField
          required
          id="outlined-email-input"
          label="Confirm email"
          type="email"
          style={{ width: "calc(300px + 7vw)" }}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.Email && errors.Email)}
          helperText = {touched.Email && errors.Email}
          value={values.Email}
          name='Email'
        />


        <Button variant='contained' color='success' type='submit' sx={{ width: "calc(130px + 1vw)" }} disabled={loading && true} >{loading?<CircularProgress color='success' size="calc(20px + 0.5vw)" /> : clicked ? "Resend OTP" : "send OTP"}</Button>

        <div className="Links">
          <Link href="/user/login" underline="hover">
            I remember my Password? Login
          </Link>
        </div>

      </Box>
    </div>
  )
}

// Create OTP verification component

export const OTPVerificationComponent = () => {
  const {handleSnackbar,secureURL} = useCommonContext()
    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.userforgotpassword)
   const navigate = useNavigate()
   const [queryParams] = useSearchParams()
   const OTPVerificationURL = secureURL(queryParams.get("value"))
   
   const apiurl = `${urlVerificationApi}/?token=${queryParams.get("token")}&timestamp=${queryParams.get("timestamp")}`;

   const urlVerification = async() => {
    try {
      const response = await fetch(apiurl,{
        method:"get"
      })

      const data = await response.json();

      if(data.message !== "URL verified"){
        handleSnackbar(data.message,"error")
        navigate("/user/forgotPassword")
      }
      
    } catch (error) {
      console.log(error)
      handleSnackbar("Internal server problem","error")
      navigate("/user/forgotPassword")
    }
   }

    useEffect(()=>{
      urlVerification()
      
    },[])
  // email validation method using yup
  const validation = yup.object({
    OTP:yup.string().required("OTP is required").length(6)
  })

  // validating the fiels method using formik
  const {values,handleSubmit,handleChange,handleBlur,errors,touched} = useFormik({
    initialValues:{
      OTP:"",
      Email:queryParams.get("value")
    },
    validationSchema:validation,
    onSubmit:(OTP) => {
      dispatch(apiFetchRequest()) 
      forgotPasswordFuction(OTP)
    }
  })

  // mail sending to user
  const forgotPasswordFuction = async(OTP) => {
  try {
    const response = await fetch(useResetPasswordApi,{
      method:"post",
      body:JSON.stringify(OTP),
      headers:{
        "Content-Type":"application/json"
      }
    })

    const data = await response.json()
    console.log(data)

    if(data.message === "You can reset your password now"){
        dispatch(apiFetchSuccess())
        handleSnackbar(data.message,"success")
        navigate(`/user/resetPassword${OTPVerificationURL}`,{replace:true})
    }else{
        dispatch(apiFetchFailed())
        handleSnackbar(data.message,"error")
    }
    
    
  } catch (error) {
    handleSnackbar("Something went wrong","error")
    console.log(error)
    dispatch(apiFetchFailed())
  }
  }

  return (
    <div className='forgotPasswordDiv'>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        className='forgotPasswordInputDiv'
        onSubmit={handleSubmit}
      >

        <TextField
          required
          id="outlined-otp-input"
          label="Enter OTP"
          type="number"
          style={{ width: "calc(300px + 7vw)" }}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.OTP && errors.OTP)}
          helperText = {touched.OTP && errors.OTP}
          value={values.OTP}
          name='OTP'
        />


        <Button variant='contained' color='success' type='submit' sx={{ width: "calc(130px + 1vw)" }} disabled={loading && true} >{loading?<CircularProgress color='success' size="calc(20px + 0.5vw)" /> : "Verify OTP"}</Button>

        <div className="Links">
          <Link href="/user/login" underline="hover">
            I remember my Password? Login
          </Link>
        </div>

      </Box>
    </div>
  )
}

// Create component for reset Password
export const ResetPassword = () => {
  //local states
  const [showPassword, setShowPassword] = useState(false);
  const [PasswordInputClicked, setPasswordInputClicked] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  // import from forgot password slice
  const {loading,Password,confirmPassword,numericCharacter,lowerCaseCharacter,upperCaseCharacter,specialCharacter,minimum8Character} = useSelector(state=>state.userforgotpassword)
 
  // import handle snack bar from common context file
  const {handleSnackbar} = useCommonContext()

  // Get search params
  const [queryParams] = useSearchParams()
  const token = queryParams.get("token")
  const timestamp = queryParams.get("timestamp")
  const userEmail = queryParams.get("value")

  // Password show function
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  // Password validation elements
  useEffect(() => {
    const numericCharacterVerification = /(?=.*\d)/
    const lowerCaseCharacterVerification = /(?=.*[a-z])/
    const upperCaseCharacterVerification = /(?=.*[A-Z])/
    const specialCharacterVerification = /(?=.*[!@#$%^&*])/
    const minimum8CharacterVerification = /[0-9a-zA-Z!@#$%^&*]{8,}/

    dispatch(setNumericCharacter(numericCharacterVerification.test(Password)))
    dispatch(setLowerCaseCharacter(lowerCaseCharacterVerification.test(Password)))
    dispatch(setUpperCaseCharacter(upperCaseCharacterVerification.test(Password)))
    dispatch(setSpecialCharacter(specialCharacterVerification.test(Password)))
    dispatch(setMinimum8Character(minimum8CharacterVerification.test(Password)))
  }, [Password])

  // uverify url token
  const urlVerification = async() => {
    try {
      const response = await fetch(`${urlVerificationApi}/?token=${token}&value=${userEmail}&timestamp=${timestamp}`,{
        method:"get"
      })

      const data = await response.json();

      if(data.message !== "URL verified"){
        handleSnackbar(data.message,"error")
        navigate("/user/forgotPassword")
      }

    } catch (error) {
      console.log(error)
      handleSnackbar("Internal server problem","error")
      navigate("/user/forgotPassword")
    }
   }

  useEffect(()=>{
    urlVerification()
  },[])
  
  // onBlur method
  const handlePasswordBlur = (event) => {
    setPasswordInputClicked(false)
    handleBlur(event)
  }
  // onChange method
  const handlePasswordonchange = (event) => {
    dispatch(setPassword(event.target.value))
    handleChange(event)
  }

  const handleConfirmPasswordChange = (event) => {
    dispatch(setConfirmPassword(event.target.value))
    handleChange(event)
  }

  // Password validation
  const Passwordvalidation = () => {
    const fullPasswordVerification = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,16}$/;
    return fullPasswordVerification.test(Password)
  }

  
  

  // Password validation method using yup
  const validation = yup.object({
    Password:yup.string().test(Passwordvalidation).required("Password is required"),
    confirmPassword:yup.string().oneOf([yup.ref("Password"),null],"Password must match").required("Confirm Password is required")
  })

  // fiels validation method using formik
  const {values,handleSubmit,handleChange,handleBlur,errors,touched} = useFormik({
    initialValues:{
      Password:"",
      confirmPassword:"",
      Email:userEmail
    },
    validationSchema:validation,
    onSubmit:(Password)=>{
      dispatch(apiFetchRequest())
      resetPasswordFunction(Password)
    }
  })

  // Password resetting function
  const resetPasswordFunction = async(Password) => {
try {
   const response = await fetch(usePasswordChangeApi,{
    method:"put",
    body:JSON.stringify(Password),
    headers:{
      "Content-Type":"application/json"
    }
   })
   const data = await response.json()
   console.log(data)
   if(data.message === "Password changed successfully"){
    handleSnackbar(data.message,"success")
    dispatch(apiFetchSuccess())
    navigate('/user/login')
   }else{
    handleSnackbar(data.message,"error")
    dispatch(apiFetchFailed())
   }
  
} catch (error) {
  handleSnackbar("We encountered an error resetting your Password","error")
  console.log("Password reseting error ",error)
  dispatch(apiFetchFailed())
}
  }

  return (
    <div className='forgotPasswordDiv'>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      onSubmit={handleSubmit}
      className='forgotPasswordInputDiv'
    >


      <FormControl style={{ width: "calc(300px + 7vw)" }} sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel required htmlFor="outlined-adornment-Password" error={Password.length > 0 ? !Passwordvalidation() :touched.Password && !Passwordvalidation()}>Password</InputLabel>
        <OutlinedInput
          inputProps={{ maxLength: 16 }}
          id="outlined-adornment-Password"
          type={showPassword ? 'text' : 'Password'}
          onChange={handlePasswordonchange}
          onFocus={() => setPasswordInputClicked(true)}
          onBlur={handlePasswordBlur}
          error={Password.length > 0 ? !Passwordvalidation() :touched.Password && !Passwordvalidation()}
          value={values.Password}
          name='Password'
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle Password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {Password.length > 0 ? !Passwordvalidation() && <FormHelperText  error={Password.length > 0 ? !Passwordvalidation() : touched.Password && !Passwordvalidation()}>{errors.Password}</FormHelperText> : touched.Password && !Passwordvalidation() && <FormHelperText  error={Password.length > 0 ? !Passwordvalidation() :touched.Password && !Passwordvalidation()}>{errors.Password}</FormHelperText>}
      </FormControl>

      {/* Password validation elements */}
      {PasswordInputClicked &&
        <div>
          {numericCharacter ? (<Typography variant='body1' style={{ color: "green", fontSize: "calc(11px + 0.3vw)" }} gutterBottom><CheckIcon sx={{ fontSize: "calc(12px + 0.3vw)" }} /> At least one numeric character(1-9)</Typography>) : (<Typography variant='body1' style={{ color: "red", fontSize: "calc(11px + 0.3vw)" }} gutterBottom>At least one numeric character(1-9)</Typography>)}
          {lowerCaseCharacter ? (<Typography variant='body1' style={{ color: "green", fontSize: "calc(11px + 0.3vw)" }} gutterBottom><CheckIcon sx={{ fontSize: "calc(12px + 0.3vw)" }} />At least one lowercase letter(a-z)</Typography>) : (<Typography variant='body1' style={{ color: "red", fontSize: "calc(11px + 0.3vw)" }} gutterBottom>At least one lowercase letter(a-z)</Typography>)}
          {upperCaseCharacter ? (<Typography variant='body1' style={{ color: "green", fontSize: "calc(11px + 0.3vw)" }} gutterBottom><CheckIcon sx={{ fontSize: "calc(12px + 0.3vw)" }} />At least one uppercase letter(A-Z)</Typography>) : (<Typography variant='body1' style={{ color: "red", fontSize: "calc(11px + 0.3vw)" }} gutterBottom>At least one uppercase letter(A-Z)</Typography>)}
          {specialCharacter ? (<Typography variant='body1' style={{ color: "green", fontSize: "calc(11px + 0.3vw)" }} gutterBottom><CheckIcon sx={{ fontSize: "calc(12px + 0.3vw)" }} />At least one special character(!@#$%^&*)</Typography>) : (<Typography variant='body1' style={{ color: "red", fontSize: "calc(11px + 0.3vw)" }} gutterBottom>At least one special character(!@#$%^&*)</Typography>)}
          {minimum8Character ? (<Typography variant='body1' style={{ color: "green", fontSize: "calc(11px + 0.3vw)" }} gutterBottom><CheckIcon sx={{ fontSize: "calc(12px + 0.3vw)" }} />A minimum of 8 characters</Typography>) : (<Typography variant='body1' style={{ color: "red", fontSize: "calc(11px + 0.3vw)" }} gutterBottom>A minimum of 8 characters</Typography>)}
        </div>
      }

      <TextField
        required
        id="outlined-Password-input"
        label="Confirm Password"
        type="Password"
        style={{ width: "calc(300px + 7vw)" }}
        inputProps={{ maxLength: 16 }}
        onChange={handleConfirmPasswordChange}
        onBlur={handleBlur}
        error={Boolean(confirmPassword.length > 0 ? errors.confirmPassword : touched.confirmPassword && errors.confirmPassword)}
        value={values.confirmPassword}
        name='confirmPassword'
        helperText = {confirmPassword.length > 0 ? errors.confirmPassword : touched.confirmPassword && errors.confirmPassword}
      />


      <Button variant='contained' color='success' type='submit' sx={{ width: "calc(170px + 1vw)" }} disabled={loading && true}  >{loading ? <CircularProgress color='success' size="calc(20px + 0.5vw)" /> : "reset Password"}</Button>


    </Box>
      
    </div>
  )
}

export default ForgotPassword