import React, { useContext, useState } from "react";
import { UserContext } from "../../Utils/UserContext";
import "./styles.css";
import apis from "../../API";

const UserPage = (props) => {
  // obtener setUser de UserContext
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState(user);
  const [file, setFile] = useState({
    file: null,
  });

  //Gestionar el evento de los cambios a los datos de usuario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  //Gestionar el cambio al ingreso del foto de perfil del usuario
  const handleFileChange = (e) => {
    const filed = document.querySelector("input[type=file]").files[0];
    setFile({ file: filed });
    setUserData((prevState) => ({
      ...prevState,
      image: `IMAGE-${userData._id}`,
      imageURL: URL.createObjectURL(filed),
    }));

    const preview = document.querySelector("#preview");
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        // convertir el archivo de imagen a base64 string
        preview.src = reader.result;
      },
      false
    );
    if (filed) {
      reader.readAsDataURL(filed);
    }
  };

  //gestion del boton de subir los cambios de los datos a la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      apis.updateUser(userData);
      //subir imagen al bucket de s3
      const formData = new FormData();
      formData.append("imageName", userData.image);
      formData.append("image", file.file);
      apis.postFile(formData);
      const picture = await apis.getFile({ fileName: userData.image });
      setUserData((prev) => ({
        ...prev,
        imageURL: `${picture}#t=${performance.now()}`,
      }));
      setUser(userData);
      alert("Los cambios se guardaron con exito!");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container-fluid text-left">
      <h3 className="text-dark mb-4">Perfil</h3>
      <div className="row mb-3">
        <form
          className="needs-validation w-100 d-flex"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="col-lg-4">
            <div className="card shadow mb-3">
              <div className="card-header py-3">
                <p className="text-primary m-0 font-weight-bold">
                  Imágen de perfil
                </p>
              </div>
              <div className="card-body text-center shadow">
                <img
                  id="preview"
                  className="rounded-circle mb-3 mt-4"
                  src={user.imageURL}
                  width="160"
                  height="160"
                  alt="user profile"
                />
                <div className="mb-3">
                  <input type="file" name="image" onChange={handleFileChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="row">
              <div className="col">
                <div className="card shadow mb-3">
                  <div className="card-header py-3">
                    <p className="text-primary m-0 font-weight-bold">
                      Configuracion de Usuario
                    </p>
                  </div>
                  <div className="card-body">
                    <div className="form-row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="username">
                            <strong>Nombre de Usuario</strong>
                          </label>
                          <input
                            required={true}
                            value={userData.userName}
                            id="userName"
                            onChange={handleChange}
                            className="form-control"
                            type="text"
                            placeholder="Nombre de Usuario"
                            name="username"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="email">
                            <strong>Correo Electronico</strong>
                          </label>
                          <input
                            required={true}
                            value={userData.email}
                            id="email"
                            onChange={handleChange}
                            className="form-control"
                            type="email"
                            placeholder="Correo Electronico"
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
                            required={true}
                            value={userData.firstName}
                            id="firstName"
                            onChange={handleChange}
                            className="form-control"
                            type="text"
                            placeholder="Nombre(s)"
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
                            required={true}
                            value={userData.lastName}
                            id="lastName"
                            onChange={handleChange}
                            className="form-control"
                            type="text"
                            placeholder="Apellido(s)"
                            name="last_name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="address">
                        <strong>Academia</strong>
                      </label>
                      <input
                        required={true}
                        value={userData.academy}
                        id="academy"
                        onChange={handleChange}
                        className="form-control"
                        type="text"
                        placeholder="Academia"
                        name="address"
                      />
                    </div>
                    <div className="form-row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="city">
                            <strong>Numero de Empleado</strong>
                          </label>
                          <input
                            disabled
                            required={true}
                            value={userData.employeeNumber}
                            id="employeeNumber"
                            onChange={handleChange}
                            className="form-control"
                            type="text"
                            placeholder="Numero de Empleado"
                            name="city"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        id="profileBtn"
                        className="btn btn-primary text-capitalize font-weight-bold"
                        type="submit"
                      >
                        Guardar Configuracion
                      </button>
                      <button className="btn text-capitalize btn-purple font-weight-bold">
                        Cambiar contraseña
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="card shadow mb-5"></div>
    </div>
  );
};

export default UserPage;
