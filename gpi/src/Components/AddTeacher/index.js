import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { GuestContext } from "../../Utils/GuestContext";
import { ProjectContext } from "../../Utils/ProjectContext";
import { UserContext } from "../../Utils/UserContext";

const AddTeacher = ({
  handleAdd,
  handleDelete,
  trigger,
  dataKey,
  dataObject,
  index,
  setDataObject,
  addTeacher,
}) => {
  const [textFields, setTextFields] = useState({
    nameTeacher: "",
    idTeacher: "",
    subject: "",
  });
  const { guest } = useContext(GuestContext);
  const { project } = useContext(ProjectContext);
  const { user } = useContext(UserContext);
  const classAdd = "btn btn-success btn-student";
  const classRemove = "btn btn-danger btn-student";

  const handleType = (e) => {
    const { id, value } = e.target;
    setTextFields((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (dataObject.teacherMember) {
      let teacherList = dataObject.teacherMember;
      teacherList[index] = [
        textFields.nameTeacher,
        textFields.idTeacher,
        textFields.subject,
      ];
      setDataObject((prevState) => ({
        ...prevState,
        teacherMember: teacherList,
      }));
    }
  }, [textFields, setDataObject, dataObject.teacherMember, index]);

  useEffect(() => {
    if (addTeacher[index][0]) {
      setTextFields((prevState) => ({
        nameTeacher: addTeacher[index][0][0],
        idTeacher: addTeacher[index][0][1],
        subject: addTeacher[index][0][2],
      }));
    }
  }, [addTeacher, index]);

  const addRemove = (e) => {
    if (trigger) {
      handleAdd(Math.floor(Math.random() * 1000));
    } else {
      handleDelete(dataKey);
      let copyData = dataObject.teacherMember;
      copyData = copyData.splice(index, 1);
      setDataObject((prevState) => ({
        ...prevState,
        teacherMember: copyData,
      }));
    }
  };

  const detectEnable = () => {
    if (guest) {
      return true;
    }
    if (project.creatorID === undefined) {
      return false;
    }
    if (user.employeeNumber.toString() !== project.creatorID.toString()) {
      return true;
    }
    return false;
  };

  return (
    <div className="entry-teacher input-group">
      <div className="form-row" style={{ width: "100%" }}>
        <div className="col-sm">
          <div className="form-group">
            <label htmlFor="city">
              <strong>Nombre del Maestro Participante</strong>
              <br />
            </label>
            <input
              id="nameTeacher"
              value={textFields.nameTeacher}
              onChange={handleType}
              required={true}
              className="border rounded form-control teacherName"
              type="text"
              placeholder="Nombre del maestro"
              name="city"
              readOnly={detectEnable()}
            />
          </div>
        </div>
        <div className="col-sm">
          <div className="form-group">
            <label htmlFor="city">
              <strong>Numero de Empleado</strong>
            </label>
            <input
              id="idTeacher"
              value={textFields.idTeacher}
              onChange={handleType}
              required={true}
              className="form-control teacherId"
              type="text"
              placeholder="Número de empleado"
              name="city"
              readOnly={detectEnable()}
            />
          </div>
        </div>
        <div className="col-sm">
          <div className="form-group">
            <label htmlFor="city">
              <strong>Materia del Maestro</strong>
              <br />
            </label>
            <input
              id="subject"
              value={textFields.subject}
              onChange={handleType}
              required={true}
              className="border rounded form-control teacherSubject"
              type="text"
              placeholder="Materia"
              name="city"
              readOnly={detectEnable()}
            />
          </div>
        </div>
        <div className="col-sm">
          <div className="form-group">
            <div className="input-group-btn" style={{ marginTop: "1.5em" }}>
              {guest ? null : (
                <button
                  className={trigger ? classAdd : classRemove}
                  type="button"
                  disabled={detectEnable()}
                  onClick={addRemove}
                >
                  {trigger ? (
                    <FontAwesomeIcon icon={faPlus} />
                  ) : (
                    <FontAwesomeIcon icon={faMinus} />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
