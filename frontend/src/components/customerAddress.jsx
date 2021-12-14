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

const CustomerAddress = () => {
  const initialUserState = {
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    landmark: "",
    type: "",
  };
  const [details, setDetails] = useState(initialUserState);
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
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = () => {
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
    <Grid
      item
      container
      style={{
        border: "1px solid black",
        width: "60%",
        margin: "0% auto 2% auto",
        padding: "1%",
      }}
    >
      <Grid item xs={12}>
        <Accordion elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Customer Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid item container xs={10} spacing={1.5}>
              <Grid item xs={6}>
                <TextField
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
                <TextField
                  id="phone"
                  placeholder="Phone Number"
                  type="text"
                  name="phone"
                  value={details.phone}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="pincode"
                  name="pincode"
                  placeholder="Pincode"
                  type="text"
                  variant="outlined"
                  value={details.pincode}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="locality"
                  name="locality"
                  placeholder="Locality"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={details.locality}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address"
                  name="address"
                  placeholder="Address"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={details.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="city"
                  name="city"
                  placeholder="City/town"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={details.city}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="landmark"
                  name="landmark"
                  placeholder="Landmark"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={details.landmark}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} align="left">
                <FormControl component="fieldset">
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