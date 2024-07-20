const express = require('express');
const Task = require("../models/Task");
const Project = require("../models/Project");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");
const {createProject, deleteProject, updateProject, trackProjectTime, getProjectAnalytics} = require("../controllers/projects");
const mapProjects = require("../helpers/mapProjects");
const mapTask = require("../helpers/mapTask");
const {getTasksByProject} = require("../controllers/tasks");


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

router.get('/projects/:projectId', authenticated, hasRole([ROLES.TEAMLEAD, ROLES.TEAMMEMBER]), async (req, res) => {
    try {
        const tasks = await getTasksByProject(req.params.projectId);
        res.send({ data: tasks.map(task => mapTask(task)) });
    } catch (err) {
        res.status(500).json({ msg: err.message || 'Server error' });
    }
});

router.post('/:projectId/track-time', authenticated, hasRole([ROLES.INDIVIDUALUSER]), async (req, res) => {
    try {
        const { minutes } = req.body;
        const timeEntry = await trackProjectTime(req.params.projectId, req.user.id, minutes);
        res.send({ data: timeEntry });
    } catch (err) {
        res.status(500).json({ msg: err.message || 'Server error' });
    }
});

router.get('/:projectId/analytics', authenticated, hasRole([ROLES.TEAMLEAD, ROLES.INDIVIDUALUSER, ROLES.TEAMMEMBER]), async (req, res) => {
    try {
        const analytics = await getProjectAnalytics(req.params.projectId);
        res.send({ data: analytics });
    } catch (err) {
        res.status(500).json({ msg: err.message || 'Server error' });
    }
});

module.exports = router;
