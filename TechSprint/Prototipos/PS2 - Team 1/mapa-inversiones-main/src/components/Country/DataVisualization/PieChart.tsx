"use client";

import React, { FC, useMemo } from "react";
import { Box } from "@mui/material";
import { Chart } from "react-google-charts";
import { IProject } from "@/types/Project";

interface PieChartProps {
  projects: IProject[];
}

// Define options for the PieChart
const chartOptions = {
  title: "Proyectos por Estado de Ejecución",
  pieHole: 0.4,
  is3D: false,
};

// Helper function to count projects by stage
const countProjectsByStage = (projects: IProject[]): Record<string, number> => {
  return projects.reduce((stageSummary, project) => {
    const stage = project.EtapaActual;
    stageSummary[stage] = (stageSummary[stage] || 0) + 1;
    return stageSummary;
  }, {} as Record<string, number>);
};

const PieChart: FC<PieChartProps> = ({ projects }) => {
  const stageSummary = useMemo(
    () => countProjectsByStage(projects),
    [projects]
  );

  // Prepare data for the PieChart
  const chartData = useMemo(
    () => [
      ["Estados", "Proyectos por Estado"],
      ...Object.entries(stageSummary).map(([stage, count]) => [stage, count]),
    ],
    [stageSummary]
  );

  return (
    <Box display="flex" justifyContent="center">
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={chartData}
        options={chartOptions}
      />
    </Box>
  );
};

export default PieChart;
