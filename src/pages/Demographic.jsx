import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AppConversionRates } from "../sections/@dashboard/app";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Loader from "../components/loader/Loader";

const Demographic = () => {
  const [underOne, setUnderOne] = useState(0);
  const [one, setOne] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);
  const [fourth, setFourth] = useState(0);
  const [fifth, setFifth] = useState(0);
  const [sixth, setSixth] = useState(0);
  const [seventh, setSeventh] = useState(0);
  const [eigth, setEigth] = useState(0);
  const [ninth, setNinth] = useState(0);
  const [ten, setTen] = useState(0);
  const [eleven, setEleven] = useState(0);
  const [twelve, setTweleve] = useState(0);
  const [thirteenth, setThirteenth] = useState(0);
  const [fourtheenth, setFourtheenth] = useState(0);
  const [fiftheenth, setFiftheenth] = useState(0);
  const [sixtheenth, setSixtheenth] = useState(0);
  const [seventheenth, setSeventheenth] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ageRanges = [
          { minAge: 0, maxAge: 0, stateSetter: setUnderOne },
          { minAge: 1, maxAge: 4, stateSetter: setOne },
          { minAge: 5, maxAge: 9, stateSetter: setSecond },
          { minAge: 10, maxAge: 14, stateSetter: setThird },
          { minAge: 15, maxAge: 19, stateSetter: setFourth },
          { minAge: 20, maxAge: 24, stateSetter: setFifth },
          { minAge: 25, maxAge: 29, stateSetter: setSixth },
          { minAge: 30, maxAge: 34, stateSetter: setSeventh },
          { minAge: 35, maxAge: 39, stateSetter: setEigth },
          { minAge: 40, maxAge: 44, stateSetter: setNinth },
          { minAge: 45, maxAge: 49, stateSetter: setTen },
          { minAge: 50, maxAge: 54, stateSetter: setEleven },
          { minAge: 55, maxAge: 59, stateSetter: setTweleve },
          { minAge: 60, maxAge: 64, stateSetter: setThirteenth },
          { minAge: 65, maxAge: 69, stateSetter: setFourtheenth },
          { minAge: 70, maxAge: 74, stateSetter: setFiftheenth },
          { minAge: 75, maxAge: 79, stateSetter: setSixtheenth },
          { minAge: 80, stateSetter: setSeventheenth },

          // Add more age ranges as needed
        ];

        for (const { minAge, maxAge, stateSetter } of ageRanges) {
          const ageRef = query(
            collection(db, "data_residences"),
            where("age", ">=", minAge),
            where("age", "<=", maxAge)
          );
          const ageSnap = await getDocs(ageRef);
          stateSetter(ageSnap.docs.length);
        }
        setLoading(false);
      } catch (err) {
        // Handle errors here
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title> Demographic Analysis</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Demographic Analysis
          </Typography>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Population by age group"
              chartData={[
                { label: "Under 1", value: `${underOne}` },
                { label: "1 to 4", value: `${one}` },
                { label: "5 to 9", value: `${second}` },
                { label: "10 to 14", value: `${third}` },
                { label: "15 to 19", value: `${fourth}` },
                { label: "20 to 24", value: `${fifth}` },
                { label: "25 to 29", value: `${sixth}` },
                { label: "30 to 34", value: `${seventh}` },
                { label: "35 to 39", value: `${eigth}` },
                { label: "40 to 44", value: `${ninth}` },
                { label: "45 to 49", value: `${ten}` },
                { label: "50 to 54", value: `${eleven}` },
                { label: "55 to 59", value: `${twelve}` },
                { label: "60 to 64", value: `${thirteenth}` },
                { label: "65 to 69", value: `${fourtheenth}` },
                { label: "70 to 74", value: `${fiftheenth}` },
                { label: "75 to 79", value: `${sixtheenth}` },
                { label: "80 and over", value: `${seventheenth}` },
              ]}
            />
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Demographic;
