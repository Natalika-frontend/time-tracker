const express = require('express');
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");
const {trackTime, deleteTask, updateTask, createTask} = require("../controllers/tasks");
const mapTask = require("../helpers/mapTask");

const router = express.Router({ mergeParams: true });

router.post('/tasks', authenticated, hasRole([ROLES.TEAMLEAD]), async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description } = req.body;
        const task = await createTask(projectId, title, description, req.user._id);

        res.send({ data: mapTask(task) });
    } catch (err) {
        res.status(500).json({ msg: err.message || 'Server error' });
    }
});

router.patch('/tasks/:taskId', authenticated, hasRole([ROLES.TEAMLEAD]), async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await updateTask(req.params.taskId, { title, description, status }, req.user.id);
        res.send({ data: task });
    } catch (err) {
        res.status(500).json({ msg: err.message || 'Server error' });
    }
});

router.delete('/tasks/:taskId', authenticated, hasRole([ROLES.TEAMLEAD]), async (req, res) => {
    try {
        await deleteTask(req.params.taskId, req.user.id);
        res.send({ error: null });
    } catch (err) {
        res.status(500).json({ msg: err.message || 'Server error' });
    }
});

router.post('/tasks/:taskId/track-time', authenticated, hasRole([ROLES.TEAMMEMBER]), async (req, res) => {
    try {
        const { minutes } = req.body;
        const timeEntry = await trackTime(req.params.taskId, req.user.id, minutes);
        res.send({ data: timeEntry });
    } catch (err) {
        res.status(500).json({ msg: err.message || 'Server error' });
    }
});

module.exports = router;
