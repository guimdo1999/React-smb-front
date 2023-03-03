import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { listarCadastros, listarBusca } from "../services/globals";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Grid } from "@mui/material";
import { Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import ptLocale from "date-fns/locale/pt-BR";
import moment from "moment";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import TabelaCadastros from "./../components/TabelaCadastros";
import { useHistory } from "react-router-dom";

interface Cadastro {
  id_cad: number;
  nome: string;
  telefone: string;
  email: string;
  data_nasc: string;
}

interface Busca {
  nome?: string;
  data_ini?: string;
  data_fim?: string;
}

const validationSchema = Yup.object().shape({
  nome: Yup.string().nullable(),
  //nome: Yup.string().required("Campo obrigatório"),
  dataIni: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr)),
  dataFim: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .min(Yup.ref("dataIni"), "Deve ser maior ou igual a data inicial"),
});

function ListarCadastros() {
  const history = useHistory();
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);

  const [busca, setBusca] = useState<Busca>();
  const [isLoading, setIsLoading] = useState(true);
  const [nome, setNome] = useState<string>("");
  const [dataIni, setDataIni] = useState(new Date());
  const [dataFim, setDataFim] = useState(new Date());

  const getCadastros = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(listarCadastros);
      setCadastros(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const getCadastrosBusca = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(listarBusca, { params: busca });
      setCadastros(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [busca]);

  useEffect(() => {
    const novaBusca: Busca = {
      nome: nome,
      data_ini: moment(dataIni).format("DD/MM/YYYY"),
      data_fim: moment(dataFim).format("DD/MM/YYYY"),
    };

    setBusca(novaBusca);
  }, [nome, dataIni, dataFim]);

  useEffect(() => {
    getCadastros();
  }, [getCadastros]);

  useEffect(() => {
    if (!isLoading) {
      setCadastros(cadastros);
    }
  }, [isLoading, cadastros]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
      <Formik
        initialValues={{ nome: "", dataIni: null, dataFim: null }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          getCadastrosBusca();
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid
              px={2}
              pt={{ xs: 1, sm: 2 }}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid>
                <h1 className="titulo">Cadastrados</h1>
              </Grid>
              <Grid sm={3}>
                <Button
                  onClick={() => history.push("/build/cadastrar")}
                  className="ui icon button primary form-control"
                >
                  Cadastrar
                </Button>
              </Grid>
            </Grid>
            <Grid
              px={2}
              container
              direction="column"
              justifyContent="space-between"
              alignItems="stretch"
            >
              <Card className="rowMT">
                <Card.Body>
                  <Grid
                    container
                    direction={{ md: "row", xs: "column" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "center" }}
                    mb={{ xs: -3, sm: 0 }}
                  >
                    <Grid md={3} mt={1}>
                      <h3>Busque por nome, se nasceu depois ou antes!</h3>
                    </Grid>
                    <Grid md={2} mt={1}>
                      <div className="ui input">
                        <input
                          className="form-control"
                          type="text"
                          name="nome"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Busque um nome"
                        />
                      </div>
                      <ErrorMessage name="nome" />
                    </Grid>
                    <Grid md={2} mt={1}>
                      <KeyboardDatePicker
                        clearable
                        value={dataIni}
                        placeholder="10/10/2018"
                        onChange={(date: any) => setDataIni(date)}
                        format="dd/MM/yyyy"
                        name="dataIni"
                        minDate={new Date("01/01/1900")}
                      />
                      <ErrorMessage name="dataIni" />
                    </Grid>
                    <Grid md={2} mt={1}>
                      <KeyboardDatePicker
                        clearable
                        value={dataFim}
                        placeholder="10/10/2018"
                        onChange={(date: any) => setDataFim(date)}
                        format="dd/MM/yyyy"
                        name="dataFim"
                      />
                      <ErrorMessage name="dataFim" />
                      {errors.dataFim && touched.dataFim && (
                        <div>{errors.dataFim}</div>
                      )}
                    </Grid>
                    <Grid md={1} mt={1}>
                      <button
                        className="ui icon button secundary form-control"
                        type="submit"
                      >
                        <i className="search icon"></i>
                      </button>
                    </Grid>
                  </Grid>
                </Card.Body>
              </Card>
            </Grid>
          </Form>
        )}
      </Formik>

      <Grid
        px={2}
        mt={{ xs: 1, sm: 3 }}
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <TabelaCadastros cadastros={cadastros} getCadastros={getCadastros} />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default ListarCadastros;
