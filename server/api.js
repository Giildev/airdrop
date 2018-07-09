const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

/* Settings */
const port = process.env.PORT || 4000;
const corsOptions = {
  origin: "http://localhost:4000"
};

/* Middleware */
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/public", express.static(__dirname + "/public"));

/* Routes Api */
const base_url = "/api";

/* Use Routes */
app.get("/deploy", (req, res) => {
  res.send({ object: "Hello from Node.js" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
