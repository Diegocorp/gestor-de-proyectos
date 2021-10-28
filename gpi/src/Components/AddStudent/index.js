import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { GuestContext } from "../../Utils/GuestContext";
import { UserContext } from "../../Utils/UserContext";
import { ProjectContext } from "../../Utils/ProjectContext";

const AddStudent = ({
  handleAdd,
  handleDelete,
  trigger,
  dataKey,
  dataObject,
  index,
  setDataObject,
  addStudent,
}) => {
  const [textFields, setTextFields] = useState({
    studentName: "",
    studentID: "",
  });
  const { guest } = useContext(GuestContext);
  const { user } = useContext(UserContext);
  const { project } = useContext(ProjectContext);
  const classAdd = "btn btn-success btn-student";
  const classRemove = "btn btn-danger btn-student";
  let studentList;
  const handleType = (e) => {
    const { id, value } = e.target;
    setTextFields((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (dataObject.studentMember) {
      studentList = dataObject.studentMember;
      studentList[index] = [textFields.studentName, textFields.studentID];
    }
  }, [textFields, setDataObject, dataObject.studentMember, index]);

  // Fills component text fields with data if data exists
  useEffect(() => {
    if (addStudent[index] !== undefined) {
      if (addStudent[index][0] !== undefined) {
        setTextFields((prevState) => ({
          studentName: addStudent[index][0][0],
          studentID: addStudent[index][0][1],
        }));
      }
    }
  }, [addStudent, index]);

  const addRemove = (e) => {
    if (trigger) {
      handleAdd(Math.floor(Math.random() * 1000));
    } else {
      handleDelete(addStudent[index]);
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
    <div className="entry-student input-group">
      <div className="form-row" style={{ width: "100%" }}>
        <div className="col-sm">
          <div className="form-group">
            <label htmlFor="studentName">
              <strong>Alumno Participante</strong>
            </label>
            <input
              name="studentName"
              id="studentName"
              value={textFields.studentName}
              onChange={handleType}
              required={true}
              className="border rounded form-control studentName"
              type="text"
              placeholder="Nombre del alumno"
              readOnly={detectEnable()}
            />
          </div>
        </div>
        <div className="col-sm">
          <div className="form-group">
            <label htmlFor="studentID">
              <strong>Número de Control</strong>
            </label>
            <input
              name="studentID"
              pattern="[0-9]+"
              id="studentID"
              value={textFields.studentID}
              onChange={handleType}
              required={true}
              className="form-control studentId"
              type="text"
              placeholder="Número de control"
              readOnly={detectEnable()}
            />
          </div>
        </div>
        <div className="col-sm pt-0 pt-md-2" style={{ maxWidth: "50px" }}>
          <div className="form-group h-100">
            <div className="input-group-btn h-100 mb-5 mb-md-0 mt-md-4">
              {guest ? null : trigger ? (
                <button
                  className={classAdd}
                  type="button"
                  disabled={detectEnable()}
                  onClick={addRemove}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              ) : (
                <button
                  className={classRemove}
                  type="button"
                  disabled={detectEnable()}
                  onClick={addRemove}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
