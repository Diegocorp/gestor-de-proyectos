import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import apis from "../../API";

const RegisterForm = (props) => {
  const [state, setState] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    academy: "",
    employeeNumber: "",
    password: "",
  });

  const handleClick = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        userName: state.userName,
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
        academy: state.academy,
        employeeNumber: state.employeeNumber,
        password: state.password,
      };
      // Search for token
      console.log(payload);
      apis.createUser(payload);
    } catch (error) {
      alert("Error en el ingreso de los datos de usuario...");
    }
  };

  return (
    <div className="col-lg-7">
      <div className="p-4">
        <div className="text-center">
          <h4 className="text-dark mb-4">Registro</h4>
        </div>
        <form className="needs-validation" noValidate>
          <div className="form-group">
            <input
              required={true}
              className="form-control form-control-user rounded-pill"
              type="text"
              id="userName"
              value={state.userName}
              onChange={handleClick}
              placeholder="Nombre de usuario..."
              name="userName"
            />
          </div>
          <div className="form-group row">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <input
                required={true}
                className="form-control form-control-user rounded-pill"
                type="text"
                id="firstName"
                value={state.firstName}
                onChange={handleClick}
                placeholder="Nombre(s)..."
                name="first_name"
              />
            </div>
            <div className="col-sm-6">
              <input
                required={true}
                className="form-control form-control-user rounded-pill"
                type="text"
                id="lastName"
                value={state.lastName}
                onChange={handleClick}
                placeholder="Apellido(s)"
                name="last_name"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <input
                required={true}
                className="form-control form-control-user rounded-pill"
                type="text"
                id="academy"
                value={state.academy}
                onChange={handleClick}
                placeholder="Academia"
                name="first_name"
              />
            </div>
            <div className="col-sm-6">
              <input
                required={true}
                className="form-control form-control-user rounded-pill"
                type="text"
                id="employeeNumber"
                value={state.employeeNumber}
                onChange={handleClick}
                placeholder="Numero de empleado"
                name="last_name"
              />
            </div>
          </div>
          <div className="form-group">
            <input
              required={true}
              className="form-control form-control-user rounded-pill"
              type="email"
              id="email"
              value={state.email}
              onChange={handleClick}
              aria-describedby="emailHelp"
              placeholder="Correo Electronico"
              name="email"
            />
          </div>
          <div className="form-group row">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <input
                required={true}
                className="form-control form-control-user rounded-pill"
                type="password"
                value={state.password}
                onChange={handleClick}
                id="password"
                placeholder="Contraseña"
                name="password"
              />
            </div>
            <div className="col-sm-6">
              <input
                required={true}
                className="form-control form-control-user rounded-pill"
                type="password"
                id="repeatPassword"
                placeholder="Repetir Contraseña"
                name="password_repeat"
              />
            </div>
          </div>
          <input
            required={true}
            className="form-control form-control-user rounded-pill"
            type="text"
            id="securityCode"
            aria-describedby="emailHelp"
            placeholder="Codigo de seguridad"
            name="email"
          />
          <hr />
          <button
            className="btn btn-primary btn-block text-white btn-user rounded-pill py-2"
            id="registerBtn"
            type="submit"
            onClick={handleSubmitClick}
          >
            Registrar cuenta
          </button>
        </form>
        <div className="text-center"></div>
        <br />
        <div className="text-center">
          <div>
            <Link className="small" to="/forgot">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div>
            <Link className="small" to="/login">
              ¿Ya tienes una cuenta? Inicia sesion!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RegisterForm);
