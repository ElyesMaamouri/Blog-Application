import React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Paginations = ({ count, page, handleChange }) => {
  return (
    <div>
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination count={count} onChange={handleChange} />
      </Stack>
    </div>
  );
};

export default Paginations;
