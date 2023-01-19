const router = require("express").Router();

//preluarea modulului proiect
const Project = require("../modules/project");

router.use("/MP", require("./ProjectRoutes/MP"));

//ruta pentru obtinerea tuturor proiectelor
router.route("/all").get(async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    if (projects) {
      res.status(200).json({ projects });
    } else {
      res.status(404).json({ message: "Nu exista proiecte!" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
