import React from "react";
import { Container, Box, Typography, Button, Divider } from "@mui/material";

const Forum = () => {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={6}
      >
        <Typography variant="h4" gutterBottom>
          Foro
        </Typography>
        <Typography variant="body1" gutterBottom>
          Conecta, comparte y colabora en un espacio donde tu voz mejora la
          transparencia en la gestión pública.
        </Typography>
        <Box width="100%" mt={4}>
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              ¿Cómo puedo monitorear las inversiones públicas en mi región?
            </Typography>
            <Divider />
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              ¿Qué lecciones podemos aprender de otros países sobre la gestión
              de recursos públicos?
            </Typography>
            <Divider />
          </Box>
          <Box mb={4}>
            <Typography variant="subtitle1" gutterBottom>
              ¿Qué estrategias pueden aumentar la eficiencia del gasto público
              en educación?
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary">
              Únete a la conversación
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Forum;
