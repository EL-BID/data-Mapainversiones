import React, { FC } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Grid,
  Stack,
} from "@mui/material";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import PeopleIcon from "@mui/icons-material/People";
import { IProject } from "@/types/Project";

interface ProjectDetailsProps {
  project: IProject;
}

const ProjectDetails: FC<ProjectDetailsProps> = ({ project }) => {
  const getChipColor = (status: string) => {
    switch (status) {
      case "EJECUCIÓN":
        return "success";
      case "REEVALUACION":
        return "warning";
      case "PARALIZADO":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          Actualizado el 22 de Julio 2024
        </Typography>
        <Box mb={2}>
          <Button variant="outlined" sx={{ mr: 1 }}>
            Seguir este proyecto
          </Button>
          <Button variant="outlined">Guardar como favorito</Button>
        </Box>
      </Stack>
      <Card
        variant="outlined"
        sx={{ border: "1px solid #00364E", borderRadius: 2 }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5" component="div">
              {project?.NombreProyecto}
            </Typography>
            <Chip
              label={project?.EtapaActual}
              color={getChipColor(project?.EtapaActual)}
              size="small"
            />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Sector:</strong> {project?.Sector}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Producto:</strong> {project.nombreproducto}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Ejecutor:</strong> {project?.entidadejecutora}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2">
                <strong>Código Snip:</strong> {project?.codigosnip}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2">
                <strong>Fecha Inicio:</strong> {project?.AnioInicioProyecto}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2">
                <strong>Fecha Fin:</strong> {project?.AnioFinProyecto}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions
          sx={{
            justifyContent: "space-around",
            padding: "12px 16px",
          }}
        >
          <Button startIcon={<PhotoLibraryIcon />}>Galería de fotos</Button>
          <Button startIcon={<PeopleIcon />}>Participación ciudadana</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProjectDetails;
