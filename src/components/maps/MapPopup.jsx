import React, { useState } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl";
import Iconify from "../iconify";

const MapPopup = ({coords, setCoords}) => {
  const [viewPort, setViewPort] = useState({
    longitude: 125.55722,
    latitude: 10.32703,
    zoom: 15,
  });
  const [marker, setMarker] = useState(null); // Initially no marker

  const handleMapClick = (event) => {
    const { lngLat } = event;
    try {
      const roundedLatitude = parseFloat(lngLat.lat.toFixed(6));
      const roundedLongitude = parseFloat(lngLat.lng.toFixed(6));
  
      console.log("Rounded Latitude:", roundedLatitude);
      console.log("Rounded Longitude:", roundedLongitude);
  
      setCoords({
        latitude: roundedLatitude,
        longitude: roundedLongitude,
      });
    } catch (err) {
      console.error("Invalid coordinates:", lngLat);
    }
  };
  

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems: 'center', zIndex: 999, width: "50vw", height: "50vh" }}>
      <Map
        mapboxAccessToken="pk.eyJ1IjoicnJpZGFkIiwiYSI6ImNsbjlxZGVlcDA3NTIyaWw1a2NyY280ZnYifQ.2nrX7vTLXitG1xpFHb6UMA"
        initialViewState={{
          longitude: 125.55722,
          latitude: 10.32703,
          zoom: 15,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/rridad/cln9qvssz00ct01p92c6o1auu"
        onViewportChange={(viewPort) => setViewPort(viewPort)}
        onClick={handleMapClick}
      >
        {coords && (
          <Marker
            latitude={coords.latitude}
            longitude={coords.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <img src="/assets/pin.png" alt="pin" style={{ width: '32px', height: '32' }} />
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default MapPopup;
