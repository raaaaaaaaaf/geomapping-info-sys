import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import Iconify from "../components/iconify";
import "mapbox-gl/dist/mapbox-gl.css";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Button, Popover, Typography } from "@mui/material";

export default function MapPage() {
  const [markers, setMarkers] = useState([]);
  const [anchorEls, setAnchorEls] = useState([]); // Separate state for anchor elements
  const [selectedMarkerData, setSelectedMarkerData] = useState(null);

  const handleClick = (event, markerData) => {
    setSelectedMarkerData(markerData);
    // Set the anchor element for the clicked marker
    const markerIndex = markers.findIndex(
      (marker) => marker.id === markerData.id
    );
    const newAnchorEls = [...anchorEls];
    newAnchorEls[markerIndex] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleClose = () => {
    setSelectedMarkerData(null);
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        const dataRef = query(collection(db, "data_residences"));
        const dataSnap = await getDocs(dataRef);
        dataSnap.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setMarkers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  console.log(markers);

  return (
    <div style={{ width: "80vw", height: "80vh" }}>
      <Map
        mapboxAccessToken="pk.eyJ1IjoicnJpZGFkIiwiYSI6ImNsbjlxZGVlcDA3NTIyaWw1a2NyY280ZnYifQ.2nrX7vTLXitG1xpFHb6UMA"
        initialViewState={{
          longitude: 125.55722,
          latitude: 10.32703,
          zoom: 15,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/rridad/cln9qvssz00ct01p92c6o1auu"
      >
        {markers.map((marker) => (
          <div key={marker.id}>
            <Marker
              longitude={marker.longitude}
              latitude={marker.latitude}
              anchor="bottom"
            >
              <Button onClick={(event) => handleClick(event, marker)}>
                <Iconify icon={"jam:map-marker"} style={{ color: "red" }} />
              </Button>
              <Popover
                open={selectedMarkerData && selectedMarkerData.id === marker.id}
                anchorEl={anchorEls[markers.indexOf(marker)]}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              > <Typography sx={{ p: 1 }}>{marker.latitude}, {marker.longitude}</Typography>
                <Typography sx={{ p: 1 }}>Name: {marker.fname}</Typography>
                <Typography sx={{ p: 1 }}>Birth Date: {marker.dob}</Typography>
                <Typography sx={{ p: 1 }}>
                  Place of Birth: {marker.pob}
                </Typography>
                <Typography sx={{ p: 1 }}>
                  Civil Status: {marker.cstatus}
                </Typography>
                <Typography sx={{ p: 1 }}>
                  Religion: {marker.religion}
                </Typography>
              </Popover>
            </Marker>
          </div>
        ))}
      </Map>
    </div>
  );
}