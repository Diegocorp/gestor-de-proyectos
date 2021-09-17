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
import { Switch, Route } from "react-router-dom";

const PageFrame = ({ data, guestMode }) => {
  const [size, setSize] = useState(false);
  const sizeValue = useMemo(() => ({ size, setSize }), [size, setSize]);

  return (
    <div
      className="d-flex w-100 h-100 overflow-hidden"
      style={{ position: "relative" }}
    >
      <SizeContext.Provider value={sizeValue}>
        <NavBar guestMode={guestMode ? guestMode : null} />
      </SizeContext.Provider>
      <span id="page-container" className="bg-white pt-0 m-0 w-100 h-100">
        <Header data={data} guestMode={guestMode} />
        <div id="page-container__div" className="">
          <Switch>
            <Route path={`/user/:userID/me`}>
              <UserPage />
            </Route>
            <Route path={`/user/:userID/statistics`}>
              <Statistics />
            </Route>
            <Route exact path={`/user/guest#statistics`}>
              <Statistics />
            </Route>
            <Route path={`/user/:userID/suggestions`}>
              <Suggestions />
            </Route>
            <Route exact path={`/user/:userID/projects`}>
              <Projects />
            </Route>
            <Route path={`/user/:userID/create`}>
              <CreateProject />
            </Route>
            <Route path={`/user/:userID/project/:id`}>
              <Project />
            </Route>
            <Route path={`/user/:userID/`}>
              <h1>The default page</h1>
            </Route>
            <Route path={`/guest/statistics`}>
              <Statistics />
            </Route>
            <Route path={`/guest/projects`}>
              <Projects guestMode={guestMode} />
            </Route>
            <Route path={`/guest/project/:id`}>
              <Project guestMode={guestMode} />
            </Route>
          </Switch>
        </div>
      </span>
    </div>
  );
};

export default PageFrame;
