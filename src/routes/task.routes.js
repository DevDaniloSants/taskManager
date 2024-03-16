const express = require("express");
const router = express.Router();

const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");

router.get("/", async (req, res) => {
    return new TaskController(req, res).getAll();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getById();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).addTask();
});

router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).editById();
});

router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).deleteById();
});

module.exports = router;
