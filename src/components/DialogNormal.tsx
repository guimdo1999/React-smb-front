import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

type Dialog = {
  titulo: string;
  texto: string;
  open: boolean;
  handleClose: () => void;

};
function DialogNormal({ titulo, texto, open, handleClose }:Dialog) {
  
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{titulo}</DialogTitle>
        <DialogContent>{texto}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
  export default DialogNormal;