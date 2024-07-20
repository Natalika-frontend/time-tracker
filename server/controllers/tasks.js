const Task = require("../models/Task");
const Project = require("../models/Project");
const TimeEntry = require("../models/TimeEntry");

async function createTask(projectId, title, description, userId) {
    try {
        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error('Project not found');
        }

        if (project.userId.toString() !== userId.toString()) {
            throw new Error('You do not have permission to create tasks for this project');
        }

        const newTask = new Task({
            projectId,
            title,
            description
        });

        await newTask.save();

        project.tasks.push(newTask);
        await project.save();

        return newTask;
    } catch (err) {
        console.error('Error creating task:', err.message);
        throw err;
    }
}

async function updateTask(taskId, updateData, userId) {
    try {
        const task = await Task.findById(taskId).populate('projectId');

        if (!task) {
            throw new Error('Task not found');
        }

        if (task.projectId.userId.toString() !== userId) {
            throw new Error('You do not have permission to edit this task');
        }

        task.title = updateData.title || task.title;
        task.description = updateData.description || task.description;
        task.assignedTo = updateData.assignedTo || task.assignedTo;
        task.status = updateData.status || task.status;

        await task.save();
        return task;
    } catch (err) {
        console.error('Error updating task:', err.message);
        throw err;
    }
}

async function deleteTask(taskId, userId) {
    try {
        const task = await Task.findById(taskId).populate('projectId');

        if (!task) {
            throw new Error('Task not found');
        }

        if (task.projectId.userId.toString() !== userId) {
            throw new Error('You do not have permission to delete this task');
        }

        await Task.deleteOne({ _id: taskId });

        await Project.updateOne(
            { _id: task.projectId._id },
            { $pull: { tasks: taskId } }
        );
    } catch (err) {
        console.error('Error deleting task:', err.message);
        throw err;
    }
}

async function getTasksByProject(projectId) {
    try {
        const tasks = await Task.find({ projectId }).populate('assignedTo');
        return tasks;
    } catch (err) {
        console.error('Error getting tasks:', err.message);
        throw err;
    }
}

async function trackTime(taskId, userId, minutes) {
    try {
        const task = await Task.findById(taskId);

        if (!task) {
            throw new Error('Task not found');
        }

        if (task.assignedTo.toString() !== userId) {
            throw new Error('You do not have permission to track time for this task');
        }

        const timeEntry = new TimeEntry({
            taskId: taskId,
            userId: userId,
            minutes: minutes
        });

        await timeEntry.save();

        task.timeEntries.push(timeEntry._id);
        await task.save();

        return timeEntry;
    } catch (err) {
        console.error('Error tracking time:', err.message);
        throw err;
    }
};

async function getTaskAnalytics(taskId) {
    try {
        const task = await Task.findById(taskId).populate('timeEntries');

        if (!task) {
            throw new Error('Task not found');
        }

        const totalTime = task.timeEntries.reduce((total, entry) => total + entry.minutes, 0);

        return {
            taskId: task._id,
            title: task.title,
            description: task.description,
            totalTime: totalTime
        };
    } catch (err) {
        console.error('Error getting task analytics:', err.message);
        throw err;
    }
};

async function assignTask(req, res) {
    try {
        const { taskId } = req.params;
        const { userId } = req.body;

        // Найти задачу по ID
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        // Назначить пользователя на задачу
        task.assignedTo = userId;
        await task.save();

        res.status(200).json({ data: task });
    } catch (err) {
        console.error('Error assigning task:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { createTask, updateTask, deleteTask, getTasksByProject, trackTime, getTaskAnalytics, assignTask };
