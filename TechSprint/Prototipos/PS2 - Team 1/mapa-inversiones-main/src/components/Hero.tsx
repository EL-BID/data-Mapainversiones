import { Box, Typography, Button } from "@mui/material";

function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        height: {xs: "80vh", md: "100vh"},
        display: "flex",
        alignItems: "center",
        backgroundImage: `url(/assets/hero-section.jpeg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <Box position="relative" color="white" padding="0 4rem" maxWidth="800px">
        <Typography
          fontSize={{ xs: "18px", md: "40px" }}
          fontWeight={700}
          gutterBottom
        >
          Impulsamos la transparencia del gasto, las inversiones y las
          contrataciones públicas en América Latina y el Caribe
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "grey" },
          }}
        >
          Empezar ahora
        </Button>
      </Box>
    </Box>
  );
}

export default Hero;
