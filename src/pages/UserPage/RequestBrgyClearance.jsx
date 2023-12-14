import {
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const RequestBrgyClearance = () => {
  const [type, setType] = useState("");
  const [cstatus, setCstatus] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    address: "",
    contact: "",
    email: "",
  });

  const {currentUser} = useContext(AuthContext)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCstatusChange = (event) => {
    setCstatus(event.target.value);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const navigate = useNavigate();

  const handleAdd = async () => {
    try {
      if (
        !formData.fname ||
        !formData.address ||
        !formData.contact ||
        !formData.email ||
        !type ||
        !cstatus
      ) {
        toast.error("Please fill out all fields.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
        return; // Exit the function if validation fails
      }
      const dataRef = collection(db, "data_issurance");
      const data = {
        fname: formData.fname,
        address: formData.address,
        contact: formData.contact,
        email: formData.email,
        reason: type,
        type: "Barangay Clearance",
        cstatus: cstatus,
        uid: currentUser.uid,
        timeStamp: serverTimestamp(),
      };
      await addDoc(dataRef, data);
      toast.success("Successfully added", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate("/user/view");
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      console.error(err);
    }
  };
  return (
    <>
      <Helmet>
        <title> Barangay Clearance</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Barangay Clearance
          </Typography>
          <Button
            onClick={handleAdd}
            variant="contained"
            startIcon={<Iconify icon="iconamoon:send" />}
          >
            Submit
          </Button>
        </Stack>

        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={6}>
            <TextField
              margin="dense"
              required
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleInputChange}
              label="Full Name:"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="contact"
              name="contact"
              type="number"
              value={formData.contact}
              onChange={handleInputChange}
              label="Contact:"
              variant="outlined"
              fullWidth
            />
            <FormControl sx={{ mt: 1, width: "100%" }}>
              <InputLabel id="demo-simple-select-label">
                Reason for requesting
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={"Local Employment"}>Local Employment</MenuItem>
                <MenuItem value={"Overseas Employment"}>
                  Overseas Employment
                </MenuItem>
                <MenuItem value={"Loan"}>Loan</MenuItem>
                <MenuItem value={"Scholarship"}>Scholarship</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Right Column */}
          <Grid item xs={6}>
            <TextField
              margin="dense"
              required
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              label="Address:"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              label="E-mail:"
              variant="outlined"
              fullWidth
            />
            <FormControl sx={{ mt: 1, width: "100%" }}>
              <InputLabel id="demo-simple-select-label">
                Civil Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cstatus}
                label="Age"
                onChange={handleCstatusChange}
              >
                <MenuItem value={"Single"}>Single</MenuItem>
                <MenuItem value={"Married"}>Married</MenuItem>
                <MenuItem value={"Widowed"}>Widowed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default RequestBrgyClearance;
