"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import EmbeddedAiPageDialog from "./AiChatbot";

const FloatingIcon = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        color="primary"
        aria-label="chat"
        onClick={handleClickOpen}
        style={{
          position: "fixed",
          bottom: "8rem",
          right: "4rem",
          zIndex: 1000,
        }}
      >
        <img
          src="/assets/botI.svg"
          alt="Mapa Inversiones"
          width={130}
          height={130}
        />
      </Button>
      <EmbeddedAiPageDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default FloatingIcon;
