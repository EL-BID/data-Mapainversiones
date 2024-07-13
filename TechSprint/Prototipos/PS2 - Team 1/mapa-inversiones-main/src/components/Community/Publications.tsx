"use client";

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";

const Publications = () => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  // Render the component only if the screen size is lg or larger
  if (!isLgUp) {
    return null;
  }

  return (
    <Box px={20} py={8} bgcolor="#EFF4F7">
      <Grid container spacing={8} alignItems="center">
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2, maxWidth: 300, ml: "auto" }}>
            <Image
              src="/assets/publication-cover.png"
              alt="Publication cover"
              width={300}
              height={400}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography fontWeight={700} fontSize={36} gutterBottom>
            Publicaciones
          </Typography>
          <Typography variant="h5" gutterBottom>
            El impacto de MapaRegalías en Colombia
          </Typography>
          <Typography variant="body1" paragraph>
            Este documento analiza el impacto de MapaRegalías en la eficiencia
            de la ejecución de los proyectos de inversión pública en Colombia.
            MapaRegalías es una plataforma en línea que presenta información
            georreferenciada y datos sobre las regalías provenientes del sector
            extractivo.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mr: 2,
              bgcolor: "#004E70",
              "&:hover": { bgcolor: "#5a6268" },
            }}
          >
            Ver artículo
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              bgcolor: "#EFF4F7",
              "&:hover": { bgcolor: "#5a6268" },
            }}
          >
            Ver otras publicaciones
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Publications;
