const router = require("express").Router();
const Bug = require("../../modules/bug");
const User = require("../../modules/user");
const Project = require("../../modules/project");

// ruta pentru crearea unui bug
router.route("/create").post(async (req, res, next) => {
  try {
    const currentUser = await User.findOne({ where: { id: req.body.idTst } });
    if (currentUser === null) {
      res.status(400).json({ message: "Nu exista user care sa creeze bug-ul" });
    }
    const currentProject = await Project.findOne({
      where: { id: req.body.idProject },
    });
    if (currentProject === null) {
      res
        .status(400)
        .json({ message: "Nu exista proiect pentru care se creaza bug-ul" });
    }

    const bug = await Bug.create({
      severity: req.body.severity,
      priority: req.body.priority,
      description: req.body.description,
      link: req.body.link,
      idTst: req.body.idTst,
      idProject: req.body.idProject,
    });

    if (bug) {
      res.status(200).json({ message: "Bug-ul a fost creat!" });
    } else {
      res.status(404).json({ message: "Eroare la crearea bug-ului!" });
    }
  } catch (err) {
    next(err);
  }
});

// ruta pentru actualizarea bug-ului
router.route("/update/:id").put(async (req, res, next) => {
  try {
    const bug = await Bug.findByPk(req.params.id);
    if (bug) {
      const updatedBug = await bug.update(req.body);
      res.status(200).json({ message: "Bug-ul a fost actualizat!" });
    } else {
      res.status(404).json({ message: "Nu exista bug-ul cautat!" });
    }
  } catch (err) {
    next(err);
  }
});

// ruta pentru stergerea unui bug
router.route("/delete/:id").delete(async (req, res, next) => {
  try {
    const bug = await Bug.findByPk(req.params.id);
    if (bug) {
      const deletedBug = await bug.destroy();
      res.status(200).json({ message: "Bug-ul a fost sters!" });
    } else {
      res.status(404).json({ message: "Bug-ul nu exista!" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
