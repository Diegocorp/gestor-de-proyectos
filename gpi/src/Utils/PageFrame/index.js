import React, { useState } from 'react';
import NavBar from '../../Components/NavBar';
import Header from '../../Components/Header';

import UserPage from '../../Pages/User';
import Statistics from '../../Pages/Statistics';
import Projects from '../../Pages/Projects';
import CreateProject from '../../Pages/CreateProject'

import { Switch, Route, useRouteMatch } from 'react-router-dom';

const PageFrame = ({data}) => {
  let { path } = useRouteMatch();
  let currentPath = window.location.pathname.replace(path, '');
  const [state, setState] = useState(`${currentPath}`);
  return(
    <div className="d-flex w-100">
      <NavBar state={state} setState={setState}/>
      <span className="bg-white p-0 m-0 w-100">
        <Header data={data} state={state} setState={setState}/>
        <Switch>
          <Route path={`${path}/me`}>
            <UserPage/>
          </Route>
          <Route path={`${path}/statistics`}>
            <Statistics/>
          </Route>
          <Route path={`${path}/projects`}>
            <Projects/>          
          </Route>
          <Route path={`${path}/create`}>
            <CreateProject/>
          </Route>
          <Route path={`${path}/`}>
            <h1>The default page</h1>
          </Route>
        </Switch>
      </span>
    </div>
  )
};

export default PageFrame;