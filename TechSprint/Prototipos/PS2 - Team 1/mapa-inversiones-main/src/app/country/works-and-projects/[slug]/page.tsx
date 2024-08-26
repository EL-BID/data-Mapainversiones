"use client";

import { Box, useTheme, useMediaQuery, CircularProgress } from "@mui/material";
import ProjectDetails from "../../../../components/Country/WorksAndProjects/ProjectDetails/ProjectDetails";
import ProjectTabs from "../../../../components/Country/WorksAndProjects/ProjectDetails/ProjectTabs";
import RelatedProjects from "../../../../components/Country/WorksAndProjects/ProjectDetails/RelatedProjects";
import { IProject } from "@/types/Project";
import { useProjects } from "../../ProjectContext";
import { useMemo } from "react";

export default function Project({ params }: { params: { slug: string } }) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const projects: IProject[] = useProjects();

  const projectId = Number(params.slug);

  const project = useMemo(
    () => projects.find((project) => project.IdProyecto === projectId),
    [projects, projectId]
  );

  const relatedProjects = useMemo(
    () => projects.filter((project) => project.IdProyecto !== projectId),
    [projects, projectId]
  );

  if (projects.length === 0) {
    return (<Box><CircularProgress /></Box>);
  }

  return (
    <Box mx={{ xs: 4, md: 17 }}>
      {project && <ProjectDetails project={project} />}
      {project && <ProjectTabs project={project} />}
      {project && isMdUp && <RelatedProjects projects={relatedProjects} />}
    </Box>
  );
}
