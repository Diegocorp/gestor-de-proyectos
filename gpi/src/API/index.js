import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1818'
});

//User API Requests
export const getUsers = payload => api.get('/users', payload);
export const createUser = payload => api.post('/users', payload);
export const getUserByEmail = payload => api.get(`/user/${payload.email}`, payload).then(response => { return response.data.data; })
export const login = payload => api.post('/login', payload).then(response => {
  localStorage.setItem("ACCESS_TOKEN", response.data.token);
})
export const updateUser = payload => api.put(`/user/${payload._id}`, payload).then(response => { return response.data })

//Projects API Requests
export const getProjects = payload => api.get('/projects', payload).then(response => { return response.data.data });
export const getProjectById = payload => api.get(`/project/${payload.id}`, payload).then(response => { return response.data.data });
export const postProject = payload => api.post('/project', payload).then(response => {return response});
export const putProject = payload => api.put(`/project/${payload._id}`, payload).then(response => {return response}); 

//Image upload AWS S3
export const postFile = payload => api.post(`/upload/users/pictures/`, payload, { headers: {'Content-Type':'multipart/form-data'}});
//Get image url from AWS S3
export const getFile = payload => api.get(`/upload/users/pictures/${payload.fileName}`, payload).then(response => { return response.data.data });

//Document upload AWS S3
export const postDocument = payload => api.post(`/upload/projects/${payload.id}`, payload.formData, { headers: {'Content-Type':'multipart/form-data'} });
//Get document url from AWS S3
export const getDocument = payload => api.get(`/upload/projects/${payload._id}/${payload.fileName}`, payload).then(response => { return response.data.data});

const apis = {
  getUsers,
  createUser,
  getUserByEmail,
  login, 
  getProjects,
  getProjectById,
  postFile,
  updateUser,
  getFile,
  postProject,
  putProject,
  postDocument,
  getDocument
};

export default apis;