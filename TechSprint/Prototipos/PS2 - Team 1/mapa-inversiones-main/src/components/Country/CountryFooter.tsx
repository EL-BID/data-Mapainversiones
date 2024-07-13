import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";

const CountryFooter = () => {
  return (
    <Box
      component="footer"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="1rem"
      bgcolor="#0B3866"
      color="white"
      minHeight={193}
      px={{ xs: 8, md: 20 }}
    >
      <Box width={165} height={67} position="relative">
        <Image
          src="/assets/logo-gobierno-footer.png"
          alt="government Logo"
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>
      <Box>
        <Button color="inherit">Canales de ayuda</Button>
        <Button color="inherit">Términos y condiciones</Button>
        <Button color="inherit">Marco legal</Button>
      </Box>
    </Box>
  );
};

export default CountryFooter;
