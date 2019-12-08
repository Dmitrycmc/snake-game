const express = require("express");
const mongo = require("mongodb");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const handlers = require("./handlers.js");

const app = express();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.route("/api/records").post(handlers.createOrUpdate);
app.route("/api/records").get(handlers.findByLevel);

app.use("/", (req, res) => {
    res.redirect("https://dmitrycmc.github.io/snake-game/");
});

app.listen(port, () => {
    console.log("Node.js listening ...");
});
