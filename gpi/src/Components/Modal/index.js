import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({modal, setModal, setDocumentUpload, setDataObject}) => {

  const confirmDelete = (e) => {
    e.preventDefault();
    setDocumentUpload(new File([""], ""))
    setDataObject((prev) => ({
      ...prev,
      projectFileName: ""
    }))
    setModal(false);
  }

  return (
    <div id="myModal" className="modal" style={modal ? {display: 'block'} : {display: 'none'}}>
      <div className="modal-content d-flex flex-column p-0">
        <div className="card-header py-3">
          <div className="pr-2">
            <span className="close-btn text-right h-100" onClick={() => setModal(false)}>
              <FontAwesomeIcon icon={faTimes}/> 
            </span>
          </div> 
          <div className="text-primary m-0 font-weight-bold">
            <div>Borrar Archivo</div>
          </div>          
        </div>
        <div className="px-4">
          <p className="">Esta seguro que quiere borrar el archivo?</p>
          <div className="w-100 d-flex justify-content-between mb-2">
            <button 
              className="btn btn-outline-primary" 
              onClick={(e) => {
                e.preventDefault();
                setModal(false)
              }}
            >Cancelar</button>
            <button 
              className="btn btn-outline-danger"
              onClick={confirmDelete}
            >Borrar</button>
          </div>
        </div>               
        
      </div>
    </div>
  );
};

export default Modal;