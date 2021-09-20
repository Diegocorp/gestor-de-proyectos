import React from "react";
import DocumentButton from "../DocumentButton";
import "./styles.css";

const AddDoc = ({
  setDocumentUploads,
  documentUploads,
  projectFileName,
  guestMode,
  setDataObject,
  savedFiles,
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
        ) : null}
      </span>
    </span>
  );
};

export default AddDoc;
