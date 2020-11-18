const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const express = require("express");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function() {
  console.log("Server running on port 3000...");
});