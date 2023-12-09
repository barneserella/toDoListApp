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
    
     
        // res.render('index.ejs')
       
        // .then(function(tasks){
        //     console.log(tasks);
        // })
        // .catch(function (err){
        //     console.log(err);
        // })
    //     toDoTasks.find({}, (err, tasks) => {
    //         res.render("index.ejs", {toDoTasks: tasks});
    //     });
    // } catch (error){
    //     console.error(error)
    // }
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

//     .then(() => {
//         console.log(doc)
//     })
//     .then(() => {
//         res.redirect('/')
//     })
//     .catch((err) => {
//         console.log(err)
//     });
// });
    // try {
    //     await todoTasks.save()
    //     console.log(todoTasks)
    //     res.redirect('/')
    // } catch(err) {
    //     if (err) return res.status(500).send(err)
    // }
// });


    // This doesnt work below
//     res.render('index.ejs')
// });
    // try{
    //     toDoTasks.find({}, (err, tasks) => {
    //         res.render("index.ejs", {toDoTasks: tasks});
    //     });
    // } catch (err){
    //     if(err) return res.status(500).send(err);
    // }

// {toDoTasks: tasks}
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));