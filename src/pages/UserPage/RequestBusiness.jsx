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
  
  const RequestBusiness = () => {
    const [formData, setFormData] = useState({
      fname: "",
      bname: "",
      address: "",
      baddress: "",
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
  

  
    const navigate = useNavigate();
  
    const handleAdd = async () => {
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
        const dataRef = collection(db, "data_issurance");
        const data = {
          fname: formData.fname,
          address: formData.address,
          baddress: formData.baddress,
          bname: formData.bname,
          type: "Business Clearance",
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
          <title> Business Clearance </title>
        </Helmet>
  
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              Business Clearance
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
        </Container>
      </>
    );
  };
  
  export default RequestBusiness;
  