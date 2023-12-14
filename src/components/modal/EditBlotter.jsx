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
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const EditBlotter = ({ open, onClose, id, data }) => {
  const nav = useNavigate();
  const [person, setPerson] = useState("");
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [incident, setIncident] = useState(null);
  const [report, setReport] = useState(null);
  const [selectedPersonId, setSelectedPersonId] = useState('');
  const [formData, setFormData] = useState({
    type: "",
    address: "",
    place: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        const dataRef = query(collection(db, "users"));
        const dataSnap = await getDocs(dataRef);
        dataSnap.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPersons(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFormData({
        type: data.type || "",
        address:  data.address || "",
        place:  data.place || "",
    })
    setPerson(data.person || "")

  }, [data])
  // Define the handleInputChange function to update formData
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange = (event) => {
    const selectedPerson = event.target.value;
    setPerson(selectedPerson);

    // Find the corresponding person object
    const selectedPersonObject = persons.find(
      (role) => role.displayName === selectedPerson
    );

    // Extract and set the document ID in the state
    if (selectedPersonObject) {
      setSelectedPersonId(selectedPersonObject.uid);
    }
  };

  const handleIncidentChange = (date) => {
    setIncident(date);
  };

  const handleReportChange = (date) => {
    setReport(date);
  };

  const handleEdit = async (id) => {
    try {
      if (
        !formData.type ||
        !formData.address ||
        !formData.place ||
        !person ||
        !incident ||
        !report 

      ) {
        toast.error("Please fill out all fields.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
        return; // Exit the function if validation fails
      }
      const dataRef = doc(db, "data_blotter", id);
      const data = {
        person: person,
        type: formData.type,
        address: formData.address,
        place: formData.place,
        uid: selectedPersonId,
        incident: incident.toDate(),
        report: report.toDate(),
        timeStamp: serverTimestamp(),
      };
      await updateDoc(dataRef, data);
      toast.success("Successfully edited", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      onClose();
      nav("/dashboard/blotter");
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
            <FormControl sx={{ mt: 1, mb: 0.5, width: "100%" }}>
              <InputLabel id="demo-simple-select-label">
                Reporting Person
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={person}
                label="Age"
                onChange={handleChange}
              >
                {persons.map((role) => (
                  <MenuItem key={role.id} value={role.displayName}>
                    {role.displayName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              margin="dense"
              required
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              label="Type of Incident:"
              variant="outlined"
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date/Time of Incident"
                value={incident}
                onChange={handleIncidentChange}
                sx={{ mt: 1, width: "100%" }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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
              label="Address of Reporting Person:"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="place"
              name="place"
              value={formData.place}
              onChange={handleInputChange}
              label="Place of Incident"
              variant="outlined"
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date/Time of Report"
                value={report}
                onChange={handleReportChange}
                sx={{ mt: 1, width: "100%" }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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

export default EditBlotter;
