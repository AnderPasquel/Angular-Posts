const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Post = require('./models/post');
const app = express();

mongoose.connect('mongodb://ander:jYUZK9UsCr88dUJ6@ds141952.mlab.com:41952/angularposts')
    .then(() => {
        console.log('Connected')
    })
    .catch(() => {
        console.log('Fail Conn')
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header',
        'Origin, X-Requested-with, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

//const pass = jYUZK9UsCr88dUJ6; 

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    post.save().then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Post added successfully',
            postId: result._id
        });
    });
    

});

app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        console.log(documents);
        res.status(200).json({
            message: 'Post fetch successfully!',
            posts: documents
        });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    });
  });

module.exports = app;