// Require the Task Model Data Structure
const Task = require("../models/task");

// Export the Home Controller's home() Function
module.exports.home = async (req, res) => {
    try {
        const taskList = await Task.find({});
        let count = 0;
        taskList.forEach((task) => {
            if (!task.completed) {
                count++;
            }
        });
        return res.render("all-tasks", {
            title: "Home Page",
            task_list: taskList,
            count: count,
        });
    } catch (err) {
        console.log("Error in fetching the tasks from DB:", err);
        return res.status(500).send("Internal Server Error");
    }
};

// Export the Home Controller's incompleteTasks() Function
module.exports.incompleteTasks = async (req, res) => {
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
};

// Export the Home Controller's completedTasks() Function
module.exports.completedTasks = async (req, res) => {
    try {
        const taskList = await Task.find({});
        const arr = taskList.filter(task => task.completed);
        const count = taskList.length - arr.length;
        return res.render("completed-tasks", {
            title: "Completed Tasks",
            task_list: arr,
            count: count,
        });
    } catch (err) {
        console.log("Error in fetching the completed tasks from DB:", err);
        return res.status(500).send("Internal Server Error");
    }
};
