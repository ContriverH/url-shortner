const { urlencoded } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const shortUrl = require("./models/shortUrl");

mongoose.connect("mongodb://localhost/urlShortner");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrls = await shortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  await shortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.listen(process.env.PORT || 5000);
