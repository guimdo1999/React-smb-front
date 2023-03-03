import "fomantic-ui-css/semantic.css";
import { BrowserRouter , Switch, Route } from "react-router-dom";
import "./App.css";
import CadastrarEditar from "./pages/Cadastrar-editar";
import Editar from "./pages/Editar";
import ListarCadastros from "./pages/Listar-cadastros";

function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/build" component={ListarCadastros} />
        <Route exact path="/build/cadastrar" component={CadastrarEditar} />
        <Route exact path="/build/editar/:id" component={Editar} />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
