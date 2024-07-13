import React, { FC, useMemo } from "react";
import { Box } from "@mui/material";
import { Chart } from "react-google-charts";
import { IProject } from "@/types/Project";

interface TreeMapProps {
  projects: IProject[];
}

const options = {
  minColor: "#f00",
  midColor: "#ddd",
  maxColor: "#0d0",
  headerHeight: 15,
  fontColor: "black",
};

// Function to summarize projects by sector and stage
function summarizeBySector(projects: IProject[]): { [sector: string]: { [etapa: string]: number } } {
  return projects.reduce((acc, project) => {
    const { Sector, EtapaActual } = project;
    if (!acc[Sector]) {
      acc[Sector] = {};
    }
    acc[Sector][EtapaActual] = (acc[Sector][EtapaActual] || 0) + 1;
    return acc;
  }, {} as { [sector: string]: { [etapa: string]: number } });
}

// Function to convert summarized data into the format required by the TreeMap chart
function formatData(summarizedData: { [sector: string]: { [etapa: string]: number } }) {
  return [
    ["Location", "Parent", "Cantidad de Proyectos"],
    ["Sectores", null, 0],
    ...Object.entries(summarizedData).flatMap(([sector, etapas]) => [
      [
        sector,
        "Sectores",
        Object.values(etapas).reduce((acc, count) => acc + count, 0),
      ],
      ...Object.entries(etapas).map(([etapa, projectCount]) => [
        `${sector} - ${etapa}`,
        sector,
        projectCount,
      ]),
    ]),
  ];
}

const TreeMap: FC<TreeMapProps> = ({ projects }) => {
  const summarizedData = useMemo(() => summarizeBySector(projects), [projects]);
  const data = useMemo(() => formatData(summarizedData), [summarizedData]);

  return (
    <Box display="flex" justifyContent="center">
      <Chart
        chartType="TreeMap"
        width="100%"
        height="600px"
        data={data}
        options={options}
      />
    </Box>
  );
};

export default TreeMap;
