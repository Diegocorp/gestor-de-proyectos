import React from "react";
import DocumentButton from "../DocumentButton";
import "./styles.css";

const AddDoc = ({
  setDocumentUploads,
  documentUploads,
  projectFileName,
  guestMode,
  setDataObject,
}) => {
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
    <span>
      <span>
        {guestMode ? (
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

        {projectFileName ? (
          <div>
            {Object.keys(projectFileName).map((key, index) => {
              return (
                <DocumentButton
                  key={key}
                  identifier={`${key}`}
                  projectFileName={projectFileName}
                  documentUploads={documentUploads}
                  guestMode={guestMode}
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
      </span>
    </span>
  );
};

export default AddDoc;
