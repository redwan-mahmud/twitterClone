const express = require('express');
const mongoose = require('mongoose');
const db = require("./config/keys").mongoURI;
const passport = require('passport');

const bodyParser = require('body-parser');
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = require("./models/User")
const app = express();

app.use(passport.initialize());
require('./config/passport')(passport);




mongoose
    .connect(db, {useNewUrlParser: true})
    .then(()=> console.log("Connected to mongoDb"))
    .catch(err=>console.log(err));


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
//app responds to other software like postman 

app.get("/", (req, res) => {   
    res.send("Hello James")});

app.use("/api/users",users);
app.use("/api/tweets",tweets);

const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Server is running on port ${port}`));
