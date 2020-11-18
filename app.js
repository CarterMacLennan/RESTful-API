const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const express = require("express");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewURLParser: true, useUnifiedTopology: true});

const articleSchema = {
    title: String,
    content: String,
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res) => {
    Article.find( (err, documents) => {
        if (!err){
            res.send(documents);
        }
        else {
            res.send(err);
        }
    });
});

app.post("/articles", (req,res) => {
    const article = new Article({
        title: req.body.title,
        content: req.body.content
    });

    article.save( err => {
        if (!err){
            res.send("Your new article was added!")
        }
        else{
            res.send(err);
        }
    });
});


app.listen(3000, function() {
  console.log("Server running on port 3000...");
});