import "./App.css";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthButton from "./Components/AuthButton";
import LoginPage from "./Components/LoginPage";
import ProtectedPage from "./Components/ProtectedPage";
import PublicPage from "./Components/PublicPage";
import ProtectedRoute from "./Components/ProtectedRoute";
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
              <Link to="/pokedex">Pokedex</Link>
            </li>
            <li>
              <Link to="/pokemon">Pokemon</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/pokedex">
              <PublicPage path="/pokemon" />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <ProtectedRoute path="/pokemon">
              <ProtectedPage />
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
