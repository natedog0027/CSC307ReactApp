import mongoose from "mongoose";


// Sets up the users schema, which is the mongo database document framework for the list of users documents
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes white space from both sides of the string 
    },
    job: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error("Invalid job, must be at least 2 characters.");
      },
    },
  },
  { collection: "users_list" }
);

export default mongoose.model("User", UserSchema);