// AddedSuccessfully.js
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const AddedSuccessfully = ({ open, handleClose, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%',  alignItems:"center",color:"red"}}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AddedSuccessfully;
