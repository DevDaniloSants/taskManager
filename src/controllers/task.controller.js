const TaskModel = require("../models/task.model");

const {
    notFoundError,
    objectIdCastError,
} = require("../errors/mongodb.errors");
const { default: mongoose } = require("mongoose");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(201).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);

            if (!task) return notFoundError(this.res);

            this.res.status(200).send(task);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError)
                return objectIdCastError(this.res);

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

    async editById() {
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
            if (error instanceof mongoose.Error.CastError)
                return objectIdCastError(this.res);

            this.res.status(500).send(error.message);
        }
    }

    async deleteById() {
        try {
            const taskId = this.req.params.id;

            const taskToDelete = await TaskModel.findById(taskId);

            if (!taskToDelete) return notFoundError(this.res);

            const deleteTask = await TaskModel.findByIdAndDelete(taskToDelete);

            this.res.status(201).send(deleteTask);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError)
                return objectIdCastError(this.res);

            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
