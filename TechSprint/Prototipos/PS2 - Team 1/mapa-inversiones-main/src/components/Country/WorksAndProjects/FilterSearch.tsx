"use client";

import React, { FC, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { IProject } from "@/types/Project";

interface FilterSearchProps {
  projects: IProject[];
  setFilteredProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
}

const FilterSearch: FC<FilterSearchProps> = ({
  projects,
  setFilteredProjects,
}) => {
  const [estadoFilter, setEstadoFilter] = useState<string>("");

  useEffect(() => {
    if (estadoFilter) {
      const filtered = projects.filter(
        (project) => project.EtapaActual === estadoFilter
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [estadoFilter, projects, setFilteredProjects]);

  const handleEstadoChange = (event: SelectChangeEvent<string>) => {
    setEstadoFilter(event.target.value as string);
  };

  const filters = [
    { name: "Tipología", options: ["Option 1", "Option 2", "Option 3"] },
    { name: "Categoría", options: ["Category 1", "Category 2", "Category 3"] },
    {
      name: "Subcategoría",
      options: ["Subcategory 1", "Subcategory 2", "Subcategory 3"],
    },
    { name: "Estado", options: ["EJECUCIÓN", "REEVALUACION", "PARALIZADO"] },
    { name: "Año", options: ["2022", "2023", "2024"] },
  ];

  return (
    <Box px={{ xs: 8, md: 20 }} py={8}>
      <Button
        variant="outlined"
        sx={{
          textTransform: "none",
          borderRadius: 2,
          padding: "8px 16px",
          my: 4,
        }}
      >
        Utilizar mi ubicación
      </Button>
      <Typography variant="h5" gutterBottom>
        Búsqueda de proyectos
      </Typography>
      <Grid container spacing={2}>
        {filters.map((filter) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={filter.name === "Subcategoría" ? 12 : 6}
            key={filter.name}
          >
            <FormControl fullWidth size="small">
              <InputLabel id={`${filter.name}-label`}>{filter.name}</InputLabel>
              <Select
                labelId={`${filter.name}-label`}
                id={`${filter.name}-select`}
                label={filter.name}
                value={filter.name === "Estado" ? estadoFilter : ""}
                onChange={
                  filter.name === "Estado" ? handleEstadoChange : () => {}
                }
                defaultValue=""
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {filter.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FilterSearch;
