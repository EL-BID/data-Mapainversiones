"use client";

import React, { FC, useMemo } from "react";
import { Box } from "@mui/material";
import { Chart } from "react-google-charts";
import { IProject } from "@/types/Project";

interface BudgetChartProps {
  projects: IProject[];
}

// Function to summarize budget by sector
const summarizeBySector = (projects: IProject[]): { [key: string]: number } => {
  return projects.reduce((acc, project) => {
    const { Sector, valorprogramado } = project;
    acc[Sector] = (acc[Sector] || 0) + valorprogramado;
    return acc;
  }, {} as { [key: string]: number });
};

// Function to format data for the ColumnChart
const formatBudgetData = (sectorSummary: { [key: string]: number }) => [
  ["Sector", "Presupuesto", { role: "style" }],
  ...Object.entries(sectorSummary).map(([sector, budget]) => [
    sector,
    budget,
    "color: #78B8C0",
  ]),
];

const BudgetChart: FC<BudgetChartProps> = ({ projects }) => {
  const sectorSummary = useMemo(() => summarizeBySector(projects), [projects]);

  const budgetData = useMemo(
    () => formatBudgetData(sectorSummary),
    [sectorSummary]
  );

  return (
    <Box display="flex" justifyContent="center">
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="600px"
        data={budgetData}
        options={{
          title: "Presupuesto por Sector",
          chartArea: { width: "50%" },
          hAxis: {
            title: "Presupuesto",
            minValue: 0,
          },
          vAxis: {
            title: "Sector",
          },
        }}
      />
    </Box>
  );
};

export default BudgetChart;
