import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";

const MapaInversionesSteps = () => {
  return (
    <Box sx={{ bgcolor: "#EFF4F7", py: 7 }}>
      <Grid container spacing={4} alignItems="center" px={{ xs: 8, md: 20 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            10 Pasos para implementar MapaInversiones
          </Typography>
          <Typography variant="body1" paragraph>
            Desde la definición de la visión hasta la socialización y
            comunicación, nuestro desarrollo incluye 12 pasos clave: alcance,
            inventario tecnológico, arquitectura, integración y calidad de
            datos, participación ciudadana, construcción y capacitación,
            transferencia, publicación, socialización y estrategias de
            comunicación. Cada etapa asegura un enfoque meticuloso y
            colaborativo para una implementación exitosa y sostenible.
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0a4d68",
              "&:hover": { bgcolor: "#083f54" },
            }}
          >
            Solicitar información
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            position="relative"
            width="100%"
            height="300px"
            sx={{ overflow: "hidden", paddingTop: "56.25%" }}
          >
            <iframe
              src="https://www.youtube.com/embed/qrBMYAHCFus"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              title="MapaInversiones video"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MapaInversionesSteps;
