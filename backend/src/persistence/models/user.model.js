import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({  
    name: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
      type: String,
      required: true,
    },
  password: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  lastConnection: {
    type: String,
    required: false,
  },
});

export const userModel = mongoose.model("Users", usersSchema);
