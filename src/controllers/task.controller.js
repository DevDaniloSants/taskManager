const TaskModel = require("../models/task.model");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(201).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getTask() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);

            if (!task)
                return this.res.status(404).send("Tarefa não encontrada");

            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async addTask() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();

            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async editTask() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            const taskToUpdate = await TaskModel.findByIdAndUpdate(
                taskId,
                taskData,
                {
                    new: true,
                }
            );

            this.res.status(200).send(taskToUpdate);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async deleteTask() {
        try {
            const taskId = this.req.params.id;

            const taskToDelete = await TaskModel.findById(taskId);

            if (!taskToDelete)
                return this.res.status(404).send("Tarefa não encontrada");

            const deleteTask = await TaskModel.findByIdAndDelete(taskToDelete);

            this.res.status(201).send(deleteTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
