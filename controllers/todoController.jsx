const mongoose = require('mongoose');
const Todos = require('../dbTodos');

// GET todos list
const getTodo = async (req, res) => {
    try {
        const allTodos = await Todos.find({}).sort({ createdAt: -1 });
        res.status(200).send(allTodos);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Create todos
const createTodo = async (req, res) => {
    const dbTodo = req.body;
    try {
        const newTodo = await Todos.create(dbTodo);
        res.status(201).send(newTodo);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update todos
const updateTodo = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`There is no todo with the id: ${id}`);
        }

        const todoId = { _id: id };
        const update = { completed: true };
        const updatedTodo = await Todos.findOneAndUpdate(todoId, update, { new: true });

        if (!updatedTodo) {
            return res.status(404).send(`There is no todo with the id: ${id}`);
        }

        res.status(200).send(updatedTodo);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete todos
const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`There is no todo with the id: ${id}`);
        }

        const deletedTodo = await Todos.findOneAndDelete({ _id: id });

        if (!deletedTodo) {
            return res.status(404).send(`There is no todo with the id: ${id}`);
        }

        res.status(200).send(deletedTodo);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Export methods
module.exports = {
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
};
