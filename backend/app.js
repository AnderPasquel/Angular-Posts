const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

const postsRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

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
app.use("/images", express.static(path.join("backend/images")));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

//const pass = jYUZK9UsCr88dUJ6; 

app.use('/api/posts',postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;