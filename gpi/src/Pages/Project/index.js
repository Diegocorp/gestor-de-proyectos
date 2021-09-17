import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateProject from "../CreateProject";
import apis from "../../API";

const Project = ({ guestMode }) => {
  const [projectData, setProjectData] = useState({});
  let { id } = useParams();

  useEffect(() => {
    try {
      const payload = {
        id: id,
      };
      apis.getProjectById(payload).then((result) => {
        setProjectData(result);
      });
    } catch (error) {
      alert(error);
    }
  }, [id]);

  return (
    <div className="w-100">
      <CreateProject
        title="Vista de proyecto"
        projectData={projectData}
        setProjectData={setProjectData}
        guestMode={guestMode}
        edit={true}
      />
    </div>
  );
};

export default Project;
