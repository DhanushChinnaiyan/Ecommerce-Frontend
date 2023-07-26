import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box,Link, Button, CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { loginFailed, loginRequest, loginSuccess } from '../../../../STATEMANAGEMENT/UserStates/UserEntry/LoginSlice';
import { useCommonContext } from '../../../../ContextAPI/CommonContextApi';
import { userLoginApi } from '../../../../CommonBackendLinks';

const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const {loading,error} = useSelector(state=>state.userlogin)
    const {handleSnackbar} = useCommonContext()


    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
  
    // validation method using yup
    const userValidation = yup.object({
      Email: yup.string().email("Email is not valid").required("Email is required"),
      Password: yup.string().required("Password is required")
    })
  
    // validate and login method using formik
    const { values, handleSubmit, handleBlur, handleChange, touched, errors } = useFormik({
      initialValues: {
        Email: "dhanushms4021@gmail.com",
        Password: "12345678"
      },
      validationSchema: userValidation,
      onSubmit: (userDetails) => {
        dispatch(loginRequest())
        userLogin(userDetails)
      }
    })
  
    // user login method
    const userLogin = async (userDetails) => {
      try {
        const response = await fetch(userLoginApi, {
          method: "post",
          body: JSON.stringify(userDetails),
          headers: {
            "Content-Type": "application/json"
          }
        })
  
        const data = await response.json()
    
        if (data.message === "User logedIn successfully") {
            dispatch(loginSuccess(data.UserToken))
            handleSnackbar(data.message, "success")
          localStorage.setItem("usertoken", data.UserToken)
          navigate("/")
  
        } else {
            dispatch(loginFailed())
            handleSnackbar(data.message, "error")
        }
       
  
      } catch (error) {
        handleSnackbar("Please try again later", "error")
        dispatch(loginFailed())
        console.log("login error ", error)
      }
    }
    return (
      <div className='loginDiv'>
  
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className='loginInputDiv'
        >
  
          <TextField
            required
            id="outlined-email-input"
            label="Email"
            type='email'
            style={{ width: "calc(300px + 7vw)" }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Email}
            name='Email'
            error={Boolean(touched.Email && errors.Email)}
            helperText={touched.Email && errors.Email}
  
          />
  
          <FormControl style={{ width: "calc(300px + 7vw)" }} sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel required htmlFor="outlined-adornment-password" error={Boolean(touched.password && errors.password)}>Password</InputLabel>
            <OutlinedInput
              inputProps={{ maxLength: 16 }}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              error={Boolean(touched.Password && errors.Password)}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.Password}
              name='Password'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
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
            {touched.Password && <FormHelperText error={Boolean(touched.Password && errors.Password)}>{errors.Password}</FormHelperText>}
          </FormControl>
          <Button variant='contained' color='success' type='submit' sx={{ width: "calc(130px + 1vw)" }} disabled={loading && true} >{loading ? <CircularProgress color='success' size="calc(20px + 0.5vw)" /> : "LOGIN NOW"}</Button>
          <div className='Links'>
            <Link href="/user/forgotpassword" underline="hover">
              Forgot password?
            </Link>
            <Link href="/user/signup" underline="hover">
              Don't have an acoount? Signup
            </Link>
          </div>
  
        </Box>
      </div>
  )
}

export default Login