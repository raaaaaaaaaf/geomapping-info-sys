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
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/firebaseConfig";

const EditBusiness = ({ open, onClose, id, data }) => {
  const [formData, setFormData] = useState({
    fname: "",
    bname: "",
    address: "",
    baddress: "",
    contact: "",
    email: "",
  });
  useEffect(() => {
    setFormData({
      fname: data.fname || "",
      bname: data.bname || "",
      address: data.address || "",
      baddress: data.baddress || "",
    });

  }, [data]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleEdit = async (id) => {
    try {
      if (
        !formData.fname ||
        !formData.address ||
        !formData.bname ||
        !formData.baddress
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
        baddress: formData.baddress,
        bname: formData.bname,
        type: "Business Clearance",
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
      <DialogTitle> Edit Business Clearance</DialogTitle>
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
              label="Business Owner Name:"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="bname"
              name="bname"
              value={formData.bname}
              onChange={handleInputChange}
              label="Business Name:"
              variant="outlined"
              fullWidth
            />
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
              label="Business Owner Address:"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="baddress"
              name="baddress"
              value={formData.baddress}
              onChange={handleInputChange}
              label="Business Address:"
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
          onClick={() => handleEdit(id)}
          color="primary"
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBusiness;
