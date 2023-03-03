import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ModalComBotao from "./Modal";
import { Button } from "@material-ui/core";

import useWindowDimensions from "../hooks/useWindowDimensions";

type Cadastro = {
  id_cad: number;
  nome: string;
  email: string;
  telefone: string;
  data_nasc: string;
};

type Props = {
  cadastros: Cadastro[];
  getCadastros: any;
};

function TabelaCadastros({ cadastros, getCadastros }: Props) {
  const [listaCadastros, setListaCadastros] = useState<Cadastro[]>([]);
  const history = useHistory();

  const { width } = useWindowDimensions();

  useEffect(() => {
    setListaCadastros(cadastros);
  }, [cadastros]);

  useEffect(() => {
    const table = document.querySelector(".ui.table");
    if (table) {
      if (width > 768) {
        table.classList.remove("very", "long");
        table.classList.add("long");
      } else {
        table.classList.remove("long");
        table.classList.add("very", "long");
      }
    }
  }, [width]);

  return (
    <table className="ui stackable scrolling single line fixed table very long">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Telefone</th>
          <th>Data de Nascimento</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {listaCadastros.map((cadastro) => (
          <tr key={cadastro.id_cad}>
            <td>{cadastro.nome}</td>
            <td>{cadastro.email}</td>
            <td>{cadastro.telefone}</td>
            <td>{cadastro.data_nasc}</td>
            <td className="buttons-container">
              <Button
                variant="contained"
                className="primaryC"
                onClick={() => history.push("/build/editar/" + cadastro.id_cad)}
              >
                Editar
              </Button>
              <ModalComBotao
                id={cadastro.id_cad}
                nome={cadastro.nome}
                getCadastros={getCadastros}
                tipo="excluir"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaCadastros;
