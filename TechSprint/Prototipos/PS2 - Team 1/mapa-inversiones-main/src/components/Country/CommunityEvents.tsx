import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import EventCard from "../Home/EventCard";

const CommunityEvents = () => {
  const events = [
    {
      date: "1 AGO | 10:00 HS",
      title: "Foro Internacional de Transparencia y Gestión Pública",
      type: "FORO",
      description:
        "Únete a líderes y expertos de todo el mundo en un foro dedicado a la transparencia y la gestión eficiente de los recursos públicos. Este evento de dos días incluirá paneles de discusión, talleres interactivos y estudios de caso sobre las mejores prácticas en transparencia gubernamental.",
      action: "¡Quiero participar!",
    },
    {
      date: "1 AGO | 10:00 HS",
      title: "Foro Internacional de Transparencia y Gestión Pública",
      type: "FORO",
      description:
        "Únete a líderes y expertos de todo el mundo en un foro dedicado a la transparencia y la gestión eficiente de los recursos públicos. Este evento de dos días incluirá paneles de discusión, talleres interactivos y estudios de caso sobre las mejores prácticas en transparencia gubernamental.",
      action: "¡Quiero participar!",
    },
    {
      title: "Participación ciudadana y control social",
      type: "CURSO",
      description:
        "Explora las mejores prácticas y estrategias para fomentar la participación ciudadana en la fiscalización del gasto público.",
      action: "Anotarme",
      image: "/assets/course.png",
    },
  ];

  return (
    <Box p={3} mx={{ xs: 8, md: 17 }}>
      <Typography variant="h4" gutterBottom>
        Comunidad
      </Typography>
      <Grid container spacing={3}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CommunityEvents;
