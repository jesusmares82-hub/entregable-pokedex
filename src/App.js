import "./App.css";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthButton from "./Components/AuthButton";
import LoginPage from "./Components/LoginPage";
import PublicPage from "./Components/PublicPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import PokemonDetails from "./Components/PokemonDetails";
import EncountersPokemon from "./Components/EncountersPokemon";
import Home from "./Components/Home";
import { ProvideAuth } from "./Provider/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <AuthButton />

          <Switch>
            <ProtectedRoute exact path="/pokedex">
              <PublicPage />
            </ProtectedRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <ProtectedRoute exact path="/pokedex/pokemon/:id">
              <PokemonDetails />
            </ProtectedRoute>
            <ProtectedRoute exact path={"/pokedex/pokemon/:id/encounters"}>
              <EncountersPokemon />
            </ProtectedRoute>
            <Route path="*">
              <p>La ruta es invalida</p>
              <Link to="/">Ir a el Listado</Link>
            </Route>
            <ProtectedRoute exact path="/">
              <Home />
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
