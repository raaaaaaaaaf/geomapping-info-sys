import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl";

const BarangayLocationPage = () => {
  const [viewPort, setViewPort] = useState({
    initialViewState: {
      longitude: 125.555585,
      latitude: 10.329581,
      zoom: 15,
    },
  });
  return (
    <>
      <Helmet>
        <title> Barangay Location</title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Barangay Location
        </Typography>
        <Typography sx={{ mb: 2 }}>
          San Roque is situated at approximately 10.3268, 125.5561, in the
          island of Dinagat. Elevation at these coordinates is estimated at 3.0
          meters or 9.8 feet above mean sea level.
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>
          In case of Emergency Contact this person:
        </Typography>
        <Typography >
          Gaudioso Besario
        </Typography>
        <Typography sx={{ mb: 5 }}>
          09075559399
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            width: "100%", // Width should remain at 100% to fill the container
            height: "60vh", // Set the desired height here, e.g., "50vh"
          }}
        >
          <Map
            mapboxAccessToken="pk.eyJ1IjoicnJpZGFkIiwiYSI6ImNsbjlxZGVlcDA3NTIyaWw1a2NyY280ZnYifQ.2nrX7vTLXitG1xpFHb6UMA"
            mapStyle="mapbox://styles/rridad/cln9qvssz00ct01p92c6o1auu"
            {...viewPort}
            width="100%"
            height="100%"
          >
            <Marker
              latitude={10.329581}
              longitude={125.555585}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <img
                src="/assets/hallpin.png"
                alt="pin"
                style={{ width: "32px", height: "32" }}
              />
            </Marker>
          </Map>
        </div>
      </Container>
    </>
  );
};

export default BarangayLocationPage;
