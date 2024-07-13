import { Box, Typography, Stack } from "@mui/material";
import MapaInvSteps from "../../../components/AboutUs/MapaInvSteps";
import MapaInvCountries from "../../../components/AboutUs/MapaInvCountries";
import TestimonialSlider from "../../../components/AboutUs/TestimonialSlider";
import Benefits from "@/components/Home/Benefits";

export default function AboutUs() {
  return (
    <Box>
      <Stack
        minHeight={257}
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        color="white"
        fontSize={40}
        fontWeight="bold"
        px={{ xs: 8, lg: 20 }}
        bgcolor={"#234F6A"}
      >
        <Typography fontWeight={700} fontSize="40px">
          Nosotros
        </Typography>
        <Typography fontWeight={400} fontSize="28px">
          Transparencia e integridad en el uso de los recursos públicos.
        </Typography>
      </Stack>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={4}
        px={{ xs: 8, lg: 20 }}
        minHeight={272}
        bgcolor={"#FFFFFF"}
      >
        <Typography fontWeight={400} fontSize="20px">
          MapaInversiones es una iniciativa del BID que impulsa la transparencia
          del gasto, las inversiones y las contrataciones públicas en América
          Latina y el Caribe, a través de plataformas digitales que integran y
          visualizan datos públicos.
        </Typography>
      </Box>
      <Benefits />
      <MapaInvSteps />
      <MapaInvCountries />
      <TestimonialSlider />
    </Box>
  );
}
