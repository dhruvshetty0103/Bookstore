import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import bookService from "../service/bookService";
import { withStyles } from "@mui/styles";

const InputField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#A03037",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#A03037",
      },
    },
  },
})(TextField);

const CustomerAddress = ({
  expanded,
  handleExpanded,
  handleExpandedSummary,
}) => {
  const initialUserState = {
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    landmark: "",
    type: "Home",
  };
  const [details, setDetails] = useState(initialUserState);
  const [isDissabled, setIsDissabled] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };

  useEffect(() => {
    fetchitem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchitem = () => {
    bookService
      .getCustDetails()
      .then((res) => {
        if (res.data !== null) {
          setDetails(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = () => {
    handleExpanded();
    handleExpandedSummary();
    setIsDissabled(true);
    bookService
      .addCustDetails(details)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Grid item container id="cartContainer">
      <Grid item xs={12}>
        <Accordion elevation={0} expanded={expanded} onChange={handleExpanded}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Customer Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid item container xs={10} spacing={1.5}>
              <Grid item xs={12} align="right">
                <Button
                  onClick={() => setIsDissabled(false)}
                  style={{
                    textTransform: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Edit
                </Button>
              </Grid>
              <Grid item xs={6}>
                <InputField
                disabled={isDissabled ? true : false}
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  variant="outlined"
                  value={details.name}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  id="phone"
                  placeholder="Phone Number"
                  type="text"
                  name="phone"
                  value={details.phone}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  disabled={isDissabled ? true : false}
                />
              </Grid>

              <Grid item xs={6}>
                <InputField
                  id="pincode"
                  name="pincode"
                  placeholder="Pincode"
                  type="text"
                  variant="outlined"
                  value={details.pincode}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={isDissabled ? true : false}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  id="locality"
                  name="locality"
                  placeholder="Locality"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={details.locality}
                  onChange={handleInputChange}
                  disabled={isDissabled ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  id="address"
                  name="address"
                  placeholder="Address"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={details.address}
                  onChange={handleInputChange}
                  disabled={isDissabled ? true : false}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  id="city"
                  name="city"
                  placeholder="City/town"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={details.city}
                  onChange={handleInputChange}
                  disabled={isDissabled ? true : false}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  id="landmark"
                  name="landmark"
                  placeholder="Landmark"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={details.landmark}
                  onChange={handleInputChange}
                  disabled={isDissabled ? true : false}
                />
              </Grid>
              <Grid item xs={12} align="left">
                <FormControl
                  component="fieldset"
                  disabled={isDissabled ? true : false}
                >
                  <FormLabel component="legend">Type</FormLabel>
                  <RadioGroup row aria-label="gender" defaultValue="Home">
                    <FormControlLabel
                      name="addressType"
                      value="Home"
                      control={<Radio />}
                      label="Home"
                      onChange={handleInputChange}
                    />
                    <FormControlLabel
                      name="addressType"
                      value="Work"
                      control={<Radio />}
                      label="Work"
                      onChange={handleInputChange}
                    />
                    <FormControlLabel
                      name="addressType"
                      value="Other"
                      control={<Radio />}
                      label="Other"
                      onChange={handleInputChange}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} align="right">
              <Button variant="contained" onClick={handleUpdate}>
                Continue
              </Button>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default CustomerAddress;
