const express = require('express');
const Task = require("../models/Task");
const Project = require("../models/Project");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");
const {createProject, deleteProject, updateProject} = require("../controllers/projects");
const mapProjects = require("../helpers/mapProjects");


const router = express.Router({mergeParams: true});

router.get('/projects', authenticated, hasRole([ROLES.ADMIN, ROLES.TEAMLEAD]), async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user.id });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/projects',  authenticated, hasRole([ROLES.TEAMLEAD]), async (req, res) => {
    try {
        const { projectName, description } = req.body;
        const project = await createProject(projectName, description, req.user.id);
        res.send({data: mapProjects(project)});
    } catch (err) {
        res.status(500).json({ msg: err.message || 'Server error' });
    }
});

router.delete('/projects/:projectId', authenticated, hasRole([ROLES.TEAMLEAD, ROLES.ADMIN]), async (req, res) => {
    try {
        await deleteProject(req.params.projectId, req.user.id);
        res.send({ error: null });
    } catch (err) {
        res.status(500).json({ msg: err.message || 'Server error' });
    }
});

router.patch('/projects/:projectId', authenticated, hasRole([ROLES.TEAMLEAD, ROLES.ADMIN, ROLES.INDIVIDUALUSER, ROLES.TEAMMEMBER]), async (req, res) => {
    try {
        const { projectName, description } = req.body;
        const project = await updateProject(req.params.projectId, req.user.id, { projectName, description });
        res.send({ data: mapProjects(project) });
    } catch (err) {
        res.status(500).json({ msg: err.message || 'Server error' });
    }
});

router.get('/projects/:projectId/tasks', authenticated, hasRole([ROLES.TEAMLEAD, ROLES.ADMIN, ROLES.INDIVIDUALUSER, ROLES.TEAMMEMBER]), async (req, res) => {
    try {
        const tasks = await Task.find({ projectId: req.params.projectId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/projects/:projectId/tasks', authenticated, hasRole([ROLES.TEAMLEAD, ROLES.ADMIN, ROLES.INDIVIDUALUSER, ROLES.TEAMMEMBER]), async (req, res) => {
    const { name, assignedTo } = req.body;
    try {
        const newTask = new Task({
            name,
            projectId: req.params.projectId,
            assignedTo,
        });
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.put('/projects/:projectId/tasks/:taskId', authenticated, hasRole([ROLES.TEAMLEAD, ROLES.ADMIN, ROLES.INDIVIDUALUSER, ROLES.TEAMMEMBER]), async (req, res) => {
    const { timeSpent } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(req.params.taskId, { timeSpent }, { new: true });
        res.json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
