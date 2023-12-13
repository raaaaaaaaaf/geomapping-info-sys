import React, { useEffect, useState } from "react";
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
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/firebaseConfig";

const EditResidency = ({ open, onClose, id, data }) => {
  const [type, setType] = useState("");
  const [cstatus, setCstatus] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    address: "",
    contact: "",
    email: "",
  });
  useEffect(() => {
    setFormData({
      fname: data.fname || "",
      address: data.address || "",
      contact: data.contact || "",
      email: data.email || "",
    })
    setType(data.reason || "")
    setCstatus(data.cstatus || "")
  }, [data])
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

  const handleEdit = async (id) => {
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
      const dataRef = doc(db, "data_issurance", id);
      const data = {
        fname: formData.fname,
        address: formData.address,
        contact: formData.contact,
        email: formData.email,
        reason: type,
        type: "Residency Certification",
        cstatus: cstatus,
        timeStamp: serverTimestamp(),
      };
      await updateDoc(dataRef, data);
      toast.success("Successfully edited", {
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> Edit Residency Certification</DialogTitle>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={() => handleEdit(id)} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditResidency;
