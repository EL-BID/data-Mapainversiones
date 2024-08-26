"use client";

import { Box, Typography, Grid, Paper, Stack, useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const benefits = [
  {
    title: "Inmediatez",
    description:
      "Permitimos acceder a información inmediata y abierta en un formato unificado e intuitivo para los diferentes usuarios.",
  },
  {
    title: "Conocimiento",
    description:
      "Facilitamos el acceso a la información sobre la gestión de los recursos públicos para promover el control social y debate público.",
  },
  {
    title: "Transparencia",
    description:
      "La implementación de MapaInversiones mejora el cumplimiento de los estándares internacionales de Transparencia (OCP, EITI, CoST).",
  },
  {
    title: "Flexibilidad",
    description:
      "Cada país decide en qué sector implementar la plataforma de acuerdo a sus necesidades, recursos y prioridades.",
  },
];

function Benefits() {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  // Render the component only if the screen size is lg or larger
  if (!isLgUp) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" px={20}>
      <Stack p={4} spacing={2}>
        <Typography fontSize={28} fontWeight={700} gutterBottom>
          Beneficios de tener MapaInversiones en tu país
        </Typography>
        <Grid container spacing={0}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  py: 2,
                  px: 3,
                  height: "100%",
                  minHeight: 274,
                  backgroundColor: index % 2 === 0 ? "#D7E0E5" : "#f0f8ff",
                }}
              >
                <Typography fontWeight={700} fontSize={24} gutterBottom>
                  {benefit.title}
                </Typography>
                <Typography variant="body2">{benefit.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}

export default Benefits;
