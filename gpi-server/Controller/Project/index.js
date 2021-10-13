const { response } = require("express");
const Project = require("../../Database/Models/Project");

createProject = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(404).json({
      success: false,
      error: "Se debe ingresar un proyecto.",
    });
  }

  const project = new Project(body);

  if (!project) {
    return res.status(404).json({ status: false, error: err });
  }

  project
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: project._id,
        message: "Project creado.",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Proyecto no creado.",
      });
    });
};

updateProject = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Debes proveer un body que actualizar.",
    });
  }

  await Project.findOne({ _id: req.params.id }, (err, project) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Proyecto no encontrado",
      });
    }

    project.proyectName = body.proyectName;
    project.releaseDate = body.releaseDate;
    project.startDate = body.startDate;
    project.conclusionDate = body.conclusionDate;
    project.typeProyect = body.typeProyect;
    project.objectiveProject = body.objectiveProject;
    project.statusProject = body.statusProject;
    project.projectComment = body.projectComment;
    project.enterpriseProject = body.enterpriseProject;
    project.enterpriseContact = body.enterpriseContact;
    project.firstNameContact = body.firstNameContact;
    project.lastNameContact = body.lastNameContact;
    project.studentMember = body.studentMember;
    project.teacherMember = body.teacherMember;
    project.projectFileName = body.projectFileName;
    project.creatorID = body.creatorID;

    project
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: project._id,
          message: "Proyect actualizado!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Proyecto actualizado!",
        });
      });
  });
};

deleteProject = async (req, res) => {
  await Project.findOneAndDelete({ _id: req.params.id }, (err, project) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: `Proyecto no fue encontrado` });
    }
    return res.status(200).json({ success: true, data: project });
  }).catch((err) => console.log(err));
};

getProjectById = async (req, res) => {
  await Project.findOne({ _id: req.params.id }, (err, project) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: "Proyecto no fue encontrado" });
    }
    return res.status(200).json({ success: true, data: project });
  }).catch((err) => console.log(err));
};

getProjectsByCreator = async (req, res) => {
  await Project.find({ creatorID: req.params.creatorID }, (err, projects) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!projects.length) {
      return res
        .status(404)
        .json({ success: false, error: "Proyectos no fueron encontrados" });
    }
    return res.status(200).json({ success: true, data: projects });
  }).catch((err) => console.log(err));
};

getProjects = async (req, res) => {
  await Project.find({}, (err, projects) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!projects.length) {
      return res
        .status(404)
        .json({ success: false, error: "Proyectos no fueron encontrado" });
    }
    return res.status(200).json({ success: true, data: projects });
  }).catch((err) => console.log(err));
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
  getProjects,
  getProjectsByCreator,
};
