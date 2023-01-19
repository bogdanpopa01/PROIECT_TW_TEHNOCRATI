const router = require("express").Router();

// pentru generarea token-ului si timpului pana la terminarea sesiunii
const moment = require("moment");
const TOKEN_TIMEOUT = 3600;

//prealuarea modulului User
const User = require("../modules/user");

//ruta pentru crearea user-ului
router.route("/register").post(async (req, res, next) => {
  try {
    if (
      req.body.email === "" ||
      req.body.username === "" ||
      req.body.password === "" ||
      req.body.email === null ||
      req.body.username === null ||
      req.body.password === null
    ) {
      res.status(400).json({ message: "Toate campurile sunt obligatorii!" });
    }

    const username = req.body.username;
    const currentUser = await User.findOne({ where: { username: username } });
    if (currentUser) {
      res.status(403).json({ message: "Username-ul este deja folosit!" });
    }

    //verificare daca tipul de utilizator este unul dintre cele doua posibile
    const type = req.body.type;
    if (type !== "TST" && type !== "MP") {
      res.status(400).json({ message: "Tipul nu exista! Alegeti TST sau MP!" });
    }

    // pentru generarea token-ului si timpului pana la terminarea sesiunii
    let token = Math.random().toString(36);
    let expiery = moment().add(TOKEN_TIMEOUT, "seconds");

    // pentru crearea unui user
    const user = await User.create({
      type: req.body.type,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      idProiect: req.body.idProiect !== null ? req.body.idProiect : null,
      token: token,
      expiery: expiery,
    });
    if (user) {
      res.status(200).json({ message: "User-ul a fost creat!" });
    } else {
      res.status(404).json({ message: "Eroare la crearea user-ului!" });
    }
  } catch (err) {
    next(err);
  }
});

//ruta pentru obtinerea tuturor utilizatorilor
router.route("/all").get(async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (users) {
      res.status(201).json(users);
    } else {
      res.status(404).json({ message: "Utilizatori inexistenti!" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
