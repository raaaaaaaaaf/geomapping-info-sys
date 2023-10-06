import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditBrgyOfficial = ({ open, onClose, formID }) => {

  const nav = useNavigate() 

  const [formData, setFormData] = useState({
    fname: "",
    position: "",
    contact: "",
    email: "",
    bod: "",
    cstatus: "",
  });
  // Define the handleInputChange function to update formData
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async (formID) => {
    try {
      const dataRef = doc(db, "data_brgyofficials", formID);
      const data = {
        fname: formData.fname,
        position: formData.position,
        contact: formData.contact,
        email: formData.email,
        bod: formData.bod,
        cstatus: formData.cstatus,
      };
      await updateDoc(dataRef, data);
      Swal.fire("Edited!", "Information has been edited.", "success");
      onClose();
      nav('/dashboard/brgyinfo')
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Barangay Officials</DialogTitle>
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
              value={formData.contact}
              onChange={handleInputChange}
              label="Contact:"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="bod"
              name="bod"
              value={formData.bod}
              onChange={handleInputChange}
              label="Birth Date:"
              variant="outlined"
              fullWidth
            />
          </Grid>
          {/* Right Column */}
          <Grid item xs={6}>
            <TextField
              margin="dense"
              required
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              label="Position:"
              variant="outlined"
              fullWidth
            />
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
            <TextField
              margin="dense"
              required
              id="cstatus"
              name="cstatus"
              value={formData.cstatus}
              onChange={handleInputChange}
              label="Civil Status:"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button
          onClick={() => handleEdit(formID)}
          color="primary"
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBrgyOfficial;
