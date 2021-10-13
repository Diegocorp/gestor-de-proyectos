import React from "react";
import CreateProject from "../CreateProject";

const Project = () => {
  return (
    <div className="w-100">
      <CreateProject title="Vista de proyecto" edit={true} />
    </div>
  );
};

export default Project;
