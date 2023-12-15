import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import Iconify from "../components/iconify";
import "mapbox-gl/dist/mapbox-gl.css";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Button, Popover, Typography } from "@mui/material";
import Loader from "../components/loader/Loader";

const MarkerList = [
  {
    latitude: 10.328231,
    longitude: 125.555697,
    color: "orange",
    content: [
      "Community Engagement: Barangay Gymnasium",
      "Barangay Seminars/Meetings, barangay program/activities",
      "and bayanihan sa pag unlad ng barangay",
    ],
  },
  {
    latitude: 10.328028,
    longitude: 125.555415,
    color: "yellow",
    content: [
      "Healthcare Management: Barangay Health Center",
      "The Center offers the following services:",
      " • Immunization",
      " • Prenatal Checkup",
      " • First-aid Medication",
      " • Monthly Checkup with a nurse",
    ],
  },
  {
    latitude: 10.328713,
    longitude: 125.555458,
    color: "green",
    content: [
      "Disaster Preparedness: Oges, San Roque",
      "(This area is a prone to landslide, please",
      "avoid getting here in times of calamities)",
    ],
  },
  {
    latitude: 10.328699,
    longitude: 125.555741,
    color: "blue",
    content: [
      "Resource Allocation: Barangay Hall",
      "(Need an improvement facilities ",
      "and department offices)",
    ],
  },
];

export default function MapPage() {
  const [markers, setMarkers] = useState([]);
  const [anchorEls, setAnchorEls] = useState([]); // Separate state for anchor elements
  const [selectedMarkerData, setSelectedMarkerData] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleMarkerClick = (index) => {
    if (index === activeMarker) {
      setActiveMarker(null);
    } else {
      setActiveMarker(index);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [viewPort, setViewPort] = useState({
    initialViewState: {
      longitude: 125.55722,
      latitude: 10.32703,
      zoom: 15,
    },
  });

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

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {loading ? (
        <Loader />
      ) : (
        <Map
          mapboxAccessToken="pk.eyJ1IjoicnJpZGFkIiwiYSI6ImNsbjlxZGVlcDA3NTIyaWw1a2NyY280ZnYifQ.2nrX7vTLXitG1xpFHb6UMA"
          mapStyle="mapbox://styles/rridad/cln9qvssz00ct01p92c6o1auu"
          {...viewPort}
          width="90%"
          height="100%"
        >
          {MarkerList.map((marker, index) => (
            <Marker
              key={index}
              latitude={marker.latitude}
              longitude={marker.longitude}
              anchor="bottom"
            >
              <Button
                aria-describedby={index}
                onClick={() => handleMarkerClick(index)}
              >
                <Iconify icon="material-symbols:circle" color={marker.color} />
              </Button>
            </Marker>
          ))}
          {activeMarker !== null && (
            <Popover
              id={activeMarker}
              open={activeMarker !== null}
              anchorEl={{
                latitude: MarkerList[activeMarker].latitude,
                longitude: MarkerList[activeMarker].longitude,
              }}
              onClose={() => setActiveMarker(null)}
              anchorOrigin={{
                vertical: "bottom", // Adjust the vertical position
                horizontal: "center", // Center horizontally
              }}
              transformOrigin={{
                vertical: "bottom", // Adjust the vertical position
                horizontal: "center", // Center horizontally
              }}
            >
              {MarkerList[activeMarker].content.map((text, index) => (
                <Typography key={index} sx={{ p: 1, textAlign: "center" }}>
                  {text}
                </Typography>
              ))}
            </Popover>
          )}

          {markers.map((marker) => (
            <div key={marker.id}>
              <Marker
                longitude={marker.longitude}
                latitude={marker.latitude}
                anchor="bottom"
              >
                <Button onClick={(event) => handleClick(event, marker)}>
                  <img
                    src="/assets/icons/marker.png"
                    alt="marker"
                    style={{ width: "25px", height: "25px" }}
                  />
                </Button>
                <Popover
                  open={
                    selectedMarkerData && selectedMarkerData.id === marker.id
                  }
                  anchorEl={anchorEls[markers.indexOf(marker)]}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 1 }}>
                    Household Head: {marker.fname} {marker.age}
                  </Typography>
                  <Typography sx={{ p: 1, textAlign: "center" }}>
                    Members
                  </Typography>
                  {marker.homeOccupants.map((member, index) => (
                    <Typography sx={{ p: 1, textAlign: "center" }} key={index}>
                      {member.name} {member.age}
                    </Typography>
                  ))}
                </Popover>
              </Marker>
            </div>
          ))}
        </Map>
      )}
    </div>
  );
}
