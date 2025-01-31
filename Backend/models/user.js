const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  status: Boolean,
  image: String,
  list:[{
    _id: false,
    name: String,
    songs:[]
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
