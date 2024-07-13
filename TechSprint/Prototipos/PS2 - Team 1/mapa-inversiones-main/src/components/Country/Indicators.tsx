import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

const indicators = [
  { label: "APROBADOS", value: 254, color: "#00b3e6" },
  { label: "EN EJECUCIÓN", value: 1200, color: "#00cc66" },
  { label: "PARALIZADOS", value: 620, color: "#ff3300" },
  { label: "EN REEVALUACIÓN", value: 120, color: "#ff1a1a" },
];

const Indicators = () => {
  return (
    <Box py={7} px={{ xs: 8, md: 20 }}>
      <Typography fontSize={28} fontWeight={700} gutterBottom>
        Indicadores de proyectos
      </Typography>
      <Grid container spacing={2}>
        {indicators.map((indicator, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    bgcolor: indicator.color,
                    borderRadius: "50%",
                    mr: 2,
                  }}
                />
                <Typography variant="subtitle2">{indicator.label}</Typography>
              </Box>
              <Typography variant="h4">
                {indicator.value.toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Indicators;
