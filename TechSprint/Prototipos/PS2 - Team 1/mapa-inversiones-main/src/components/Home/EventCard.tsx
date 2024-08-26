import React, { FC } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardMedia,
} from "@mui/material";

interface Event {
  title: string;
  type: string;
  date?: string;
  description: string;
  organizer?: string;
  image?: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {event.image && (
        <CardMedia
          sx={{ height: 172 }}
          image={event.image}
          title={event.title}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" color="textSecondary">
          {event.date}
        </Typography>
        <Typography variant="h6" component="div">
          {event.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {event.organizer}
        </Typography>
        <Button variant="outlined" sx={{ mt: 2, mb: 2 }}>
          {event.type}
        </Button>
        <Typography variant="body2" component="p">
          {event.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          padding: "16px",
        }}
      >
        <Button size="small" variant="contained" color="primary" sx={{ mb: 1 }}>
          {event.type === "CURSO" ? "Anotarme" : "¡Quiero participar!"}
        </Button>
        <Button size="small" color="secondary">
          Compartir
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
