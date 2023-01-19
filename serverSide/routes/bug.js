const router = require("express").Router();

//preluarea modulului bug
const Bug = require("../modules/bug");

router.use("/TST", require("./BugRoutes/TST"));

//ruta pentru obtinerea tuturor bug-urilor
router.route("/all").get(async (req, res, next) => {
  try {
    const bugs = await Bug.findAll();
    if (bugs) {
      res.status(200).json({ bugs });
    } else {
      res.status(404).json({ message: "Nu exista bug-uri!" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
