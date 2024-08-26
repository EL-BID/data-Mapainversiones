"use client";

import { FC, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ProjectCard from "./ProjectCard";
import { IProject } from "@/types/Project";

interface IRelatedProjectsProps {
  projects: IProject[];
  itemsToShow?: number;
}

const RelatedProjects: FC<IRelatedProjectsProps> = ({
  projects,
  itemsToShow = 3,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    // Prevent going beyond the last project
    if (currentIndex < projects.length - itemsToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    // Prevent going before the first project
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom ml={2}>
        Proyectos relacionados
      </Typography>
      <Box display="flex" alignItems="center">
        <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
          <ChevronLeft />
        </IconButton>
        <Box display="flex" gap={2} overflow="hidden">
          {projects
            .slice(currentIndex, currentIndex + itemsToShow)
            .map((project, index) => (
              <ProjectCard
                key={index}
                image="/assets/project-photo-example.png"
                cost={project.CostoEstimadoProyecto}
                title={project.NombreProyecto}
                id={project.IdProyecto}
              />
            ))}
        </Box>
        <IconButton
          onClick={handleNext}
          disabled={currentIndex >= projects.length - itemsToShow}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RelatedProjects;
