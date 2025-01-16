const mongoose = require('mongoose')

const Todos = require('../dbTodos')

//export methods
module.exports = {
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}

//GET todos list

const getTodo = async (req, res)=>{
    try {
        const allTodos = await Todos.find({}).sort({createdAt:-1})
        res.status(200).send(allTodos)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

//Create todos