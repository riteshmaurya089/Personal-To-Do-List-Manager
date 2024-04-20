// Import the Task Model
const Task = require("../models/task");

class TaskController {
    async home(req, res) {
        try {
            const taskList = await Task.find({});
            const count = taskList.reduce((acc, task) => !task.completed ? acc + 1 : acc, 0);
            return res.render("all-tasks", {
                title: "Home Page",
                task_list: taskList,
                count: count,
            });
        } catch (err) {
            console.log("Error in fetching the tasks from DB:", err);
            return res.status(500).send("Internal Server Error");
        }
    }

    async incompleteTasks(req, res) {
        try {
            const taskList = await Task.find({ completed: false });
            return res.render("incomplete-tasks", {
                title: "Incomplete Tasks",
                task_list: taskList,
                count: taskList.length,
            });
        } catch (err) {
            console.log("Error in fetching the incomplete tasks from DB:", err);
            return res.status(500).send("Internal Server Error");
        }
    }

    async completedTasks(req, res) {
        try {
            const taskList = await Task.find({ completed: true });
            return res.render("completed-tasks", {
                title: "Completed Tasks",
                task_list: taskList,
                count: taskList.length,
            });
        } catch (err) {
            console.log("Error in fetching the completed tasks from DB:", err);
            return res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = new TaskController();
