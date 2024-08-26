import React, { FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";

interface EmbeddedAiPageDialogProps {
  open: boolean;
  handleClose: () => void;
}

const EmbeddedAiPageDialog: FC<EmbeddedAiPageDialogProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Box>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
        <DialogContent dividers>
          <iframe
            src="http://54.87.43.89:8501/"
            title="Embedded Page"
            style={{ width: "100%", height: "500px", border: "none" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmbeddedAiPageDialog;
