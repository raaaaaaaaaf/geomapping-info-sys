import React from "react";
import { Popover, Typography } from "@mui/material";

const PopupModal = ({ open, onClose }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Typography sx={{ p: 2 }}>Name: {marker.fname}</Typography>
      <Typography sx={{ p: 2 }}>Birth Date: {marker.dob}</Typography>
      <Typography sx={{ p: 2 }}>Place of Birth: {marker.pob}</Typography>
      <Typography sx={{ p: 2 }}>Civil Status: {marker.cstatus}</Typography>
      <Typography sx={{ p: 2 }}>Religion: {marker.religion}</Typography>
    </Popover>
  );
};

export default PopupModal;
