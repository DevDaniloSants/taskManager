const express = require("express");
const router = express.Router();

const TaskModel = require("../models/task.model");

router.get("/", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(201).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);

        if (!task) return res.status(404).send("Tarefa não encontrada");

        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        const taskToUpdate = await TaskModel.findByIdAndUpdate(
            taskId,
            taskData,
            {
                new: true,
            }
        );

        res.status(200).send(taskToUpdate);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskToDelete = await TaskModel.findById(taskId);

        if (!taskToDelete) return res.status(404).send("Tarefa não encontrada");

        const deleteTask = await TaskModel.findByIdAndDelete(taskToDelete);

        res.status(201).send(deleteTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
