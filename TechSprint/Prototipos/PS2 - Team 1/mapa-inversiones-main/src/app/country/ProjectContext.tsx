"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { IProject } from "@/types/Project";

const ProjectContext = createContext<IProject[]>([]);

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const data = require("../../mockData/dominican-republic-data.json");
    setProjects(data);
  }, []);

  return (
    <ProjectContext.Provider value={projects}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
