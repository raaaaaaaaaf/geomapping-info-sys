import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import Loader from "../../components/loader/Loader";
import ReactToPrint from "react-to-print";
import Iconify from "../../components/iconify";
import "../../assets/print.css";

const ViewResidency = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const dataRef = doc(db, "data_issurance", id);
      const fetchData = async () => {
        try {
          const docSnap = await getDoc(dataRef);
          if (docSnap.exists()) {
            setData({ ...docSnap.data(), id: docSnap.id });
            setLoading(false);
          } else {
            setData({});
            setLoading(false);
          }
        } catch (err) {
          console.error(err);
          setData({});
          setLoading(false);
        }
      };
      fetchData();
    } else {
      // Optionally, you can handle the case when formID is falsy, such as setting residenceData to an empty object or handling it in another way.
      setData({});
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title> Residency Certificate </title>
      </Helmet>

      <Container maxWidth="xl" className="print-container">
        <Button
          onClick={handlePrint}
          variant="outlined"
          className="exclude-print"
        >
          <Iconify icon={"flat-color-icons:print"} />
        </Button>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ width: "150px", height: "150px" }}
          />
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="subtitle2" gutterBottom>
              Republic of the Philippines
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Dinagat Island
            </Typography>
            <Typography variant="h3" gutterBottom>
              BARANGAY SAN ROQUE
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Office of the Barangay Council
            </Typography>
          </Grid>

          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ width: "150px", height: "150px" }}
          />
        </Stack>

        {loading ? (
          <Loader />
        ) : (
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h2" style={{ marginTop: "40px" }}>
              CERTIFICATE OF RESIDENCY
            </Typography>
            <Typography variant="h5" style={{ margin: "40px" }}>
              TO WHOM IT MAY CONCERN:{" "}
            </Typography>
            <Typography variant="body1" gutterBottom style={{ margin: "10px" }}>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;THIS IS TO CERTIFY that
              as per records available in this office, Mr/Ms.{" "}
              <span style={{ textDecoration: "underline" }}>
                ___{data.fname}___{data.sex}
              </span>
              ,{" "}
              <span style={{ textDecoration: "underline" }}>
                __________{data.cstatus}__________
              </span>
              , of legal age, Filipino citizen is a bonafide resident of
              Barangay San Roque, Dinagat Island
            </Typography>

            <Grid>
              <Typography
                variant="body1"
                gutterBottom
                style={{ marginTop: "40px" }}
              >
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; CERTIFYING FURTHER,
                that above-named person, is a person of good moral character and
                has no derogatory and or criminal records in the barangay.
              </Typography>
            </Grid>
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ margin: "30px" }}
            >
              Issued this &nbsp; &nbsp;
              {new Date(data.timeStamp.seconds * 1000).toLocaleDateString(
                "en-US",
                { day: "numeric" }
              )}
              &nbsp; &nbsp; day&nbsp; &nbsp; of &nbsp; &nbsp;{" "}
              {new Date(data.timeStamp.seconds * 1000).toLocaleDateString(
                "en-US",
                { month: "long", year: "numeric" }
              )}{" "}
              &nbsp; &nbsp;at&nbsp; &nbsp; Barangay&nbsp; &nbsp; San &nbsp;
              &nbsp;Roque,&nbsp; &nbsp; Dinagat&nbsp; &nbsp; Island
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginTop: "20px" }}
            >
              Hon. Eusebio G. Padullon Jr.
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Barangay Chairman
            </Typography>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ViewResidency;
