import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import Iconify from "../iconify";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";

const ViewModal = ({ open, onClose, data }) => {
  const { fname, position, cstatus, email, contact, bod } = data;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Barangay Official Information</DialogTitle>
      {loading ? (
        <Loader />
      ) : (
        <DialogContent>
          {/* Residence Information */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Grid container spacing={2}>
              {/* Left Column */}
              <Grid item xs={6}>
                <Typography variant="body2">Name: </Typography>
                <Typography variant="body2">Position: </Typography>
                <Typography variant="body2">Contact No.: </Typography>
                <Typography variant="body2">Civil Status: </Typography>
                <Typography variant="body2">Date of Birth: </Typography>
                <Typography variant="body2">Email: </Typography>
              </Grid>

              {/* Right Column */}
              <Grid item xs={6}>
                <Typography variant="body2">{fname}</Typography>
                <Typography variant="body2">{position}</Typography>
                <Typography variant="body2">{contact}</Typography>
                <Typography variant="body2">{cstatus}</Typography>
                <Typography variant="body2">
                  {new Date(bod.seconds * 1000).toLocaleDateString("en-US")}
                </Typography>
                <Typography variant="body2">{email}</Typography>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ViewModal;
