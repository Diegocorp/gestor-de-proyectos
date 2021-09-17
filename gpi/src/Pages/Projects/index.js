import React, { useState, useEffect, useContext } from "react";
import CustomTable from "../../Components/Table";
import apis from "../../API";
import Spinner from "react-bootstrap/Spinner";
import { UserContext } from "../../Utils/UserContext";
import "./styles.css";

const Projects = () => {
  const [projectsData, setProjectsData] = useState({});
  const [toggleUserProjects, setToggleUserProjects] = useState(false);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      toggleUserProjects
        ? await apis
            .getProjectsByCreator({ creatorID: user.employeeNumber })
            .then((result) => {
              setLoading(false);
              setProjectsData(result);
            })
        : await apis.getProjects().then((result) => {
            setLoading(false);
            setProjectsData(result);
          });
    }
    fetchData();
  }, [toggleUserProjects, user]);

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div id="hide-scroll__parent">
        <div
          id="hide-scroll__child"
          className="container-fluid h-100 overflow-auto mb-4 d-flex justify-content-center align-items-center w-100"
        >
          {loading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <CustomTable
              projectsData={projectsData}
              setToggleUserProjects={setToggleUserProjects}
              toggleUserProjects={toggleUserProjects}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
