import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AlertUser = (message) => {
  //   Snackbar
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (message === "Invalid email or password") {
      setOpen(true);
      return message;
    }
  }, [message]);
  // Position Snackbar
  const vertical = "top";
  const horizontal = "right";

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertUser;
