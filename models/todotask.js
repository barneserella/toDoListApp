const mongoose = require('mongoose');
const Schema = mongoose.Schema



const toDoTaskSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('Task', toDoTaskSchema);

module.exports = Task;


// const mongoose = require('mongoose')
// const todoTaskSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     content: {
//         type: String,
//         required: true 
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
// })
// module.exports = mongoose.model('toDoTasks', todoTaskSchema, 'tasks')