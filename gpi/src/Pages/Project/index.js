import React, { useState, useContext } from "react";
import { ProjectContext } from "../../Utils/ProjectContext";
import CreateProject from "../CreateProject";

const Project = ({ guestMode }) => {
  const { project } = useContext(ProjectContext);
  const [projectData, setProjectData] = useState(project);

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
