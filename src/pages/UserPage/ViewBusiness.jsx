import {
  Button,
  Checkbox,
  Container,
  Divider,
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

const ViewBusiness = () => {
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
        <title> Business Clearance </title>
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
            <Typography variant="h3" style={{ marginTop: "20px" }}>
              BARANGAY BUSINESS CLEARANCE
            </Typography>
            <Typography variant="subtitle1" style={{ margin: "20px" }}>
              This is to certify that the Business Name / Trade Name described
              below:
            </Typography>
            <Grid container spacing={0.5}>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ margin: "5px", fontWeight: "bold" }}
                >
                  Business Owner Name: &nbsp; &nbsp; &nbsp; &nbsp; {data.fname}
                </Typography>
                <Divider variant="inset" style={{ marginLeft: "230px" }} />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ margin: "5px" }}
                >
                  Business Owner Address: &nbsp; &nbsp; &nbsp; &nbsp;
                  {data.address}
                </Typography>
                <Divider variant="inset" style={{ marginLeft: "230px" }} />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ margin: "5px" }}
                >
                  Business Address: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp;{data.baddress}
                </Typography>
                <Divider variant="inset" style={{ marginLeft: "230px" }} />
              </Grid>
            </Grid>

            <Typography variant="h3" style={{ marginTop: "20px" }}>
              {data.bname}
            </Typography>
            <Typography variant="subtitle1" style={{ margin: "5px" }}>
              (Businame Name / Trade Name)
            </Typography>

            <Grid container spacing={0.5} style={{ marginTop: "20px" }}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  is applying for a Barangay Clearance to be used in securing a
                  corresponding Business Permit has been found to be:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  ■ In conformity with the provisions of our existing barangay
                  Ordinance, rules and regulations being enforced in this
                  BARANGAY.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  ■ Not among those businesses or trade activities being banned
                  to be established in this BARANGAY.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  ■ That this Barangay interposes no objections for the issuance
                  of the corresponding Business Permit.
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={0.5} style={{ marginTop: "30px" }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Reference ID: {data.id}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Date Issued: &nbsp;
                  {new Date(data.timeStamp.seconds * 1000).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Hon. Eusebio G. Padullon Jr.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Barangay Chairman
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ViewBusiness;
