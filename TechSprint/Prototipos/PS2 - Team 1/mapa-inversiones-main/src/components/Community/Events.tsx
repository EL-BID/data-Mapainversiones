import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

function Events() {
  const events = [
    {
      date: "1 AGO | 10:00 HS",
      title: "Foro Internacional de Transparencia y Gestión Pública",
      tag: "Transparencia Gubernamental",
      description:
        "Únete a líderes y expertos de todo el mundo en un foro dedicado a la transparencia y la gestión eficiente de los recursos públicos. Este evento de dos días incluirá paneles de discusión, talleres interactivos y estudios de caso sobre las mejores prácticas en transparencia gubernamental.",
    },
    {
      date: "1 AGO | 10:00 HS",
      title: "Hackathon de Datos Abiertos y Transparencia",
      tag: "Tecnología y Datos Abiertos",
      description:
        "Participa en una maratón de 48 horas donde desarrolladores, analistas de datos y entusiastas de la transparencia se reunirán para crear soluciones innovadoras utilizando datos abiertos.",
    },
    {
      date: "1 AGO | 10:00 HS",
      title: "Seminario de Comparación Internacional de Gasto Público",
      tag: "Economía y Finanzas Públicas",
      description:
        "Explora cómo diferentes países gestionan y distribuyen sus recursos públicos en este seminario especializado. A través de presentaciones detalladas y debates, conoce los métodos utilizados para comparar el gasto público entre naciones y cómo estos análisis pueden informar mejores políticas públicas.",
    },
  ];

  return (
    <Box px={{ xs: 8, md: 20 }} py={8}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" pb={2} mb={2} gutterBottom>
          Charlas
        </Typography>
        <IconButton color="primary">
          <Typography variant="button" sx={{ mr: 1 }}>
            Ver todos
          </Typography>
          <ArrowForward />
        </IconButton>
      </Stack>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 4 }}>
        Únete a nuestros eventos para explorar las últimas tendencias en
        transparencia y gestión pública.
      </Typography>
      <Grid container spacing={3}>
        {events.map((event, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={0}
              sx={{ p: 2, height: "100%", border: "1px solid #e0e0e0" }}
            >
              <Typography variant="subtitle2" color="#234F6A" gutterBottom>
                {event.date}
              </Typography>
              <Typography
                variant="h6"
                fontWeight={700}
                color="#495057"
                gutterBottom
              >
                {event.title}
              </Typography>
              <Chip label={event.tag} size="small" sx={{ mb: 2 }} />
              <Typography variant="body2" paragraph>
                {event.description}
              </Typography>
              <Stack>
                <Button variant="outlined" color="primary">
                  ¡Quiero participar!
                </Button>
                <Button variant="text">Compartir</Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Events;
