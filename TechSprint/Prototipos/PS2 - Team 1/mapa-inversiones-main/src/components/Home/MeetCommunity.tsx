import React from "react";
import { Grid, Typography, Container } from "@mui/material";
import EventCard from "../Home/EventCard";

const events = [
  {
    date: "1 AGO | 10:00 HS",
    title: "Foro Internacional de Transparencia y Gestión Pública",
    organizer: "BID TEAM ORGANIZADOR",
    type: "CHARLA",
    description:
      "Únete a líderes y expertos de todo el mundo en un foro dedicado a la transparencia y la gestión eficiente de los recursos públicos.",
  },
  {
    date: "1 AGO | 10:00 HS",
    title: "Foro Internacional de Transparencia y Gestión Pública",
    organizer: "BID TEAM ORGANIZADOR",
    type: "CHARLA",
    description:
      "Únete a líderes y expertos de todo el mundo en un foro dedicado a la transparencia y la gestión eficiente de los recursos públicos.",
  },
  {
    date: "1 AGO | 10:00 HS",
    title: "Participación ciudadana y control social",
    organizer: "",
    type: "CURSO",
    description:
      "Explora las mejores prácticas y estrategias para fomentar la participación ciudadana en la fiscalización del gasto público.",
    image: "/assets/course.png",
  },
];

export default function MeetCommunity() {
  return (
    <Container sx={{ py: 10 }}>
      <Typography fontWeight={700} fontSize={28} gutterBottom>
        Conoce nuestra comunidad internacional
      </Typography>
      <Grid container spacing={3}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
