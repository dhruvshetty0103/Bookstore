import React, { useState } from 'react'
import '../styles/registration.scss'
import userService from '../service/userService'
import RainbowText from 'react-rainbow-text'
import {
  validPassword,
  validEmail,
  validFirstName,
  validLastName,
} from '../config/FormValidation'
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
  Typography
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link } from 'react-router-dom'
const theme = createTheme()

export default function SignUp() {
  const initialUserState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [user, setUser] = useState(initialUserState)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setPasswordConfirmError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = (e) => {
    let errorFlag = false
    e.preventDefault()
    setFirstNameError(false)
    setLastNameError(false)
    setEmailError(false)
    setPasswordError(false)
    setPasswordConfirmError(false)
    if (!validFirstName.test(user.firstName)) {
      errorFlag = true
      setFirstNameError(true)
    }
    if (!validLastName.test(user.lastName)) {
      errorFlag = true
      setLastNameError(true)
    }
    if (!validEmail.test(user.email)) {
      errorFlag = true
      setEmailError(true)
    }
    if (!validPassword.test(user.password)) {
      errorFlag = true
      setPasswordError(true)
    }
    if (user.password !== user.confirmPassword) {
      errorFlag = true
      setPasswordConfirmError(true)
    }

    if (errorFlag) {
      console.log('Enter the correct details')
    } else {
      let data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      }
      userService
        .register(data)
        .then((response) => {
          console.log('Registered successfully')
          console.log(response.data)
        })
        .catch((e) => {
          console.log('Registeration failed')
          console.log(e)
        })
    }
  }

  return (
    <form id="registeration-form" onSubmit={handleSubmit} autoComplete="off">
      <Paper elevation={5} sx={{ p: 2 }}>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2}>
            <Grid item container xs={8} spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h3" align="left">
                  <RainbowText lightness={0.5} saturation={1}>
                    Book Store
                  </RainbowText>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="h3" align="left">
                  Sign Up
                </Typography>
              </Grid>
              <Grid item xs={6} >
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={firstNameError}
                  helperText={firstNameError ? 'Invalid first name' : ''}
                  value={user.firstName}
                  onChange={handleInputChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="lastName"
                  id="lastName"
                  label="Last Name"
                  error={lastNameError}
                  helperText={lastNameError ? 'Invalid last name' : ''}
                  value={user.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  error={emailError}
                  helperText={
                    emailError
                      ? 'Invalid email'
                      : 'You can use letters,numbers & periods'
                  }
                  value={user.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  value={user.password}
                  onChange={handleInputChange}
                  error={passwordError}
                  helperText={
                    passwordError
                      ? 'Invalid password'
                      : 'Use 8 or more characters with a mix of letters, numbers & symbols'
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  value={user.confirmPassword}
                  onChange={handleInputChange}
                  error={confirmPasswordError}
                  helperText={
                    confirmPasswordError ? 'Password doesnt match' : ''
                  }
                />
              </Grid>
              <Grid item xs={12} align="left">
                <FormControlLabel
                  control={<Checkbox />}
                  label="Show password"
                  onClick={handleShowPassword}
                />
              </Grid>
              <Grid item xs={6} align="left">
                <Button id="sign-in-button" component={Link} to="/login">
                  Sign in instead
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
            <Grid item container xs={4}>
              <Grid item xs={12}>
               
              </Grid>
              <Grid item xs={12}>
                <Typography component="h3" align="center">
                  One account. All of Book Store working for you.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Paper>
    </form>
  )
}
