import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    userid: {
      type: String,
      require: true,
    },
    task: {
      type: Array,
      require: true,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("taskData", taskSchema);
