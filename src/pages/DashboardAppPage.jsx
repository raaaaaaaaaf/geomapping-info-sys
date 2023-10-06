import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
import Iconify from "../components/iconify";
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from "../sections/@dashboard/app";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import _ from "lodash";
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [brgyOfficial, setBrgyOfficial] = useState(0);

  const [residence, setResidence] = useState(0);

  const [resData, setResData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];

        const brgyRef = query(collection(db, "data_brgyofficials"));
        const resRef = query(collection(db, "data_residences"));

        const brgySnap = await getDocs(brgyRef);
        const resSnap = await getDocs(resRef);
        resSnap.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setResData(data);
        setBrgyOfficial(brgySnap.docs.length);
        setResidence(resSnap.docs.length);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const sortedDocData = _.sortBy(
    resData,
    (data) => data.timeStamp.seconds
  ).reverse();

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          BRGY SAN ROQUE GEOMAPPING AND INFORMATION SYSTEM
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary
              title="Barangay Official's"
              total={brgyOfficial}
              color="info"
              icon={"akar-icons:person"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary
              title="Residence Record's"
              total={residence}
              color="info"
              icon={"tabler:file-type-doc"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AppOrderTimeline
              title="Record Timeline"
              list={sortedDocData.slice(0, 5).map((data, index) => ({
                id: `${data.id}`,
                title: `${data.fname} - (${data.gender})`,
                type: `order${index + 1}`,
                time: `${new Date(data.timeStamp.seconds * 1000).toLocaleString(
                  "en-US"
                )}`,
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
