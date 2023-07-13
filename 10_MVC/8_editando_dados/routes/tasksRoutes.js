const express = require("express");
const router = express.Router();

const TaskController = require("../controllers/TaskController");

router.get("/add", TaskController.createTask);
router.get("/edit/:id", TaskController.editTask);
router.post("/add", TaskController.saveTask);
router.post("/remove", TaskController.removeTask);
router.post('/edit', TaskController.updateTask)
router.get("/", TaskController.showTasks);

module.exports = router;
