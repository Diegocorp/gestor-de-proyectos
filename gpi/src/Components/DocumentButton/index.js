import React, { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import apis from "../../API";
import axios from "axios";
import Modal from "../Modal";

const DocumentButton = ({
  identifier,
  documentUploads,
  guestMode,
  setDocumentUploads,
  projectFileName,
  setDataObject,
  savedFiles,
}) => {
  let { id } = useParams();
  const [modal, setModal] = useState(false);

  const fileChanged = (e) => {
    let file = e.target.files[0];
    setDocumentUploads((prev) => ({
      ...prev,
      [identifier]: file,
    }));
    setDataObject((prev) => ({
      ...prev,
      projectFileName: {
        ...prev.projectFileName,
        [identifier]: file.name,
      },
    }));
  };

  const downloadFile = () => {
    const payload = {
      _id: id,
      projectFileName: projectFileName[identifier],
    };
    try {
      apis.downloadDocument(payload).then((response) => {
        axios
          .get(`${response.data}`, {
            responseType: "blob",
          })
          .then((response) => {
            const url = window.URL.createObjectURL(
              new Blob([response.data], {
                type: response.headers["content-type"],
              })
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", projectFileName[identifier]);
            document.body.appendChild(link);
            link.click();
          });
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-1 mb-1" id={`${identifier}__parent`}>
      <input
        type="file"
        style={{ display: "none" }}
        id={identifier}
        name="hiddenFile"
        onChange={fileChanged}
        files={documentUploads[`${identifier}`]}
      />
      <span id="file__span-container">
        <button
          id="fileBtnDrop"
          type="button"
          className="btn btn-outline-primary dropdown-toggle dropdown-toggle-split"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="font-weight-bolder">
            {
              <u>
                {savedFiles[`${identifier}`] ||
                  documentUploads[`${identifier}`].name}
              </u>
            }
          </span>
          <span>•••</span>
        </button>
        <span className="dropdown-menu dropdown-menu-right">
          {documentUploads[identifier] ? (
            <span></span>
          ) : (
            <span>
              {/* eslint-disable-next-line */}
              <a className="dropdown-item" href="#" onClick={downloadFile}>
                <div className="pl-1">
                  <FontAwesomeIcon className="w-25 mr-1" icon={faDownload} />
                  <span className="pr-3 w-50 text-left">Descargar</span>
                </div>
              </a>
            </span>
          )}

          {!guestMode ? (
            <>
              {/* eslint-disable-next-line */}
              <a
                className="dropdown-item"
                href="#"
                onClick={() => setModal(true)}
              >
                <div className="pl-1">
                  <FontAwesomeIcon className="w-25 mr-1" icon={faTrash} />
                  <span className="pr-3 w-50 text-left">Borrar</span>
                </div>
              </a>
            </>
          ) : (
            <div></div>
          )}
        </span>
      </span>
      <Modal
        identifier={identifier}
        modal={modal}
        setModal={setModal}
        projectFileName={projectFileName}
        documentUploads={documentUploads}
        setDocumentUploads={setDocumentUploads}
        setDataObject={setDataObject}
      ></Modal>
    </div>
  );
};

export default DocumentButton;
