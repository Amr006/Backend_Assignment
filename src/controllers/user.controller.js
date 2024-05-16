const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
async function getAllUsers(req, res) {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const search = req.query.search;

  try {
    console.log(search);
    const users = await User.find({
      $or: [
        { firstName: { $regex: new RegExp(search, 'i') } },
        { lastName:  { $regex: new RegExp(search, 'i') } },
        { email:  { $regex: new RegExp(search, 'i') } },
      ]
    }).limit(limit)
    .skip((limit * page || 0)).select("-password").sort({ createdAt: -1 });
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getUserById(request, res) {
  try {
    const user = await User.findById(request.params.id, "-password");
    if(!user){
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createUser(req, res) {
  try {
    const user = new User(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    const result = await user.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if(!user){
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send("");
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
