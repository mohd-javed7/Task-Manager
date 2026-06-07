const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMid');

// GET all the tasks
router.get('/', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// POST create task
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({
            title,
            description,
            userId: req.user.userId
        });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// PUT update tasks
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            req.body,
            { new: true }
        );
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// DELETE task
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete(
            { _id: req.params.id, userId: req.user.userId }
        );
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// PATCH toggle status
router.patch('/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });
        if (!task) return res.status(404).json({ message: "Task not found" });
        task.status = task.status === 'pending' ? 'completed' : 'pending';
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;