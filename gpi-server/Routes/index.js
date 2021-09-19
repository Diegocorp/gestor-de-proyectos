const express = require("express");
const ProjectCtrl = require("../Controller/Project");
const UserCtrl = require("../Controller/User");
const User = require("../Database/Models/User");
const AWS = require("../Controller/AWS");
const router = express.Router();
const auth = require("../Middleware/Auth");

//Route for projects
router.post("/project", ProjectCtrl.createProject);
router.put("/project/:id", ProjectCtrl.updateProject);
router.delete("/project/:id", ProjectCtrl.deleteProject);
router.get("/project/:id", ProjectCtrl.getProjectById);
router.get("/projects", ProjectCtrl.getProjects);
router.get("/projects/:creatorID", ProjectCtrl.getProjectsByCreator);

//Route for users
router.post("/users", UserCtrl.createUser);
router.put("/user/:id", UserCtrl.updateUser);
router.delete("/user/:id", UserCtrl.deleteUser);
router.get("/user/:id", UserCtrl.getUserByEmail);
router.get("/users", UserCtrl.getUsers);

//Login process
router.post("/login", UserCtrl.login);
router.get("/:userName", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error en Fetching del usuario..." });
  }
});
//user profile image upload and fetch
router.post(
  "/upload/users/pictures/",
  AWS.uploadImage.array("image", 1),
  async (req, res) => {
    console.log("Successfully uploaded!");
  }
);
router.get("/upload/users/pictures/:fileName", AWS.getImage);

//Project file upload, fetch & delete
router.post(
  "/upload/projects/:id",
  AWS.uploadDocument.array("document[]"),
  async (req, res) => {
    console.log("Project file uploaded!");
  }
);
router.get("/upload/projects/:id/:fileName", AWS.getDocument);
router.delete("/upload/projects/:id/:fileName", AWS.deleteDocument);
router.delete("/upload/projects/:id", AWS.deleteDirectory);

module.exports = router;
