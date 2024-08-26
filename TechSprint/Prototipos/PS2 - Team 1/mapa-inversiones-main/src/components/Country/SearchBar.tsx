import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import QuestionBar from "../QuestionBar";

function SearchBar() {
  return (
    <Box py={7} px={{ xs: 8, md: 20 }} sx={{ bgcolor: "#EFF4F7" }}>
      <Stack>
        <Typography fontWeight={300} fontSize="24px" gutterBottom>
          Si eres nuevo en el tema de la transparencia de los gastos públicos,
          utiliza el buscador.
        </Typography>
        <QuestionBar backGroundColor="#EFF4F7" />
      </Stack>
    </Box>
  );
}

export default SearchBar;
