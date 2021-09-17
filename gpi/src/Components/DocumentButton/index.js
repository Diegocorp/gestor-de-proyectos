import React, { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash, faCopy } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import apis from "../../API";
import axios from "axios";
import Modal from "../Modal";

const DocumentButton = ({
  documentUpload,
  guestMode,
  setDocumentUpload,
  selectFile,
  projectFileName,
  setDataObject,
}) => {
  let { id } = useParams();
  const [modal, setModal] = useState(false);

  const downloadFile = () => {
    const payload = {
      _id: id,
      projectFileName: projectFileName,
    };
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
  };

  return (
    <span className="ml-3">
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
            <u>{projectFileName || documentUpload.name}</u>
          </span>
          <span>•••</span>
        </button>
        <span className="dropdown-menu dropdown-menu-right">
          {!guestMode ? (
            <>
              {/* eslint-disable-next-line */}
              <a className="dropdown-item" href="#" onClick={selectFile}>
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
          {/* eslint-disable-next-line */}
          <a className="dropdown-item" href="#" onClick={downloadFile}>
            <div className="pl-1">
              <FontAwesomeIcon className="w-25 mr-1" icon={faDownload} />
              <span className="pr-3 w-50 text-left">Descargar</span>
            </div>
          </a>
        </span>
      </span>
      <Modal
        modal={modal}
        setModal={setModal}
        setDocumentUpload={setDocumentUpload}
        setDataObject={setDataObject}
      ></Modal>
    </span>
  );
};

export default DocumentButton;
