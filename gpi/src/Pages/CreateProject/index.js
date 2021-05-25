import React, { useState, useEffect } from "react";
import "./styles.css";
import AddStudent from "../../Components/AddStudent";
import AddTeacher from "../../Components/AddTeacher";
import apis from "../../API";
import AddDoc from "../../Components/AddDoc";
import { useParams } from "react-router-dom";
//import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

const CreateProject = ({ title, projectData, guestMode, edit }) => {
  const [dataObject, setDataObject] = useState({
    proyectName: "",
    releaseDate: "",
    startDate: "",
    conclusionDate: "",
    typeProyect: "Desarrollo de software",
    objectiveProject: "Objetivo del proyecto",
    statusProject: "Cancelado",
    projectComment: "",
    enterpriseProject: "",
    enterpriseContact: "",
    firstNameContact: "",
    lastNameContact: "",
    studentMember: {},
    teacherMember: {},
    projectFileName: "",
  });

  useEffect(() => {
    if (projectData) {
      setDataObject(projectData);
      if (projectData.studentMember) {
        setAddStudent(
          Object.keys(projectData.studentMember).map((key) => [
            projectData.studentMember[key],
          ])
        );
      }
      if (projectData.teacherMember) {
        setAddTeacher(
          Object.keys(projectData.teacherMember).map((key) => [
            projectData.teacherMember[key],
          ])
        );
      }
    }
  }, [projectData]);

  const [addStudent, setAddStudent] = useState([]);
  const [addTeacher, setAddTeacher] = useState([]);
  const [documentUpload, setDocumentUpload] = useState(new File([""], ""));

  const handleType = (e) => {
    const { id, value } = e.target;
    setDataObject((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  function handleStudents(key) {
    setAddStudent((prevState) => [...prevState, key]);
  }

  function deleteStudent(key) {
    setAddStudent(addStudent.filter((item) => item !== key));
  }

  function handleTeachers(key) {
    setAddTeacher((prevState) => [...prevState, key]);
  }

  function deleteTeacher(key) {
    setAddTeacher(addTeacher.filter((item) => item !== key));
  }

  const onSubmit = async () => {
    try {
      if (!edit) {
        //Structure Document form data to upload file
        const formData = new FormData();
        formData.append("fileName", documentUpload.name);
        formData.append("document", documentUpload);
        setDataObject((prev) => ({
          ...prev,
          projectFileName: documentUpload.name,
        }));
        //project info upload to database

        apis
          .postProject(dataObject)
          .then((response) => {
            apis.postDocument({ id: response.data.id, formData });
          })
          .then(() => {
            store.addNotification({
              title: "Proyecto registrado con exito",
              message: "El proyecto se ha registrado con exito en la base de datos",
              type: "sucess",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3500,
                onScreen: true,
              },
            });
          });
      } else {
        await apis.putProject(dataObject).then(() => {
          store.addNotification({
            title: "Proyecto actualizado con exito",
            message: "El proyecto se ha actualizado con exito en la base de datos",
            type: "info",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3500,
              onScreen: true,
            },
          });
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete Project
  let { id } = useParams();

  const deleteProject = async () => {
    const payload = {
      id: id,
    };
    apis.deleteProject(payload).then((result) => {
      store.addNotification({
        title: "Proyecto eliminado",
        message: "El proyecto se ha eliminado con exito de la base de datos",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3500,
          onScreen: true,
        },
      });
    });
  };

  return (
    <div id="create-container" className="w-100 text-left">
      {console.log(projectData)}
      <div className="container-fluid"></div>
      <div className="d-sm-flex justify-content-between align-items-center">
        <h3 className="text-dark mb-0 pl-3">
          {title ? title : "Gestión de Proyecto"}
        </h3>
      </div>
      <div className="row" />
      <form
        className={`needs-validation ${guestMode ? "disabled" : ""}`}
        noValidate
      >
        <div className="col-xl-12 offset-xl-0">
          <div className="card shadow mb-3">
            <div className="card-header py-3">
              <p className="text-primary m-0 font-weight-bold">
                Datos del proyecto
              </p>
            </div>
            <div className="card-body">
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="username">
                      <strong>Nombre del proyecto</strong>
                    </label>
                    <input
                      id="proyectName"
                      value={dataObject.proyectName}
                      onChange={handleType}
                      required={true}
                      className="form-control"
                      type="text"
                      placeholder="Nombre del proyecto"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="email">
                      <strong>Fecha de liberacion</strong>
                    </label>
                    <input
                      id="releaseDate"
                      value={dataObject.releaseDate}
                      onChange={handleType}
                      required={true}
                      className="border rounded form-control"
                      type="date"
                      style={{
                        color: "rgb(110, 112, 126)",
                        padding: "6px 12px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="first_name">
                      <strong>Periodo de Inicio</strong>
                    </label>
                    <input
                      id="startDate"
                      value={dataObject.startDate}
                      onChange={handleType}
                      required={true}
                      className="border rounded form-control"
                      type="date"
                      style={{
                        color: "rgb(110, 112, 126)",
                        padding: "6px 12px",
                      }}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="last_name">
                      <strong>Periodo de conclusion</strong>
                    </label>
                    <input
                      id="conclusionDate"
                      value={dataObject.conclusionDate}
                      onChange={handleType}
                      required={true}
                      className="border rounded form-control"
                      type="date"
                      style={{
                        color: "rgb(110, 112, 126)",
                        padding: "6px 12px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="first_name">
                      <strong>Tipo de proyecto</strong>
                    </label>
                    <select
                      id="typeProyect"
                      value={dataObject.typeProyect}
                      onChange={handleType}
                      className="border rounded form-control"
                      style={{
                        color: "rgb(110, 112, 126)",
                        padding: "6px 12px",
                      }}
                    >
                      <optgroup label="Tipo de proyecto">
                        <option value="Desarrollo de software">
                          Desarrollo de software
                        </option>
                        <option value="Paquete tecnologico">
                          Paquete tecnologico
                        </option>
                        <option value="Servicio tecnologico">
                          Servicio tecnologico
                        </option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="first_name">
                      <strong>Objetivo del proyecto</strong>
                    </label>
                    <select
                      id="objectiveProject"
                      value={dataObject.objectiveProject}
                      onChange={handleType}
                      className="border rounded form-control"
                      style={{
                        color: "rgb(110, 112, 126)",
                        padding: "6px 12px",
                      }}
                    >
                      <optgroup label="Objetivo del proyecto">
                        <option value="Integrador">
                          Integrador
                        </option>
                        <option value="Titulacion">Titulacion</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="last_name">
                      <strong>Estatus del proyecto</strong>
                      <br />
                    </label>
                    <select
                      id="statusProject"
                      value={dataObject.statusProject}
                      onChange={handleType}
                      className="border rounded form-control"
                      style={{
                        color: "rgb(110, 112, 126)",
                        padding: "6px 12px",
                      }}
                    >
                      <optgroup label="Estatus del proyecto">
                        <option value="Cancelado">
                          Cancelado
                        </option>
                        <option value="En desarrollo">En desarrollo</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Implementado">Implementado</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="city">
                        <strong>Comentarios u Observaciones</strong>
                      </label>
                      <textarea
                        id="projectComment"
                        value={dataObject.projectComment}
                        onChange={handleType}
                        required={true}
                        className="border rounded form-control"
                        style={{
                          padding: "6px 12px",
                          color: "rgb(110, 112, 126)",
                          height: "100px",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col">
                      <div className="form-group">
                        <AddDoc
                          isDisabled={dataObject.projectFileName}
                          setDocumentUpload={setDocumentUpload}
                          documentUpload={documentUpload}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow mb-3">
            <div className="card-header py-3">
              <p className="text-primary m-0 font-weight-bold">
                Datos de la empresa
              </p>
            </div>
            <div className="card-body">
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="username">
                      <strong>Nombre de la empresa</strong>
                    </label>
                    <input
                      id="enterpriseProject"
                      value={dataObject.enterpriseProject}
                      onChange={handleType}
                      required={true}
                      className="form-control"
                      type="text"
                      placeholder="Nombre de la empresa"
                      name="username"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="email">
                      <strong>Correo electronico de la empresa</strong>
                      <br />
                    </label>
                    <input
                      id="enterpriseContact"
                      value={dataObject.enterpriseContact}
                      onChange={handleType}
                      required={true}
                      className="form-control"
                      type="email"
                      placeholder="ejemplo@ejemplo.com"
                      name="email"
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="first_name">
                      <strong>Nombre(s)</strong>
                    </label>
                    <input
                      id="firstNameContact"
                      value={dataObject.firstNameContact}
                      onChange={handleType}
                      required={true}
                      className="form-control"
                      type="text"
                      placeholder="Juan"
                      name="first_name"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="last_name">
                      <strong>Apellido(s)</strong>
                    </label>
                    <input
                      id="lastNameContact"
                      value={dataObject.lastNameContact}
                      onChange={handleType}
                      required={true}
                      className="form-control"
                      type="text"
                      placeholder="Perez"
                      name="last_name"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow">
            <div className="card-header py-3">
              <p className="text-primary m-0 font-weight-bold">
                Datos de los alumnos participantes
              </p>
            </div>
            <div className="card-body">
              <div className="dynamic-wrap-student">
                {addStudent.length === 0
                  ? setAddStudent((prevState) => [
                      ...prevState,
                      Math.floor(Math.random() * 1000),
                    ])
                  : null}
                {addStudent.map((value, index) => {
                  if (index === addStudent.length - 1) {
                    return (
                      <AddStudent
                        handleAdd={handleStudents}
                        handleDelete={deleteStudent}
                        trigger={true}
                        key={value}
                        dataKey={value}
                        dataObject={dataObject}
                        setDataObject={setDataObject}
                        index={index}
                        addStudent={addStudent}
                        guestMode={guestMode}
                      />
                    );
                  } else {
                    return (
                      <AddStudent
                        handleAdd={handleStudents}
                        handleDelete={deleteStudent}
                        trigger={false}
                        key={value}
                        dataKey={value}
                        dataObject={dataObject}
                        setDataObject={setDataObject}
                        index={index}
                        addStudent={addStudent}
                        guestMode={guestMode}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <div className="card shadow">
            <div className="card-header py-3">
              <p className="text-primary m-0 font-weight-bold">
                Datos de los maestros participantes
              </p>
            </div>
            <div className="card-body">
              <div className="dynamic-wrap-teacher">
                {addTeacher.length === 0
                  ? setAddTeacher((prevState) => [
                      ...prevState,
                      Math.floor(Math.random() * 1000),
                    ])
                  : null}
                {addTeacher.map((value, index) => {
                  if (index === addTeacher.length - 1) {
                    return (
                      <AddTeacher
                        handleAdd={handleTeachers}
                        handleDelete={deleteTeacher}
                        trigger={true}
                        key={value}
                        dataKey={value}
                        dataObject={dataObject}
                        setDataObject={setDataObject}
                        index={index}
                        addTeacher={addTeacher}
                        guestMode={guestMode}
                      />
                    );
                  } else {
                    return (
                      <AddTeacher
                        handleAdd={handleTeachers}
                        handleDelete={deleteTeacher}
                        trigger={false}
                        key={value}
                        dataKey={value}
                        dataObject={dataObject}
                        setDataObject={setDataObject}
                        index={index}
                        addTeacher={addTeacher}
                        guestMode={guestMode}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
          {guestMode ? null : (
            <div className="form-group">
              <button
                id="proyectBtn"
                className="btn btn-primary text-capitalize font-weight-bold"
                type="button"
                onClick={onSubmit}
              >
                Guardar datos
              </button>
              <button
                onClick={deleteProject}
                id="deleteBtn"
                className="btn btn-danger text-capitalize font-weight-bold"
                type="button"
              >
                Eliminar Proyecto
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
