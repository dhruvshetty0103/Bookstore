import React, { useState } from "react";
import userService from "../service/userService";
import { Link } from "react-router-dom";
import { Grid, TextField, Typography, Button, Paper } from "@mui/material";
import "../styles/form.scss";
import { withStyles } from "@mui/styles";

const InputField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#A03037",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#A03037",
      },
      "&:hover fieldset": {
        borderColor: "#A03037",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#A03037",
      },
    },
  },
})(TextField);
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (e) => {
    let errorFlag = false;
    e.preventDefault();
    setEmailError(false);
    if (email === "") {
      errorFlag = true;
      setEmailError(true);
    }
    if (errorFlag) {
      console.log("Error");
    } else {
      let data = {
        email: email,
      };
      userService
        .forgetPassword(data)
        .then((result) => {
          console.log("Email sent successfully");
          alert("Email has been sent to reset the password");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <form id="forgotpassword-form" autoComplete="off" onSubmit={handleSubmit}>
      <Paper elevation={5} sx={{ p: 4, height: "70vh" }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5">
              <span className="multicolortext">Fundoo Note</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              Reset your Fundoo Note password
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="p">Enter your Fundoo Note email</Typography>
          </Grid>
          <Grid item xs={12}>
            <InputField
              id="email"
              label="Email eg:name@gmail.com"
              variant="outlined"
              type="email"
              error={emailError}
              helperText={emailError ? "Email cannot be empty" : ""}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} align="left">
            <Button id="link-btn" component={Link} to="/login">
              Back
            </Button>
          </Grid>
          <Grid item xs={6} align="right">
            <Button variant="contained" type="submit" id="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default ForgetPassword;
