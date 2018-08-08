const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3030;
app.use(express.static(path.join(__dirname, "client/build")));
app.get("/*.png", (req, res) => {
  console.log(req.params[0]);
  res.sendFile(path.join(__dirname, "client/public/", req.params[0] + ".png"));
});
app.get("/*.jpeg", (req, res) => {
  console.log(req.params[0]);
  res.sendFile(path.join(__dirname, "client/public/", req.params[0] + ".jpeg"));
});
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/", "index.html"));
// });
app.get("/*", (req, res) => {
  res.send("Test");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
