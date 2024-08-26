import { Box, Typography, Grid, IconButton, Stack } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import EventCard from "../Home/EventCard";

function Courses() {
  const courses = [
    {
      date: "1 AGO | 10:00 HS",
      type: "CURSO",
      organizer: "",
      title: "Participación ciudadana y control social",
      description:
        "Explora las mejores prácticas y estrategias para fomentar la participación ciudadana en la fiscalización del gasto público. Este curso te enseñará a involucrar a la comunidad y utilizar sus aportes para mejorar la gestión de recursos públicos.",
      image: "/assets/course.png",
    },
    {
      date: "1 AGO | 10:00 HS",
      type: "CURSO",
      organizer: "",
      title: "Participación ciudadana y control social",
      description:
        "Aprende a utilizar herramientas avanzadas para analizar y visualizar datos de inversión pública. Desde hojas de cálculo hasta software especializado, desarrollarás capacidades para interpretar datos y tomar decisiones informadas.",
      image: "/assets/course.png",
    },
    {
      date: "1 AGO | 10:00 HS",
      type: "CURSO",
      organizer: "",
      title: "Participación ciudadana y control social",
      description:
        "Descubre los principios fundamentales de la transparencia gubernamental y aprende a utilizar datos abiertos para la investigación y el análisis. Este curso te proporciona las bases necesarias para entender y aplicar prácticas de transparencia en tu entorno.",
      image: "/assets/course.png",
    },
  ];

  return (
    <Box px={{ xs: 8, md: 20 }} py={8}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Cursos
        </Typography>
        <IconButton color="primary">
          <Typography variant="button" sx={{ mr: 1 }}>
            Ver todos
          </Typography>
          <ArrowForward />
        </IconButton>
      </Stack>
      <Typography variant="body1" paragraph>
        Fortalece tus habilidades y conocimientos en temas de transparencia,
        datos abiertos y gestión pública. Aprende a tu propio ritmo y con acceso
        a expertos en la materia.
      </Typography>
      <Grid container spacing={3} mt={4}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
            <EventCard event={course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Courses;
