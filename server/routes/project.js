const express = require('express');
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");
const {createProject, deleteProject, updateProject, trackProjectTime, getProjectAnalytics, getProjects, getProject} = require("../controllers/projects");
const mapProjects = require("../helpers/mapProjects");
const mapTask = require("../helpers/mapTask");
const {getTasksByProject} = require("../controllers/tasks");


const router = express.Router({mergeParams: true});

router.get('/projects/', async (req, res) => {
    const {projects, lastPage} = await getProjects(
        req.query.search,
        req.query.limit,
        req.query.page
    );

    res.send({data: {lastPage, projects: projects.map(mapProjects)}});
});

router.get('/projects/:id', async (req, res) => {
    const project = await getProject(req.params.id);

    res.send({data: mapProjects(project)});
})

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
