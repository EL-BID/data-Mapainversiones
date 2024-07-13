"use client";

import React from "react";
import { styled } from "@mui/material/styles";
import { IconButton, useMediaQuery } from "@mui/material";
import FacebookIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import AccessibilityIcon from "@mui/icons-material/SettingsAccessibilityOutlined";
import { useTheme } from "@mui/material/styles";

const FloatingBarContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.primary.main,
  borderTopLeftRadius: theme.shape.borderRadius,
  borderBottomLeftRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  zIndex: 1000,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  margin: theme.spacing(0.5),
}));

const AccessibilityIconButton = styled(IconButton)({
  color: "#ffffff",
  backgroundColor: "#00364E",
  margin: "4px",
  "&:hover": {
    backgroundColor: "#00486A",
  },
});

const FloatingBar = () => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  // Render the component only if the screen size is lg or larger
  if (!isLgUp) {
    return null;
  }

  return (
    <FloatingBarContainer>
      <StyledIconButton aria-label="Instagram">
        <InstagramIcon />
      </StyledIconButton>
      <StyledIconButton aria-label="Facebook">
        <FacebookIcon />
      </StyledIconButton>
      <StyledIconButton aria-label="Twitter">
        <XIcon />
      </StyledIconButton>
      <AccessibilityIconButton aria-label="Accessibility">
        <AccessibilityIcon />
      </AccessibilityIconButton>
    </FloatingBarContainer>
  );
};

export default FloatingBar;
