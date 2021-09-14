const { response } = require("express");
const Project = require("../../Database/Models/Project");
const User = require("../../Database/Models/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

createUser = async (req, res) => {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    academy: req.body.academy,
    employeeNumber: req.body.employeeNumber,
    password: req.body.password,
  });

  if (!user) {
    return res.status(404).json({ status: false, error: err });
  }

  await user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: "User created.",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "User not created. Data received: ",
        user,
      });
    });
};

updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update.",
    });
  }

  await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Usuario no encontrado",
      });
    }

    user.userName = body.userName;
    user.email = body.email;
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.academy = body.academy;
    user.employeeNumber = body.employeeNumber;
    user.password = body.password;
    user.image = body.image;

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "User updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "User not updated",
        });
      });
  });
};

deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

getUserByEmail = async (req, res) => {
  await User.findOne({ email: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

getUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users.length) {
      return res
        .status(400)
        .json({ success: false, error: "Project not found" });
    }
    return res.status(200).json({ success: true, data: users });
  }).catch((err) => console.log(err));
};

login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email }).catch((err) => console.log(err));

    if (!user) {
      return res.status(400).json({
        message: "Usuario no existe...",
      });
    }

    //Use bcrypt compare when transitioning to encryption
    if (password !== user.password) {
      return res.status(400).json({
        message: "Error in el ingreso de usuario!",
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 100000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error en guardar");
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUsers,
  login,
};
