import { Box } from '@mui/material'
import React from 'react'
import loader from '/assets/ringloader.gif'

const Loader = () => {
  return (
    <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
     }}>
      <img src={loader} alt="gif" />
    </Box>
  )
}

export default Loader