import React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Paginations = ({ count, pageValue, handleChange }) => {
  return (
    <div style={{ marginBottom: "18px" }}>
      <Stack spacing={2}>
        <Typography>Page: {pageValue}</Typography>
        <Pagination count={count} onChange={handleChange} />
      </Stack>
    </div>
  );
};

export default Paginations;
