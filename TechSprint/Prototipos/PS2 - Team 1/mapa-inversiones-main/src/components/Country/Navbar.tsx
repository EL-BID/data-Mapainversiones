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
  Menu,
  MenuItem,
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <ListItem component={NextLink} href="/country/about-us">
        <ListItemText primary="Nosotros" />
      </ListItem>
      <ListItem onClick={handleClick}>
        <ListItemText primary="Proyectos y obras públicas" />
      </ListItem>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={handleClose}
          component={NextLink}
          href="/country/works-and-projects"
        >
          Menú de Proyectos
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={NextLink}
          href="/country/works-and-projects/data-visualization"
        >
          Visualizador de Datos
        </MenuItem>
      </Menu>
      <ListItem component={NextLink} href="/country/datos-abiertos">
        <ListItemText primary="Datos abiertos" />
      </ListItem>
      <ListItem component={NextLink} href="/country/community">
        <ListItemText primary="Comunidad" />
      </ListItem>
      <ListItem>
        <Button variant="contained" color="primary" fullWidth>
          <Typography>Participación ciudadana</Typography>
        </Button>
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
            <img src="/assets/logo-gobierno.svg" alt="Mapa Inversiones" />
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
            <Link href="/country/about-us" component={NextLink}>
              <Typography>Nosotros</Typography>
            </Link>
            <Box>
              <Typography onClick={handleClick} sx={{ cursor: "pointer" }}>
                Proyectos y obras públicas
              </Typography>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  component={NextLink}
                  href="/country/works-and-projects"
                >
                  Menú de Proyectos
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={NextLink}
                  href="/country/works-and-projects/data-visualization"
                >
                  Visualizador de Datos
                </MenuItem>
              </Menu>
            </Box>
            <Link href="/country/datos-abiertos" component={NextLink}>
              <Typography>Datos abiertos</Typography>
            </Link>
            <Link href="/country/community" component={NextLink}>
              <Typography>Comunidad</Typography>
            </Link>
            <Button variant="contained" color="primary">
              <Typography>Participación ciudadana</Typography>
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
