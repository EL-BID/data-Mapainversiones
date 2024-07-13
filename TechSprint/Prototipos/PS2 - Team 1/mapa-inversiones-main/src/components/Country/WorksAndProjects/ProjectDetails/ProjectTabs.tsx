"use client";

import React, { FC } from "react";
import { Box, Typography, Tab, Tabs, Grid } from "@mui/material";
import { IProject } from "@/types/Project";

interface IProjectTabs {
  project: IProject;
}

const ProjectTabs: FC<IProjectTabs> = ({ project }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box py={4} my={4} sx={{ bgcolor: "#f1f1f1" }}>
      <Box justifyContent="center" px={4}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Información general y etapas" />
          <Tab label="Contratista" />
          <Tab label="Info. socioeconómica" />
          <Tab label="Objetivos de desarrollo sostenible" />
        </Tabs>
      </Box>
      <Box justifyContent="center" p={4}>
        <Typography variant="body2" color="text.secondary">
          {project?.ObjetivoGeneral}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProjectTabs;
