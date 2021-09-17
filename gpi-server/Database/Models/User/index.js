const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newUserSchema = new Schema({
  userName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: false,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  academy: {
    type: String,
    required: false,
  },
  employeeNumber: {
    type: Number,
    required: false,
    unique: false,
  },
  password: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", newUserSchema);
module.exports = User;
