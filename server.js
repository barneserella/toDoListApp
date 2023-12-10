// Declare variables
const express = require("express");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
require('dotenv').config();
//  add model variable
// const toDoTask = require('./models/toDoTasks');
const Task = require("./models/todotask");
// Set Middleware
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
// Connect to database (MongoDB)
mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

// GET METHOD
app.get("/", async (req, res) => {
    try{
        const tasks = await Task.find({});
        res.render("index.ejs", { toDoTasks: tasks });
    } catch (error) {
        console.error(error);
        res.status(500).send({message: error.message})
    }
});
     

// POST METHOD
app.post('/', async (req, res) => {
    try{        
        const todoTasks = new Task(
        {
            title: req.body.title,
            content: req.body.content
        }
    );
        const doc = await todoTasks.save()
        console.log(doc);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

// UPDATE METHOD
app.route('/edit/:id')
    .get(async (req, res) => {
        try{
            const id = req.params.id
            const tasks = await Task.find({});
            res.render("edit.ejs", { toDoTasks: tasks, idTask: id });
            } catch (error) {
            console.error(error);
            res.status(500).send({message: error.message})
        }
    })
    
    .post(async (req, res) => {
        const id = req.params.id;
        try{
            const updatedTask = await Task.findByIdAndUpdate(
            id, 
            {
                title: req.body.title,
                content: req.body.content
            },
            { new:true }
        );

        if (!updatedTask) {
            console.log("Task not found");
            return res.redirect('/');
        }   
            console.log("Task updated:", updatedTask);
            res.redirect('/');
        }
        catch(err) {
                console.log(err);
                res.status(500).send({ message: err.message });
            }
    });

// DELETE METHOD
app.route('/remove/:id')
    .get(async (req, res) => {
        try{
            const id = req.params.id
            const deletedTask = await Task.findByIdAndDelete(id);

            if (!deletedTask) {
                console.log("Task not found");
                return res.redirect('/');
            }   
                console.log("Task deleted:", deletedTask);
                res.redirect('/');
            
        }catch(error){
            console.error(error);
            res.status(500).send({message: error.message})
        }
    });
    


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));