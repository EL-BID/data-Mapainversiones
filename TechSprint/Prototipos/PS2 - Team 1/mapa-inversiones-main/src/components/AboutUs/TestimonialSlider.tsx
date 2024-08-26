"use client";

import React, { FC, useState } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const testimonials = [
  {
    text: "La capacidad de comparar los gastos públicos entre diferentes países en MapaInversiones me ha permitido obtener una perspectiva más global.",
    name: "Jorge González",
    position: "Estudiante de Economía",
    avatar: "/assets/avatar-1.png",
  },
  {
    text: "MapaInversiones facilita el seguimiento de las inversiones en salud. Ahora estoy más informada que nunca.",
    name: "Lucía Pérez",
    position: "Activista de Salud",
    avatar: "/assets/avatar-2.png",
  },
  {
    text: "Como investigador, MapaInversiones ha sido una herramienta invaluable para analizar los datos de gasto público.",
    name: "Carlos Rodríguez",
    position: "Analista de Políticas Públicas",
    avatar: "/assets/avatar-3.png",
  },
  {
    text: "MapaInversiones me ha permitido entender mejor las inversiones públicas en mi comunidad.",
    name: "Ana Martínez",
    position: "Líder Comunitaria",
    avatar: "/assets/avatar-1.png",
  },
];

const TestimonialSlider: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const testimonialsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonials = isMdUp
    ? testimonials.slice(
        currentIndex * testimonialsPerSlide,
        currentIndex * testimonialsPerSlide + testimonialsPerSlide
      )
    : testimonials;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      padding="20px 0"
      overflow="hidden"
    >
      {isMdUp && (
        <IconButton
          onClick={handlePrev}
          sx={{
            left: "0",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        >
          <ArrowBackIos />
        </IconButton>
      )}
      <Box
        display="flex"
        justifyContent={isMdUp ? "center" : "flex-start"}
        gap="20px"
        overflow={isMdUp ? "visible" : "auto"}
        width={isMdUp ? "auto" : "100%"}
        sx={{
          scrollSnapType: isMdUp ? "none" : "x mandatory",
          "& > div": {
            scrollSnapAlign: isMdUp ? "unset" : "center",
            minWidth: isMdUp ? "auto" : "300px",
          },
        }}
      >
        {currentTestimonials.map((testimonial, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            padding="20px"
            maxWidth="300px"
            margin={isMdUp ? "0 10px" : "0"}
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            borderRadius="8px"
            bgcolor="#fff"
          >
            <Avatar
              src={testimonial.avatar}
              alt={testimonial.name}
              sx={{ height: "85px", width: "85px" }}
            />
            <Typography variant="body1" fontStyle="italic" margin="20px 0">
              {testimonial.text}
            </Typography>
            <Typography variant="h6" fontWeight="bold" marginTop="10px">
              {testimonial.name}
            </Typography>
            <Typography variant="subtitle2" color="gray">
              {testimonial.position}
            </Typography>
          </Box>
        ))}
      </Box>
      {isMdUp && (
        <IconButton
          onClick={handleNext}
          sx={{
            right: "0",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      )}
    </Box>
  );
};

export default TestimonialSlider;
