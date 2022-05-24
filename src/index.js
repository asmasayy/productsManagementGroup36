const express = require('express');

const bodyParser = require('body-parser');
const multer =  require("multer");
const { default: mongoose } = require('mongoose');
const route = require('./routes/route.js');
const { json } = require('body-parser');
const app = express();

const { AppConfig } = require('aws-sdk');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());

mongoose.connect("mongodb+srv://redcloud:R4SnP0bzbqEqX5wq@cluster0.tshhd.mongodb.net/project-05", {    //Connecting to the Database 
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);    //parse incoming request body in JSON format

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))    //Listen for incoming requests
});