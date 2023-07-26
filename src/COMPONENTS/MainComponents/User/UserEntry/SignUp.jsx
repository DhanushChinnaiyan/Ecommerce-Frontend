import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./UserEntry.css";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setPassword,
  setConfirmPassword,
  setNumericCharacter,
  setLowerCaseCharacter,
  setUpperCaseCharacter,
  setSpecialCharacter,
  setMinimum8Character,
  resetSignupForm
} from "../../../../STATEMANAGEMENT/UserStates/UserEntry/SignupSlice";
import { userSignupApi } from "../../../../CommonBackendLinks";
import { useCommonContext } from "../../../../ContextAPI/CommonContextApi";

const SignUP = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputClicked, setPasswordInputClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    Password,
    confirmPassword,
    numericCharacter,
    lowerCaseCharacter,
    upperCaseCharacter,
    specialCharacter,
    minimum8Character,
  } = useSelector((state) => state.signup);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Password Validation

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {handleSnackbar} = useCommonContext()
 
  // password validation elements
  useEffect(() => {
    const numericCharacterVerification = /(?=.*\d)/;
    const lowerCaseCharacterVerification = /(?=.*[a-z])/;
    const upperCaseCharacterVerification = /(?=.*[A-Z])/;
    const specialCharacterVerification = /(?=.*[!@#$%^&*])/;
    const minimum8CharacterVerification = /[0-9a-zA-Z!@#$%^&*]{8,}/;

    dispatch(setNumericCharacter(numericCharacterVerification.test(Password)));
    dispatch(
      setLowerCaseCharacter(lowerCaseCharacterVerification.test(Password))
    );
    dispatch(
      setUpperCaseCharacter(upperCaseCharacterVerification.test(Password))
    );
    dispatch(setSpecialCharacter(specialCharacterVerification.test(Password)));
    dispatch(
      setMinimum8Character(minimum8CharacterVerification.test(Password))
    );

    
  }, [Password]);

  // password validation
  const passwordvalidation = () => {
    const fullPasswordVerification = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,16}$/;
    return fullPasswordVerification.test(Password);
  };

  const handlePasswordChange = (event) => {
    dispatch(setPassword(event.target.value));
    handleChange(event);
  };

  const handleConfirmPasswordChange = (event) => {
    dispatch(setConfirmPassword(event.target.value));
    handleChange(event);
  };

  const handlepasswordOnBlur = (event) => {
    setPasswordInputClicked(false);
    handleBlur(event);
  };
  

  // validating fields using yup
  const userValidation = yup.object({
    FirstName: yup.string().required("First name is required"),
    Email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    PinCode: yup
      .string()
      .required("Pincode is required")
      .test(
        "length",
        "Invalid pincode",
        (value) => value.length === 6
      ),
    Nationality: yup
      .string()
      .required("Nationality is require")
      .test("countries","INDIAN people only allowed",(value) => value === "INDIAN"),
    PhoneNumber: yup
      .string()
      .required("Phone number is required")
      .test(
        "length",
        "Invalid phone number",
        (value) => value.length === 10
      ),
    Password: yup
      .string()
      .required("Password is required")
      .test("password", "Invalid password", passwordvalidation),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("Password"), null], "Password must match"),
  });

  // signup method using formik
  const { values, handleSubmit, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        FirstName:"",
        LastName:"",
        Email:"",
        PinCode:"",
        Nationality:"INDIAN",
        PhoneNumber:"",
        Password,
        confirmPassword,
      },
     validationSchema:userValidation,
      onSubmit: async (newUser) => {
    try {
      console.log("working")
      setLoading(true);
      const response = await fetch(userSignupApi, {
        method: "post",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.message === "User registered successfully") {
        handleSnackbar(data.message,"success")
        navigate("/login");
        dispatch(resetSignupForm())
      } else {
        handleSnackbar(data.message,"error")
      }
      setLoading(false);
      
    } catch (error) {
      handleSnackbar("Please try again later","error")
      console.log("signup error ", error);
      setLoading(false);
    }
  }
})

  return (
    <div className="signupDiv">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "25ch" },
        }}
        onSubmit={handleSubmit}
        className="signupInputDiv"
      >
        <TextField
          required
          id="outlined-required"
          label="First Name"
          type="text"
          style={{ width: "calc(300px + 7vw)", padding: "5px" }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.FirstName}
          name="FirstName"
          error={Boolean(touched.FirstName && errors.FirstName)}
          helperText={touched.FirstName && errors.FirstName}
          inputProps={{
            style: {
              height: "8px",
            },
          }}
        />
        <TextField
          id="outlined-lastname-input"
          label="Last Name"
          style={{ width: "calc(300px + 7vw)", padding: "5px" }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.LastName}
          name="LastName"
          inputProps={{
            style: {
              height: "8px",
            },
          }}
        />
        <TextField
          required
          id="fullWidth-email-input"
          label="Email"
          type="email"
          style={{ width: "calc(300px + 7vw)", padding: "5px" }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.Email}
          error={Boolean(touched.Email && errors.Email)}
          helperText={touched.Email && errors.Email}
          name="Email"
          inputProps={{
            style: {
              height: "8px",
            },
          }}
        />
        <TextField
          required
          id="fullWidth-PinCode-input"
          label="PinCode"
          type="number"
          style={{ width: "calc(300px + 7vw)", padding: "5px" }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.PinCode}
          error={Boolean(touched.PinCode && errors.PinCode)}
          helperText={touched.PinCode && errors.PinCode}
          name="PinCode"
          inputProps={{
            style: {
              height: "8px",
            },
          }}
        />
        <TextField
          required
          id="fullWidth-nationality-input"
          label="Nationality"
          type="text"
          style={{ width: "calc(300px + 7vw)", padding: "5px" }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.Nationality}
          error={Boolean(touched.Nationality && errors.Nationality)}
          helperText={touched.Nationality && errors.Nationality}
          name="Nationality"
          inputProps={{
            style: {
              height: "8px",
            },
          }}
        />
        <TextField
          required
          id="fullWidth-phoneNumber-input"
          label="PhoneNumber"
          type="number"
          style={{ width: "calc(300px + 7vw)", padding: "5px" }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.PhoneNumber}
          error={Boolean(touched.PhoneNumber && errors.PhoneNumber)}
          helperText={touched.PhoneNumber && errors.PhoneNumber}
          name="PhoneNumber"
          inputProps={{
            style: {
              height: "8px",
            },
          }}
        />

        <FormControl
          style={{ width: "calc(300px + 7vw)", padding: "5px" }}
          sx={{ m: 1, width: "25ch" }}
          variant="outlined"
        >
          <InputLabel
            required
            htmlFor="outlined-adornment-password"
            error={Password.length > 0 && !passwordvalidation()}
          >
            Password
          </InputLabel>
          <OutlinedInput
            inputProps={{
              maxLength: 16,
              style: {
                height: "8px",
              },
            }}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={handlePasswordChange}
            onFocus={() => setPasswordInputClicked(true)}
            onBlur={handlepasswordOnBlur}
            error={Password.length > 0 && !passwordvalidation()}
            value={values.Password}
            name="Password"
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
          {Password.length > 0 && !passwordvalidation() && (
            <FormHelperText error>{errors.Password}</FormHelperText>
          )}
        </FormControl>
        {/* password validation elements */}
        {passwordInputClicked && (
          <div>
            {numericCharacter ? (
              <Typography
                variant="body1"
                style={{ color: "green", fontSize: "calc(11px + 0.3vw)" }}
                gutterBottom
              >
                <CheckIcon sx={{ fontSize: "calc(12px + 0.3vw)" }} /> At least
                one numeric character(1-9)
              </Typography>
            ) : (
              <Typography
                variant="body1"
                style={{ color: "red", fontSize: "calc(11px + 0.3vw)" }}
                gutterBottom
              >
                At least one numeric character(1-9)
              </Typography>
            )}
            {lowerCaseCharacter ? (
              <Typography
                variant="body1"
                style={{ color: "green", fontSize: "calc(11px + 0.3vw)" }}
                gutterBottom
              >
                <CheckIcon sx={{ fontSize: "calc(12px + 0.3vw)" }} />
                At least one lowercase letter(a-z)
              </Typography>
            ) : (
              <Typography
                variant="body1"
                style={{ color: "red", fontSize: "calc(11px + 0.3vw)" }}
                gutterBottom
              >
                At least one lowercase letter(a-z)
              </Typography>
            )}
            {upperCaseCharacter ? (
              <Typography
                variant="body1"
                style={{ color: "green", fontSize: "calc(11px + 0.3vw)" }}
                gutterBottom
              >
                <CheckIcon sx={{ fontSize: "calc(12px + 0.3vw)" }} />
                At least one uppercase letter(A-Z)
              </Typography>
            ) : (
              <Typography
                variant="body1"
                style={{ color: "red", fontSize: "calc(11px + 0.3vw)" }}
                gutterBottom
              >
                At least one uppercase letter(A-Z)
              </Typography>
            )}
            {specialCharacter ? (
              <Typography
                variant="body1"
                style={{ color: "green", fontSize: "calc(11px + 0.3vw)" }}
                gutterBottom
              >
                <CheckIcon sx={{ fontSize: "calc(12px + 0.3vw)" }} />
                At least one special character(!@#$%^&*)
              </Typography>
            ) : (
              <Typography
                variant="body1"
                style={{ color: "red", fontSize: "calc(11px + 0.3vw)" }}
                gutterBottom
              >
                At least one special character(!@#$%^&*)
              </Typography>
            )}
            {minimum8Character ? (
              <Typography
                variant="body1"
                style={{ color: "green", fontSize: "calc(11px + 0.3vw)" }}
                gutterBottom
              >
                <CheckIcon sx={{ fontSize: "calc(12px + 0.3vw)" }} />A minimum
                of 8 characters
              </Typography>
            ) : (
              <Typography
                variant="body1"
                style={{ color: "red", fontSize: "calc(11px + 0.3vw)" }}
                gutterBottom
              >
                A minimum of 8 characters
              </Typography>
            )}
          </div>
        )}
        <TextField
          required
          id="fullWidth-password-input"
          label="Confirm Password"
          type="password"
          style={{ width: "calc(300px + 7vw)", padding: "5px" }}
          inputProps={{
            maxLength: 16,
            style: {
              height: "8px",
            },
          }}
          onChange={handleConfirmPasswordChange}
          onBlur={handleBlur}
          value={values.confirmPassword}
          name="confirmPassword"
          error={confirmPassword.length > 0 && Password !== confirmPassword}
        />

        <Button
          variant="contained"
          sx={{ width: "calc(130px + 1vw)" }}
          disabled={loading}
          color="success"
          type="submit"
        >
          {" "}
          {loading ? (
            <CircularProgress color="success" size="calc(20px + 0.5vw)" />
          ) : (
            "signup now"
          )}
        </Button>

        <div className="Links">
          {" "}
          <Link href="/user/login" underline="hover">
            Already registered User? Log in
          </Link>
        </div>
      </Box>
    </div>
  );
};

export default SignUP;
