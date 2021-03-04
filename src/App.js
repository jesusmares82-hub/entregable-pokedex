import "./App.css";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthButton from "./Components/AuthButton";
import LoginPage from "./Components/LoginPage";
import ProtectedPage from "./Components/ProtectedPage";
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

          <ul style={{ listStyleType: "none" }}>
            <li>
              <Link to="/">
                {" "}
                <h4>About Pokedex </h4>
              </Link>
            </li>
          </ul>
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
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
