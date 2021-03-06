const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

/* Settings */
const port = process.env.PORT || 4000;
const corsOptions = {
  origin: "http://206.189.202.169:4000"
};

/* Middleware */
app.use(cors());
app.use(fileUpload());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/public", express.static(__dirname + "/public"));

/* Routes Api */
const authRoute = require("./routes/auth");
const siteRoute = require("./routes/site");
const faqRoute = require("./routes/faq");
const hiwcardRoute = require("./routes/hiwcard");
const userRoute = require("./routes/user");
const subscribeRoute = require("./routes/subscribe");
const timelineRoute = require("./routes/timeline");
const storyRoute = require("./routes/story");
const donationRoute = require("./routes/donation");

/* Use Routes */
const base_url = "/api";
app.use(base_url, authRoute);
app.use(base_url, siteRoute);
app.use(base_url, hiwcardRoute);
app.use(base_url, subscribeRoute);
app.use(base_url, userRoute);
app.use(base_url, donationRoute);
app.use(base_url, storyRoute);
app.use(base_url, timelineRoute);
app.use(base_url, faqRoute);

/* endpoint test */
app.get("/deploy", (req, res) => {
  res.send({ object: "Hello from Node.js" });
});

/* message when server is up */
app.listen(port, () => console.log(`Listening on port ${port}`));
