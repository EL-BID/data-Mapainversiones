import { Box, Typography, Link } from "@mui/material";
import Image from "next/image";

function Footer() {
  return (
    <Box
      component="footer"
      bgcolor="#003366"
      color="white"
      py={3}
      px={{ xs: 3, md: 20 }}
    >
      <Box
        display="flex"
        justifyContent={{ xs: "center", md: "space-between" }}
        alignItems="center"
        flexDirection={{ xs: "column", md: "row" }}
        gap={{ xs: 2, md: 0 }}
        textAlign={{ xs: "center", md: "left" }}
      >
        <Typography variant="body2">
          © 2021 Awesome Website. All rights reserved.
        </Typography>
        <Link href="#" color="inherit" underline="hover">
          Términos y condiciones
        </Link>
        <Box width={105} height={42} position="relative" mt={{ xs: 2, md: 0 }}>
          <Image
            src="/assets/bid-logo.png"
            alt="BID Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
