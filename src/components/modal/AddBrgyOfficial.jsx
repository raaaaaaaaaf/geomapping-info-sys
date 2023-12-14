import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AddBrgyOfficial = ({ open, onClose }) => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    position: "",
    contact: "",
    email: "",
    bod: "",
    cstatus: "",
  });

  const [dob, setDob] = useState(null);

  const [position, setPosition] = useState(null)

  const [cstatus, setCstatus] = useState(null)

  const handlePosChange = (event) => {
    setPosition(event.target.value);
  };

  const handleCstatusChange = (event) => {
    setCstatus(event.target.value);
  };

  const handleDobChange = (date) => {
    setDob(date);
  };
  // Define the handleInputChange function to update formData
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    try {
      if (
        !formData.fname ||
        !formData.contact ||
        !formData.email ||
        !dob ||
        !position ||
        !cstatus
      ) {
        toast.error("Please fill out all fields.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
        return; // Exit the function if validation fails
      }
      const dataRef = collection(db, "data_brgyofficials");
      const data = {
        fname: formData.fname,
        position: position,
        contact: formData.contact,
        email: formData.email,
        bod: dob.toDate(),
        cstatus: cstatus,
        timeStamp: serverTimestamp(),
      };
      await addDoc(dataRef, data);
      toast.success("Successfully added", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      onClose();
      nav("/dashboard/brgyinfo");
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Barangay Officials</DialogTitle>
      <DialogContent>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={dob}
                onChange={handleDobChange}
                sx={{ mt: 1, mb: 0.5, width: "100%" }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          {/* Right Column */}
          <Grid item xs={6}>
            <FormControl sx={{ mt: 1, mb: 0.5, width: "100%" }}>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={position}
                label="Position"
                onChange={handlePosChange}
              >
                <MenuItem value={"Kagawad"}>Kagawad</MenuItem>
                <MenuItem value={"Chairmain"}>Chairman</MenuItem>
                <MenuItem value={"SK Kagawad"}>SK Kagawad</MenuItem>
                <MenuItem value={"SK Chairmain"}>SK Chairman</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              required
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              label="E-mail:"
              variant="outlined"
              fullWidth
            />
           <FormControl sx={{ mt: 1, mb: 0.5, width: "100%" }}>
              <InputLabel id="demo-simple-select-label">Civil Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cstatus}
                label="Gender"
                onChange={handleCstatusChange}
              >
                <MenuItem value={"Male"}>Single</MenuItem>
                <MenuItem value={"Female"}>Married</MenuItem>
                <MenuItem value={"Male"}>Widowed</MenuItem>

              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleAdd} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBrgyOfficial;
