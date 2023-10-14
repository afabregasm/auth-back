const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let projectSchema = new Schema({
  title: String,
  description: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
