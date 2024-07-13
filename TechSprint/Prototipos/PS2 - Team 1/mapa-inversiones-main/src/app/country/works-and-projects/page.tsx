"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FilterSearch from "@/components/Country/WorksAndProjects/FilterSearch";
import dynamic from "next/dynamic";
import ProjectsTable from "@/components/Country/WorksAndProjects/ProjectsTable";
import { IProject } from "@/types/Project";
import { useProjects } from "../ProjectContext";

const Map = dynamic(() => import("../../../components/Country/Map/Map"), {
  loading: () => (
    <Box>
      <CircularProgress />
    </Box>
  ),
  ssr: false,
});

const WorksAndProjects = () => {
  const projects: IProject[] = useProjects();
  const [filteredProjects, setFilteredProjects] =
    useState<IProject[]>(projects);

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box>
      <Box sx={{ bgcolor: "#0a4d68", color: "white", py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Mapa de proyectos
          </Typography>
          <Typography variant="body1" paragraph>
            Accede a información detallada y actualizada sobre la ejecución de
            obras públicas en tu región y a nivel nacional. Nuestro portal te
            permite seguir de cerca cada proyecto,
            <Typography component="span" fontWeight="bold">
              fomentar la transparencia y participar activamente en el control
              ciudadano.
            </Typography>
          </Typography>
        </Container>
      </Box>
      <FilterSearch
        projects={projects}
        setFilteredProjects={setFilteredProjects}
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mx={{ xs: 4, lg: 20 }}
        my={10}
      >
        <Map projects={filteredProjects} />
      </Box>
      {isLgUp && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mx={20}
          my={10}
        >
          <ProjectsTable projects={filteredProjects} />
        </Box>
      )}
    </Box>
  );
};

export default WorksAndProjects;
