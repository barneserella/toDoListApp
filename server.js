//Declare Variables
const express = require("express");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");
require('dotenv').config()

//Set Middleware
app.set("view engine", "ejs");
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

//Connect to Mongo
mongoose.connect(
    process.env.DB_CONNECTION
)

// GET METHOD
app.get("/", async (req, res) => {
    try {
        TodoTask.find({}, (err, tasks) => {
            res.render("index.ejs", { todoTasks: tasks });
        });
    } catch (err) {
        if (err) return res.status(500).send(err);
    }
});

//Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));