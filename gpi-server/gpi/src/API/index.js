import axios from "axios";
import { store } from "react-notifications-component";
const dotenv = require("dotenv");
dotenv.config();

const api = axios.create({
  baseURL: process.env.PORT || "http://localhost:1818",
});

//User API Requests
export const getUsers = (payload) =>
  api.get("/users", payload).catch((error) => {
    // handle error
    console.log(error);
  });
export const createUser = (payload) =>
  api.post("/users", payload).catch((error) => {
    // handle error
    console.log(error);
  });
export const getUserByEmail = (payload) =>
  api
    .get(`/user/${payload.email}`, payload)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // handle error
    });
export const login = (payload) =>
  api
    .post("/login", payload)
    .then((response) => {
      localStorage.setItem("ACCESS_TOKEN", response.data.token);
    })
    .catch((error) => {
      store.addNotification({
        title: "Datos de inicio de sesion incorrectos",
        message:
          "Favor de introducir el correo y contraseña correctos para este usuario",
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
export const updateUser = (payload) =>
  api
    .put(`/user/${payload._id}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });

//Projects API Requests
export const getProjects = (payload) =>
  api
    .get("/projects", payload)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
export const getProjectById = (payload) =>
  api
    .get(`/project/${payload.id}`, payload)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
export const postProject = (payload) =>
  api
    .post("/project", payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
export const putProject = (payload) =>
  api
    .put(`/project/${payload._id}`, payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
export const deleteProject = (payload) =>
  api
    .delete(`/project/${payload.id}`, payload)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
export const getProjectsByCreator = (payload) =>
  api
    .get(`/projects/${payload.creatorID}`, payload)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });

//Image upload AWS S3
export const postFile = (payload) =>
  api
    .post(`/upload/users/pictures/`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
//Get image url from AWS S3
export const getFile = (payload) =>
  api
    .get(`/upload/users/pictures/${payload.fileName}`, payload)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
//Document upload AWS S3
export const postDocument = (payload) =>
  api
    .post(`/upload/projects/${payload.id}`, payload.formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
//Get document url from AWS S3
export const getDocument = (payload) =>
  api
    .get(`/upload/projects/${payload._id}/${payload.projectFileName}`, payload)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
export const downloadDocument = (payload) =>
  api
    .get(`/upload/projects/${payload._id}/${payload.projectFileName}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
export const deleteDocument = (payload) =>
  api
    .delete(
      `/upload/projects/${payload._id}/${payload.projectFileName}`,
      payload
    )
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
export const deleteDirectory = (payload) =>
  api
    .delete(`/upload/projects/${payload.id}`, payload)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });

const apis = {
  getUsers,
  createUser,
  updateUser,
  getUserByEmail,
  login,
  getProjects,
  getProjectById,
  getProjectsByCreator,
  postFile,
  getFile,
  postProject,
  putProject,
  deleteProject,
  postDocument,
  getDocument,
  downloadDocument,
  deleteDocument,
  deleteDirectory,
};

export default apis;
