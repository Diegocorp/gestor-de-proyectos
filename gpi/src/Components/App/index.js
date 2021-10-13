import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "../../Utils/PrivateRoute";
import Login from "../../Pages/Login";
import Forgot from "../../Pages/Forgot";
import Register from "../../Pages/Register";
import PageFrame from "../../Utils/PageFrame";
import { UserContext } from "../../Utils/UserContext";
import { ProjectContext } from "../../Utils/ProjectContext";
import { GuestContext } from "../../Utils/GuestContext";

function App() {
  const [user, setUser] = useState({});
  const [project, setProject] = useState({});
  const [guest, setGuest] = useState(false);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const projectValue = useMemo(
    () => ({ project, setProject }),
    [project, setProject]
  );
  const guestValue = useMemo(() => ({ guest, setGuest }), [guest, setGuest]);
  return (
    <Router>
      <div className="App bg-primary w-100 h-100">
        <Switch>
          <UserContext.Provider value={userValue}>
            <ProjectContext.Provider value={projectValue}>
              <GuestContext.Provider value={guestValue}>
                <Route path="/forgot">
                  <Forgot />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/guest/:page">
                  <PageFrame />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <PrivateRoute path={`/user/:userID/:page`}>
                  <PageFrame />
                </PrivateRoute>
                <Route path="/">
                  <Redirect to="/login" />
                </Route>
              </GuestContext.Provider>
            </ProjectContext.Provider>
          </UserContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
