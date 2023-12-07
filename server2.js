// Declare variables
const express = require("express");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
require('dotenv').config();
//  add model variable
// const toDoTask = require('./models/toDoTasks');
const toDoTasks = require("./models/todotask");
// Set Middleware
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
// Connect to database (MongoDB)
mongoose.connect(process.env.DB_CONNECTION)

// GET METHOD
app.get("/", async (req, res) => {
//     res.render('index.ejs')
// });
    try{
        toDoTasks.find({}, (err, tasks) => {
            res.render("index.ejs", {toDoTasks: tasks});
        });
    } catch (err){
        if(err) return res.status(500).send(err);
    }
});
// {toDoTasks: tasks}
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));