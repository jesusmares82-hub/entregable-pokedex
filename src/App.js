import "./App.css";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthButton from "./Components/AuthButton";
import LoginPage from "./Components/LoginPage";
import ProtectedPage from "./Components/ProtectedPage";
import PublicPage from "./Components/PublicPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import PokemonDetails from "./Components/PokemonDetails";
import EncountersPokemon from "./Components/EncountersPokemon";
import { ProvideAuth } from "./Provider/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div className="App">
          <AuthButton />

          <ul style={{ listStyleType: "none" }}>
            <li>
              <Link to="/pokedex">Pokedex Public</Link>
            </li>
            {/*<li>
              <Link to="/pokemon/:id">Pokemon Private</Link>
            </li>*/}
          </ul>
          <Switch>
            <Route exact path="/pokedex">
              <PublicPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route
              path="/pokedex/pokemon/:id"
              render={({ match }) => <PokemonDetails />}
            />
            <Route
              exact
              path={"/pokedex/pokemon/:id/encounters"}
              render={({ match }) => <EncountersPokemon />}
            />
            <ProtectedRoute
              path="/pokemon/:id"
              render={({ match }) => <PokemonDetails />}
            >
              <ProtectedPage />
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
