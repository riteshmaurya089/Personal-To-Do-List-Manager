// Require the Task Model Data Structure
const Task = require("../models/task");

// Export the tasks controller's createTask() function
module.exports.createTask = async (req, res) => {
    try {
        let date = new Date(req.body.date).getDate();
        if (date < 10) {
            date = "0" + date;
        }
        const month = new Date(req.body.date).toLocaleString("default", {
            month: "short",
        });
        const year = new Date(req.body.date).getFullYear().toString().slice(-2);

        const newTask = await Task.create({
            task: req.body.task,
            description: req.body.description,
            priority: req.body.priority,
            category: req.body.category,
            date: `${month} ${date}, ${year}`,
        });

        console.log("Task Created:", newTask);
        return res.redirect("back");
    } catch (err) {
        console.log("Error in creating task:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Export the tasks controller's deleteTask() function
module.exports.deleteTask = async (req, res) => {
    try {
        const id = req.query.id;
        await Task.findByIdAndDelete(id);
        console.log("Task Deleted");
        return res.redirect("back");
    } catch (err) {
        console.log("Error in deleting task:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Export the tasks controller's completeTask() function
module.exports.completeTask = async (req, res) => {
    try {
        const id = req.query.id;
        const completed = req.query.completed === "true" ? false : true;
        await Task.findByIdAndUpdate(id, { completed: completed });
        console.log("Task Updated");
        return res.redirect("back");
    } catch (err) {
        console.log("Error in updating task:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Export the tasks controller's deleteCompletedTasks() function
module.exports.deleteCompletedTasks = async (req, res) => {
    try {
        await Task.deleteMany({ completed: true });
        console.log("Completed tasks deleted");
        return res.redirect("back");
    } catch (err) {
        console.log("Error in deleting completed tasks:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Export the tasks controller's completeAllTasks() function
module.exports.completeAllTasks = async (req, res) => {
    try {
        await Task.updateMany({ completed: false }, { completed: true });
        console.log("All tasks completed");
        return res.redirect("back");
    } catch (err) {
        console.log("Error in completing all tasks:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
