import mongoose from "mongoose";
import userModel from "./users.js";

// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);

// This function connects this project to the database at the (localhost:port) 127.0.0.1:27017 location
mongoose
  .connect("mongodb://127.0.0.1:27017/users", {
    // useNewUrlParser and useUnifiedTopology are set to true. Only change if connection to database issues occur
    useNewUrlParser: true, //If deprecated and new parser is bad, allows fall back on the old parser if set to false. (Requires specified port)
    useUnifiedTopology: true, // Set to true to use new Mongo connection management updates
  })
  .catch((error) => console.log(error));

/* This function is used to get the list of users from the database. You can either request all items by not
inputting anything into the name and job parameters, or request users by name and/or job */
async function getUsers(name, job) {
  let result;
  if (name === undefined && job === undefined) {
    result = await userModel.find();
  } else if (name && !job) {
    result = await findUserByName(name);
  } else if (job && !name) {
    result = await findUserByJob(job);
  } else if (job && name) {
    result = await findUserByNameAndJob(name, job);
  }
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteUser(id) {
  try {
    const result = await userModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByName(name) {
  return await userModel.find({ name: name });
}

async function findUserByJob(job) {
  return await userModel.find({ job: job });
}

async function findUserByNameAndJob(name, job) {
  return await userModel.find({ name: name, job: job });
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  deleteUser,
};