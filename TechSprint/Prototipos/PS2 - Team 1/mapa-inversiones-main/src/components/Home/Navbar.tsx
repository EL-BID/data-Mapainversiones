"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Link,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const menuList = (
    <List>
      <ListItem component={NextLink} href="/about-us">
        <ListItemText primary="Nosotros" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Comparación Internacional" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Datos Abiertos" />
      </ListItem>
      <ListItem component={NextLink} href="/community">
        <ListItemText primary="Comunidad" />
      </ListItem>
      <ListItem component={NextLink} href="/community">
        <ListItemText primary="Canales de ayuda" />
      </ListItem>
    </List>
  );

  return (
    <AppBar
      position="static"
      color="default"
      sx={{ minHeight: 151, display: "flex", justifyContent: "center" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          mx: { xs: "auto", md: 4 },
        }}
      >
        <Box display="flex" flexGrow={1}>
          <Link href="/" component={NextLink}>
            <img
              src="/assets/mapa-inversiones-header.svg"
              alt="Mapa Inversiones"
            />
          </Link>
        </Box>
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {menuList}
            </Drawer>
          </>
        ) : (
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={2.5}
          >
            <Link href="/about-us" component={NextLink}>
              <Typography>Nosotros</Typography>
            </Link>
            <Button color="inherit">
              <Typography>Comparación Internacional</Typography>
            </Button>
            <Button color="inherit">
              <Typography>Datos Abiertos</Typography>
            </Button>
            <Link href="/community" component={NextLink}>
              <Typography>Comunidad</Typography>
            </Link>
            <Link href="/community" component={NextLink}>
              <Typography>Canales de ayuda</Typography>
            </Link>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
