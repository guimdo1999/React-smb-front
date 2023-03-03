import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
import { deletarCadastro } from "../services/globals";
import { useCallback } from "react";

type Modal = {
  id?: number;
  nome?: string;
  getCadastros?: any;
  tipo?: string;
};
function ModalComBotao({ id, nome, getCadastros, tipo }: Modal) {
  let titulo: string = "";
  tipo === "excluir" ? titulo = "Excluir um cadastro" : titulo = "Editar cadastro";
  let txt: string = '';
  tipo === "excluir" ? txt = `Tem certeza que deseja excluir ` + nome + `?` : txt = nome + "foi editado.";
  let okay: string = "";
  tipo === "excluir" ? okay = `Excluir` + nome + `?` : okay = "Okay";

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteCadastro = useCallback(async () => {
    try {
      await axios.get(deletarCadastro + id);
      getCadastros();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }, [getCadastros, id]);

  const handleButtonClick = () => {
    if (tipo === "excluir") {
      deleteCadastro();
    } else {
      handleClose();
    }
  };

  return (
    <div>

      <Button variant="contained" className="danger" onClick={handleClickOpen}>
        X
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{titulo}</DialogTitle>
        <DialogContent>{txt}</DialogContent>
        <DialogActions>
          <Button onClick={handleButtonClick} className="danger">
            {okay}
          </Button>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalComBotao;
