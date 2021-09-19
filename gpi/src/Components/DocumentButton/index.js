import React, { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash, faCopy } from "@fortawesome/free-solid-svg-icons";
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
}) => {
  let { id } = useParams();
  const [modal, setModal] = useState(false);

  const selectFile = (id) => {
    document.querySelector(`#${id}`).click();
  };

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
      projectFileName: projectFileName,
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
            link.setAttribute("download", projectFileName);
            document.body.appendChild(link);
            link.click();
          });
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <span className="ml-3">
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
          className="w-25 btn btn-outline-primary dropdown-toggle dropdown-toggle-split"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="font-weight-bolder">
            {
              <u>
                {projectFileName[identifier] ||
                  documentUploads[identifier].name}
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
                onClick={() => selectFile(identifier)}
              >
                <div className="pl-1">
                  <FontAwesomeIcon className="w-25 mr-1" icon={faCopy} />
                  <span className="pr-3 w-50 text-left">Reemplazar</span>
                </div>
              </a>
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
    </span>
  );
};

export default DocumentButton;
