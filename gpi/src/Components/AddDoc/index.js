import React, { useContext, useEffect } from "react";
import DocumentButton from "../DocumentButton";
import "./styles.css";
import { UserContext } from "../../Utils/UserContext";
import { ProjectContext } from "../../Utils/ProjectContext";
import { GuestContext } from "../../Utils/GuestContext";

const AddDoc = ({
  setDocumentUploads,
  documentUploads,
  projectFileName,
  setDataObject,
  savedFiles,
}) => {
  const { user } = useContext(UserContext);
  const { project } = useContext(ProjectContext);
  const { guest } = useContext(GuestContext);

  useEffect(() => {
    if (user === false && guest === false) {
      if (user.employeeNumber !== project.creatorID) {
        document.getElementById("fileButton").elements[0].readOnly = true;
      }
    }
  }, [guest, user, project.creatorID]);
  const buttonClick = () => {
    document.querySelector(`#hiddenFile`).click();
  };

  const onFileChange = (e) => {
    let ran = `FB${Math.ceil(Math.random() * 1000)}`;
    const file = e.target.files[0];
    setDocumentUploads((prev) => ({
      ...prev,
      [ran]: file,
    }));
    setDataObject((prev) => ({
      ...prev,
      projectFileName: {
        ...prev.projectFileName,
        [ran]: file.name,
      },
    }));
  };

  return (
    <div>
      <div>
        {guest ? (
          <span></span>
        ) : (
          <input
            id="fileButton"
            className="btn btn-outline-primary"
            type="button"
            value="Subir documento"
            onClick={buttonClick}
          />
        )}
        <div className="mt-3">
          {savedFiles ? (
            <div>
              {Object.keys(savedFiles).map((key, index) => {
                return (
                  <DocumentButton
                    key={key}
                    identifier={`${key}`}
                    className={`${key}`}
                    projectFileName={projectFileName}
                    documentUploads={documentUploads}
                    savedFiles={savedFiles}
                    setDocumentUploads={setDocumentUploads}
                    setDataObject={setDataObject}
                  />
                );
              })}
              <input
                type="file"
                style={{ display: "none" }}
                id="hiddenFile"
                name="hiddenFile"
                onChange={onFileChange}
              />
            </div>
          ) : (
            <input
              type="file"
              style={{ display: "none" }}
              id="hiddenFile"
              name="hiddenFile"
              onChange={onFileChange}
            />
          )}
          {documentUploads ? (
            <div>
              {Object.keys(documentUploads).map((key, index) => {
                return (
                  <DocumentButton
                    key={key}
                    identifier={`${key}`}
                    className={`${key}`}
                    projectFileName={projectFileName}
                    documentUploads={documentUploads}
                    savedFiles={savedFiles}
                    setDocumentUploads={setDocumentUploads}
                    setDataObject={setDataObject}
                  />
                );
              })}
              <input
                type="file"
                style={{ display: "none" }}
                id="hiddenFile"
                name="hiddenFile"
                onChange={onFileChange}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AddDoc;
