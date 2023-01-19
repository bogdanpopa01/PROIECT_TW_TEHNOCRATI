const port = 8080;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//ruta pentru operatii pe utilizator
app.use("/user", require("./routes/user_account"));
//ruta pentru operatii pe bug-uri
app.use("/bug", require("./routes/bug"));
//ruta pentru operatii pe proiecte
app.use("/project", require("./routes/project"));

//eroarea generala
app.use((err, req, res, next) => {
  console.error(`A aparut o alta eroare: ${err}`);
  res.status(500).json({ message: err.name });
});
console.log("The server is running...");
app.listen(port);
