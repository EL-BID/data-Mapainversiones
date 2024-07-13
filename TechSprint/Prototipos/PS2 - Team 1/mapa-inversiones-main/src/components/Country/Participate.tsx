import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const ParticipateSections = [
  {
    title: "Únete a debetes en el foro",
    description:
      "Participa en debates sobre la gestión de recursos públicos, compartiendo tus opiniones e ideas con otros ciudadanos.",
  },
  {
    title: "Envía sugerencias y reportes",
    description:
      "Contribuye a la transparencia enviando tus propuestas y reportes sobre irregularidades en proyectos.",
  },
  {
    title: "Contribuye",
    description:
      "Enriquece la plataforma subiendo información local sobre proyectos, aportando una perspectiva auténtica.",
  },
];

const Participate = () => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  // Render the component only if the screen size is lg or larger
  if (!isLgUp) {
    return null;
  }
  return (
    <Box mx={20} py={8}>
      <Typography variant="h5" component="h2" gutterBottom>
        Participa en MapaInversiones
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Sé parte del cambio: contribuye a una comunidad más transparente y
        eficiente. Tu participación marca la diferencia. Haz clic en
        Participación Ciudadana.
      </Typography>
      <Grid container spacing={2}>
        {ParticipateSections.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card sx={{ backgroundColor: "#D7E0E5" }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Participate;
