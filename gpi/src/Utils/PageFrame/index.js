import React, { useState, useMemo } from "react";
import NavBar from "../../Components/NavBar";
import Header from "../../Components/Header";
import { SizeContext } from "../../Utils/SizeContext";
import UserPage from "../../Pages/User";
import Statistics from "../../Pages/Statistics";
import Suggestions from "../../Pages/Suggestions";
import Projects from "../../Pages/Projects";
import Project from "../../Pages/Project";
import CreateProject from "../../Pages/CreateProject";
import "./styles.css";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const PageFrame = ({ data, guestMode }) => {
  let { path } = useRouteMatch();
  let currentPath = window.location.pathname.replace(path, "");
  const [state, setState] = useState(`${currentPath}`);
  const [size, setSize] = useState(false);
  const sizeValue = useMemo(() => ({ size, setSize }), [size, setSize]);

  return (
    <div
      className="d-flex w-100 h-100 overflow-hidden"
      style={{ position: "relative" }}
    >
      <SizeContext.Provider value={sizeValue}>
        <NavBar
          state={state}
          setState={setState}
          guestMode={guestMode ? guestMode : null}
        />
      </SizeContext.Provider>
      <span id="page-container" className="bg-white pt-0 m-0 w-100 h-100">
        <Header
          data={data}
          state={state}
          setState={setState}
          guestMode={guestMode}
        />
        <div id="page-container__div" className="">
          <Switch>
            <Route path={`${path}/me`}>
              <UserPage />
            </Route>
            <Route path={`${path}/statistics`}>
              <Statistics />
            </Route>
            <Route path={`${path}/suggestions`}>
              <Suggestions />
            </Route>
            <Route exact path={`${path}/projects`}>
              <Projects />
            </Route>
            <Route path={`${path}/create`}>
              <CreateProject />
            </Route>
            <Route path={`${path}/projects/:id`}>
              <Project guestMode={guestMode} />
            </Route>
            <Route path={`${path}/`}>
              <h1>The default page</h1>
            </Route>
          </Switch>
        </div>
      </span>
    </div>
  );
};

export default PageFrame;