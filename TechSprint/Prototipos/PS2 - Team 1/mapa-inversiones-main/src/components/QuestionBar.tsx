"use client";

import React, { FC, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Button,
  InputBase,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";

interface QuestionBarProps {
  backGroundColor: string;
}

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "4px",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

const StyledTextField = styled(InputBase)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "4px",
  padding: "8px 12px",
  width: "100%",
}));

const QuestionBar: FC<QuestionBarProps> = ({ backGroundColor }) => {
  const [profile, setProfile] = useState("");
  const [question, setQuestion] = useState("");

  const handleProfileChange = (event: SelectChangeEvent<unknown>) => {
    setProfile(event.target.value as string);
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Profile:", profile, "Question:", question);
    // Handle submission logic here
  };

  return (
    <Box
      bgcolor={backGroundColor}
      minHeight={144}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        gap={2}
        mx={{ xs: 8, md: 22 }}
        width="100%"
      >
        <StyledSelect
          value={profile}
          onChange={handleProfileChange}
          displayEmpty
          renderValue={
            profile !== "" ? undefined : () => "Selecciona tu perfil"
          }
        >
          <MenuItem value="">Selecciona tu perfil</MenuItem>
          <MenuItem value="ciudadano">Ciudadano</MenuItem>
          <MenuItem value="funcionario">Funcionario</MenuItem>
        </StyledSelect>
        <Box flexGrow={1} display="flex">
          <StyledTextField
            placeholder="Hazme una pregunta"
            value={question}
            onChange={handleQuestionChange}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Enviar
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default QuestionBar;
