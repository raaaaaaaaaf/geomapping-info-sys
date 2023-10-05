import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  TextField,
  DialogActions,
  Divider,
} from "@mui/material";
import MapPopup from "../maps/MapPopup";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import EditMapPupup from "../maps/EditMapPupup";
import Swal from "sweetalert2";

const AddModal = ({ open, onClose, formID }) => {
  const [formData, setFormData] = useState({
    fname: "",
    age: "",
    gender: "",
    dob: "",
    pob: "",
    contact: "",
    cstatus: "",
    religion: "",
  });
  const [eduAttainment, setEduAttainment] = useState({
    Elementary: {
      School: "",
      Address: "",
    },
    Highschool: {
      School: "",
      Address: "",
    },
    College: {
      School: "",
      Address: "",
    },
  });

  const [employmentRecords, setEmploymentRecords] = useState([
    {
      duration: "",
      employer: "",
      address: "",
      salary: "",
    },
  ]);

  const [homeOccupants, setHomeOccupants] = useState([
    {
      name: "",
      position: "",
      age: "",
      dob: "",
      cstatus: "",
      occupation: "",
    },
  ]);

  const addEmploymentRecord = () => {
    setEmploymentRecords([
      ...employmentRecords,
      { duration: "", employer: "", address: "", salary: "" },
    ]);
  };

  const addOccupantRecord = () => {
    setHomeOccupants([
      ...homeOccupants,
      {
        name: "",
        position: "",
        age: "",
        dob: "",
        cstatus: "",
        occupation: "",
      },
    ]);
  };

  const handleEmployInputChange = (event, index, fieldName) => {
    const updatedRecords = [...employmentRecords];
    updatedRecords[index][fieldName] = event.target.value;
    setEmploymentRecords(updatedRecords);
  };

  const handleOccupantsInputChange = (event, index, fieldName) => {
    const updatedRecords = [...homeOccupants];
    updatedRecords[index][fieldName] = event.target.value;
    setHomeOccupants(updatedRecords);
  };

  const [editCoords, setEditCoords] = useState({
    longitude: 0,
    latitude: 0,
  });

  // Define the handleInputChange function to update formData
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEduInputChange = (e, level, field) => {
    const { value } = e.target;
    setEduAttainment((prevEduAttainment) => ({
      ...prevEduAttainment,
      [level]: {
        ...prevEduAttainment[level],
        [field]: value,
      },
    }));
  };

  const handleEdit = async (formID) => {
    try {
      const dataRef = doc(db, "data_residences", formID);
      const data = {
        fname: formData.fname,
        age: formData.age,
        gender: formData.gender,
        dob: formData.dob,
        pob: formData.pob,
        contact: formData.contact,
        cstatus: formData.cstatus,
        religion: formData.religion,
        edu_atainment: eduAttainment,
        employment_record: employmentRecords,
        homeOccupants: homeOccupants,
        longitude: editCoords.longitude,
        latitude: editCoords.latitude,
      };
      await updateDoc(dataRef, data);
      Swal.fire("Edited!", "Information has been edited.", "success");
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle> EDIT BARANGAY REGISTRATION FORM</DialogTitle>
      <DialogContent>
        {/* Residence Information */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography>Residence Information</Typography>
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
                label="Full Name"
                variant="outlined"
                fullWidth
              />
              <TextField
                margin="dense"
                required
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                label="Age"
                type="number"
                variant="outlined"
                fullWidth
              />
              <TextField
                margin="dense"
                required
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                label="Date of Birth"
                variant="outlined"
                fullWidth
              />
              <TextField
                margin="dense"
                required
                id="religion"
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
                label="Religion"
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* Right Column */}
            <Grid item xs={6}>
              <TextField
                margin="dense"
                required
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                label="Gender"
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
                label="Contact NO."
                variant="outlined"
                fullWidth
              />
              <TextField
                margin="dense"
                required
                id="pob"
                name="pob"
                value={formData.pob}
                onChange={handleInputChange}
                label="Place of Birth"
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
                label="Civil Status"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </div>
        {/* Educational Attainment */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography>Educational Attainment</Typography>
          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="elemSchool"
                name="eduAttainment.Elementary.School"
                value={eduAttainment.Elementary.School}
                onChange={(e) =>
                  handleEduInputChange(e, "Elementary", "School")
                }
                label="Elementary School"
                variant="outlined"
                fullWidth
              />
              <TextField
                margin="dense"
                id="highSchool"
                name="eduAttainment.Highschool.School"
                value={eduAttainment.Highschool.School}
                onChange={(e) =>
                  handleEduInputChange(e, "Highschool", "School")
                }
                label="High School/Senior High"
                variant="outlined"
                fullWidth
              />
              <TextField
                margin="dense"
                id="college"
                name="eduAttainment.College.School"
                value={eduAttainment.College.School}
                onChange={(e) => handleEduInputChange(e, "College", "School")}
                label="College"
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* Right Column */}
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="elemAddress"
                name="eduAttainment.Elementary.Address"
                value={eduAttainment.Elementary.Address}
                onChange={(e) =>
                  handleEduInputChange(e, "Elementary", "Address")
                }
                label="Address"
                variant="outlined"
                fullWidth
              />
              <TextField
                margin="dense"
                id="highAddress"
                name="eduAttainment.Highschool.Address"
                value={eduAttainment.Highschool.Address}
                onChange={(e) =>
                  handleEduInputChange(e, "Highschool", "Address")
                }
                label="Address"
                variant="outlined"
                fullWidth
              />
              <TextField
                margin="dense"
                id="collegeAddress"
                name="eduAttainment.College.Address"
                value={eduAttainment.College.Address}
                onChange={(e) => handleEduInputChange(e, "College", "Address")}
                label="Address"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </div>
        {/* Employment Record */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography>Employment Record</Typography>
          {employmentRecords.map((record, index) => (
            <Grid container spacing={2} key={index}>
              {/* First Column */}
              <Grid item xs={2}>
                <TextField
                  margin="dense"
                  name={`duration${index}`}
                  label="Duration"
                  variant="outlined"
                  fullWidth
                  value={record.duration}
                  onChange={(e) =>
                    handleEmployInputChange(e, index, "duration")
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  name={`employer${index}`}
                  label="Name of Employer"
                  variant="outlined"
                  fullWidth
                  value={record.employer}
                  onChange={(e) =>
                    handleEmployInputChange(e, index, "employer")
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  margin="dense"
                  name={`address${index}`}
                  label="Address"
                  variant="outlined"
                  fullWidth
                  value={record.address}
                  onChange={(e) => handleEmployInputChange(e, index, "address")}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  margin="dense"
                  name={`salary${index}`}
                  label="Salary"
                  variant="outlined"
                  fullWidth
                  value={record.salary}
                  onChange={(e) => handleEmployInputChange(e, index, "salary")}
                />
              </Grid>
            </Grid>
          ))}
          <Button variant="text" color="primary" onClick={addEmploymentRecord}>
            Add Employment Record
          </Button>
        </div>
        {/* Other Home Occupants */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography>Other Home Occupants</Typography>
          {homeOccupants.map((record, index) => (
            <Grid container spacing={2} key={index}>
              {/* First Column */}
              <Grid item xs={2}>
                <TextField
                  margin="dense"
                  name={`name${index}`}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={record.name}
                  onChange={(e) => handleOccupantsInputChange(e, index, "name")}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  margin="dense"
                  name={`position${index}`}
                  label="Position in the Family"
                  variant="outlined"
                  fullWidth
                  value={record.position}
                  onChange={(e) =>
                    handleOccupantsInputChange(e, index, "position")
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  margin="dense"
                  name={`age${index}`}
                  label="Age"
                  variant="outlined"
                  fullWidth
                  value={record.age}
                  onChange={(e) => handleOccupantsInputChange(e, index, "age")}
                />
              </Grid>
              <Grid item xs={1.5}>
                <TextField
                  margin="dense"
                  name={`dob${index}`}
                  label="Birth Date"
                  variant="outlined"
                  fullWidth
                  value={record.dob}
                  onChange={(e) => handleOccupantsInputChange(e, index, "dob")}
                />
              </Grid>
              <Grid item xs={1.5}>
                <TextField
                  margin="dense"
                  name={`cstatus${index}`}
                  label="Civil Status"
                  variant="outlined"
                  fullWidth
                  value={record.cstatus}
                  onChange={(e) =>
                    handleOccupantsInputChange(e, index, "cstatus")
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  margin="dense"
                  name={`occupation${index}`}
                  label="Occupation"
                  variant="outlined"
                  fullWidth
                  value={record.occupation}
                  onChange={(e) =>
                    handleOccupantsInputChange(e, index, "occupation")
                  }
                />
              </Grid>
            </Grid>
          ))}
          <Button variant="text" color="primary" onClick={addOccupantRecord}>
            Add Other Home Occupants
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            minHeight: "300px",
          }}
        >
          <EditMapPupup editCoords={editCoords} setEditCoords={setEditCoords} />
        </div>
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

export default AddModal;
