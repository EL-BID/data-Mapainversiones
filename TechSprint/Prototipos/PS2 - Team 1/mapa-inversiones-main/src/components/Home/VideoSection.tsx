import { Box, Typography, Grid } from "@mui/material";

function ImageVideoSection() {
  return (
    <Box px={{ xs: 6, lg: 20 }} py={10} bgcolor={"#f5f5f5"}>
      <Grid container spacing={4} alignItems="center">
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
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Transparencia total en la gestión de recursos Públicos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Con el uso de herramientas digitales y acceso a información buscamos
            dar una visión 360° del uso de los recursos públicos. Se incluye
            información sobre la planificación y ejecución presupuestaria, los
            proyectos de inversión pública y la contratación pública, teniendo
            como eje transversal la participación ciudadana.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ImageVideoSection;
