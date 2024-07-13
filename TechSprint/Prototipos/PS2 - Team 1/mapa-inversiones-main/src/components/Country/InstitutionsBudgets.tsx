import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import Image from "next/image";

const institutions = [
  { name: "MINISTERIO DE EDUCACIÓN", budget: "$ 120.0000.000" },
  { name: "MINISTERIO DE EDUCACIÓN", budget: "$ 120.0000.000" },
  { name: "MINISTERIO DE EDUCACIÓN", budget: "$ 120.0000.000" },
];

const InstitutionBudgets = () => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  // Render the component only if the screen size is lg or larger
  if (!isLgUp) {
    return null;
  }

  return (
    <Box py={7} px={{ xs: 8, md: 20 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">
          Instituciones con mayor asignación presupuestal
        </Typography>
        <IconButton color="primary">
          <Typography variant="button" sx={{ mr: 1 }}>
            Ver todos
          </Typography>
          <ArrowForward />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        {institutions.map((institution, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Box mr={2}>
                  <Image
                    src="/assets/institution-icon.png"
                    alt="Building icon"
                    width={40}
                    height={40}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {institution.name}
                  </Typography>
                  <Typography variant="h6">{institution.budget}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InstitutionBudgets;
