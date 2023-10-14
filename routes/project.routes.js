const router = require("express").Router();

const Project = require("../models/Project.model");

// CREATE PROJECT
router.post("/", (req, res, next) => {
  const { title, description } = req.body;

  Project.create({ title, description, tasks: [] })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.json(err));
});

// READ PROJECTS
router.get("/", (req, res, next) => {
  Project.find()
    .populate("tasks")
    .then((allProjects) => {
      res.json(allProjects);
    })
    .catch((err) => res.json(err));
});

router.get("/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  Project.findById(projectId)
    .populate("tasks")
    .then((project) => {
      res.json(project);
    })
    .catch((err) => res.json(err));
});

// UPDATE PROJECT
router.put("/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  Project.findByIdAndUpdate(projectId, req.body, { new: true })
    .then((updatedProject) => {
      res.json(updatedProject);
    })
    .catch((err) => res.json(err));
});

// DELETE PROJECT
router.delete("/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  Project.findByIdAndRemove(projectId)
    .then(() => {
      res.json({ message: "Se ha eliminado el proyecto correctamente." });
    })
    .catch((err) => res.json(err));
});

module.exports = router;
