const router = require("express").Router();

const Project = require("../../modules/project");
const User = require("../../modules/user");

// ruta pentru crearea unui proiect
router.route("/create").post(async (req, res, next) => {
  try {
    
    const currentUser = await User.findOne({ where: { id: req.body.idMp} });
    if(currentUser === null){
      res.status(400).json({ message: "Nu exista user pentru care creezi proiectul"});
    }
    const project = await Project.create({
      linkRepo: req.body.linkRepo,
      nume: req.body.nume,
      idMp: req.body.idMp,
    });
    
    if (project) {
      res.status(200).json({ message: "Proiectul a fost creat!" });
    } else {
      res.status(404).json({ message: "Eroare la crearea proiectului!" });
    }
  } catch (err) {
    next(err);
  }
});

// ruta pentru actualizarea unui proiect
router.route("/update/:id").put(async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      const updatedProject = await project.update(req.body);
      res.status(200).json({ message: "Proiectul a fost actualizat!" });
    } else {
      res.status(404).json({ message: "Nu exista proiectul cautat!" });
    }
  } catch (err) {
    next(err);
  }
});

// ruta pentru stergerea unui proiect
router.route("/delete/:id").delete(async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      const deletedProject = await project.destroy();
      res.status(200).json({ message: "Proiectul a fost sters!" });
    } else {
      res.status(404).json({ message: "Nu exista proiectul cautat!" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
