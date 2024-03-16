const express = require("express");
const router = express.Router();

const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");

router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getTask();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).addTask();
});

router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).editTask();
});

router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).deleteTask();
});

module.exports = router;
