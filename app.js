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

app.route("/articles")

.get((req, res) => {
    Article.find( (err, documents) => {
        if (!err) {
            res.send(documents);
        }
        else {
            res.send(err);
        }
    });
})

.post((req,res) => {
    const article = new Article({
        title: req.body.title,
        content: req.body.content
    });

    article.save( err => {
        if (!err) {
            res.send("Your new article was added!")
        }
        else{
            res.send(err);
        }
    });
})

.delete((req,res) =>{
    Article.deleteMany( err => {
        if (!err) {
            res.send("All articles in the collection have been deleted.");
        }
        else {
            res.send(err);
        }
    });
});

app.route("/articles/:title")

.get( (req,res) => {
    Article.findOne({title: req.params.title}, (err, document) => {
        if (document) {
            res.send(document);
        }
        else {
            res.send("No articles were found.");
        }
    })
})

.put( (req, res) => {
    Article.update(
        {title: req.params.title},
        {title: req.body.title, content: req.body.content},
        {overwrite: true},
        (err) => {
            if (!err){
                res.send("The document has been updated.");
            }
            else {
                res.send(err);
            }
        }
    )
})



app.listen(3000, function() {
  console.log("Server running on port 3000...");
});