import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { editarCadastro } from "../services/globals";
import { useHistory, useParams } from "react-router-dom";
import "./Cadastrar-editar.css"


import { Button } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import ptLocale from "date-fns/locale/pt-BR";
import moment from "moment";

import { maskTel } from "../hooks/maskTel";
import DialogNormal from "../components/DialogNormal";

interface Cadastro {
  id_cad?: number;
  nome: string;
  telefone: string;
  email: string;
  data_nasc: string;
}

function Editar() {
  const history = useHistory();
  interface Params {
    id: string;
  }

  const { id } = useParams<Params>();
  const idN = parseInt(id);

  const [cadastro, setCadastro] = useState<Cadastro>();
  const [isLoading, setIsLoading] = useState(true);
  const [nome, setNome] = useState<string>("");
  const [nomeError, setNomeError] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [telefoneError, setTelefoneError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [dataNasc, setDataNasc] = useState(new Date());
  const [dataNascError, setDataNascError] = useState<string>("");

  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  const getCadastro = useCallback(async (id: number) => {
    try {
      const response = await axios.get(editarCadastro + id);
      setNome(response.data.cadastro.nome);
      setTelefone(maskTel(response.data.cadastro.telefone));
      setEmail(response.data.cadastro.email);
      setDataNasc(response.data.cadastro.data_nasc);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const inserirCadastros = useCallback(async () => {
    let errorString = 0;
    try {
      if (nome === "") {
        setNomeError("Insira seu nome");
        errorString++;
      } else {
        setNomeError("");
      }
      if (telefone === "") {
        setTelefoneError("Insira seu telefone");
        errorString++;
      } else if (telefone.length < 14) {
        setTelefoneError("Seu telefone est?? incompleto");
        errorString++;
      }else {
        setTelefoneError("");
      }
      if (email === "") {
        setEmailError("Insira seu e-mail");
        errorString++;
      } else if (email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
        setEmailError("");
      } else {
        setEmailError("Insira um email v??lido");
      }
      if (dataNasc === new Date()) {
        setDataNascError("Insira uma data que n??o seja hoje");
        errorString++;
      } else {
        setDataNascError("");
      }
      if (errorString > 0) {
        errorString = 0;
      } else {
        setIsLoading(true);
        setOpen(true);
        var data = new FormData();
        data.append("nome", nome);
        data.append("telefone", telefone);
        data.append("email", email);
        data.append("data_nasc", moment(dataNasc).format("DD/MM/YYYY"));

        await axios.post(editarCadastro + idN, data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [cadastro]);

  useEffect(() => {
    const novoCad: Cadastro = {
      nome: nome,
      telefone: telefone,
      email: email,
      data_nasc: moment(dataNasc).format("DD/MM/YYYY"),
    };

    setCadastro(novoCad);
  }, [nome, telefone, email, dataNasc]);

  useEffect(() => {
    getCadastro(idN);
  }, [idN, getCadastro]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
      <DialogNormal
        titulo="Edi????o efetuada."
        texto={nome + " foi atualizado!"}
        open={open}
        handleClose={() => handleClose()}
      />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h1>Editar</h1>
            <div className="form-group">
              <label>Nome</label>
              <input
                className="form-control"
                type="text"
                placeholder="Nome e sobrenome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <span className="dangerError">{nomeError}</span>
            </div>
            <div className="form-group">
              <label>Telefone</label>
              <input
                className="form-control"
                id="telefone"
                name="telefone"
                placeholder="(__) _____-____"
                value={telefone}
                maxLength={15}
                onChange={(e) => setTelefone(maskTel(e.target.value))}
              />
              <span className="dangerError">{telefoneError}</span>
            </div>
            <div className="form-group">
              <label>E-mail</label>
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="seu.email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="dangerError">{emailError}</span>
            </div>
            <div className="form-group">
              <label>Data de Nascimento</label>
              <div>
                <KeyboardDatePicker
                  clearable
                  value={dataNasc}
                  placeholder="10/10/2018"
                  onChange={(date: any) => setDataNasc(date)}
                  format="dd/MM/yyyy"
                  name="data_nasc"
                  minDate={new Date("01/01/1900")}
                />
              </div>
              <span className="dangerError">{dataNascError}</span>
            </div>
            <div className="form-group">
              <Button
                onClick={() => inserirCadastros()}
                className="ui icon button primary form-control"
              >
                Enviar
              </Button>
            </div>
          </div>
        </div>
        <div className="rowMT">
          <Button
            onClick={() => history.push("/build")}
            className="ui icon button primary form-control"
          >
            Ver cadastros
          </Button>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default Editar;
