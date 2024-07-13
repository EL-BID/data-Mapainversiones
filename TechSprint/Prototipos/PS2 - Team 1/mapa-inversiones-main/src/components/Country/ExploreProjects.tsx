import React from "react";
import { Box, Grid, Typography, Button, Link } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";

const ExploreProjects = () => {
  return (
    <Box my={4} mx={{ xs: 8, md: 0 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box position="relative" height={400}>
            <Image
              src="/assets/map-example.png"
              alt="Mapa interactivo de proyectos"
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Explora los proyectos de tu región
          </Typography>
          <Typography variant="body1" paragraph>
            Utiliza nuestro mapa interactivo para explorar los diversos
            proyectos públicos e inversiones en todo el país. Desde grandes
            obras de infraestructura hasta iniciativas comunitarias, nuestro
            mapa te ofrece una visión detallada y accesible de cómo se están
            utilizando los recursos públicos.
          </Typography>

          <Link href="/country/works-and-projects" component={NextLink}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#6c757d",
                "&:hover": { bgcolor: "#5a6268" },
              }}
            >
              Explorar ahora
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExploreProjects;
