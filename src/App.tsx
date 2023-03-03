import "fomantic-ui-css/semantic.css";
import { BrowserRouter , Switch, Route, withRouter } from "react-router-dom";
import "./App.css";
import CadastrarEditar from "./pages/Cadastrar-editar";
import Editar from "./pages/Editar";
import ListarCadastros from "./pages/Listar-cadastros";

function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/build" component={withRouter(ListarCadastros)} />
        <Route exact path="/build/cadastrar" component={withRouter(CadastrarEditar)} />
        <Route exact path="/build/editar/:id" component={withRouter(Editar)} />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
