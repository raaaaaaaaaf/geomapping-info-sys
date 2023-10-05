import {
  Box,
  Button,
  Container,
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
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import Iconify from "../components/iconify";
import "../assets/print.css";

const RecordViewPage = () => {
  const [residenceData, setResidenceData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const dataRef = doc(db, "data_residences", id);
      const fetchData = async () => {
        try {
          const docSnap = await getDoc(dataRef);
          if (docSnap.exists()) {
            setResidenceData({ ...docSnap.data(), id: docSnap.id });
          } else {
            setResidenceData({});
          }
        } catch (err) {
          console.error(err);
          setResidenceData({});
        }
      };
      fetchData();
    } else {
      // Optionally, you can handle the case when formID is falsy, such as setting residenceData to an empty object or handling it in another way.
      setResidenceData({});
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  console.log(residenceData);

  return (
    <>
      <Container maxWidth="xl" className="print-container">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" style={{ marginBottom: "10px" }}>
              Residence Information
            </Typography>
            <Button
              onClick={handlePrint}
              variant="outlined"
              className="exclude-print"
            >
              <Iconify icon={"flat-color-icons:print"} />
            </Button>
          </div>

          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={6}>
              <Typography variant="body2">Name: </Typography>
              <Typography variant="body2">Age: </Typography>
              <Typography variant="body2">Gender: </Typography>
              <Typography variant="body2">Civil Status: </Typography>
              <Typography variant="body2">Date of Birth: </Typography>
              <Typography variant="body2">Place of Birth: </Typography>
              <Typography variant="body2">Contact No.: </Typography>
              <Typography variant="body2">Religion: </Typography>
            </Grid>

            {/* Right Column */}
            <Grid item xs={6}>
              <Typography variant="body2">{residenceData.fname}</Typography>
              <Typography variant="body2">{residenceData.age}</Typography>
              <Typography variant="body2">{residenceData.gender}</Typography>
              <Typography variant="body2">{residenceData.cstatus}</Typography>
              <Typography variant="body2">{residenceData.dob}</Typography>
              <Typography variant="body2">{residenceData.pob}</Typography>
              <Typography variant="body2">{residenceData.contact}</Typography>
              <Typography variant="body2">{residenceData.religion}</Typography>
            </Grid>
          </Grid>

          {/* Educational Attainment table */}
          <Typography
            variant="h6"
            style={{ marginBottom: "10px", marginTop: "15px" }}
          >
            Educational Attainment
          </Typography>
          <Grid container spacing={2}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Level of Education</TableCell>
                    <TableCell>School</TableCell>
                    <TableCell>Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Elementary</TableCell>
                    <TableCell>
                      {residenceData.edu_atainment?.Elementary?.School}
                    </TableCell>
                    <TableCell>
                      {residenceData.edu_atainment?.Elementary?.Address}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>High School/Senior High</TableCell>
                    <TableCell>
                      {residenceData.edu_atainment?.Highschool?.School}
                    </TableCell>
                    <TableCell>
                      {residenceData.edu_atainment?.Highschool?.Address}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>College</TableCell>
                    <TableCell>
                      {residenceData.edu_atainment?.College?.School}
                    </TableCell>
                    <TableCell>
                      {residenceData.edu_atainment?.College?.Address}
                    </TableCell>
                  </TableRow>
                  {/* Add more rows as needed */}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Employment Record table */}
          <Typography
            variant="h6"
            style={{ marginBottom: "10px", marginTop: "15px" }}
          >
            Employment Record
          </Typography>
          <Grid container spacing={2}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Duration</TableCell>
                    <TableCell>Name of Company/Employer</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Salary</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {residenceData.employment_record?.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.duration}</TableCell>
                      <TableCell>{record.employer}</TableCell>
                      <TableCell>{record.address}</TableCell>
                      <TableCell>{record.salary}</TableCell>
                    </TableRow>
                  ))}

                  {/* Add more rows as needed */}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Other Home Occupants table */}
          <Typography
            variant="h6"
            style={{ marginBottom: "10px", marginTop: "15px" }}
          >
            Other Home Occupants
          </Typography>
          <Grid container spacing={2}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Position in the Family</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Birth Date</TableCell>
                    <TableCell>Civil Status</TableCell>
                    <TableCell>Occupation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {residenceData.homeOccupants?.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>{record.position}</TableCell>
                      <TableCell>{record.age}</TableCell>
                      <TableCell>{record.dob}</TableCell>
                      <TableCell>{record.cstatus}</TableCell>
                      <TableCell>{record.occupation}</TableCell>
                    </TableRow>
                  ))}

                  {/* Add more rows as needed */}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default RecordViewPage;
