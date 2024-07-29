const Project = require("../models/Project");
const User = require("../models/User");
const TimeEntry = require("../models/TimeEntry");

async function createProject(projectName, description, userId) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Lead not found');
        }

        const newProject = new Project({
            projectName,
            description,
            userId: user._id,
        });
        await newProject.save();

        const populatedProject = await Project.findById(newProject._id)
            .populate('userId')
            .populate('tasks');

        return populatedProject;
    } catch (err) {
        console.error('Error creating project:', err.message);
        throw err;
    }
};

async function getProjects(search = '', limit = 10, page = 1) {
    const [projects, count] = await Promise.all([
        Project.find({projectName: {$regex: search, $options: 'i'}})
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({createdAt: -1}),
        Project.countDocuments({projectName: {$regex: search, $options: 'i'}})
    ]);

    return {
        projects,
        lastPage: Math.ceil(count / limit)
    }
};

function getProject(id) {
    return Project.findById(id).populate({
        path: 'tasks',
        populate: 'assignedTo',
    });
};

async function deleteProject(projectId, userId) {
    try {
        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error('Project not found');
        }

        if (project.userId.toString() !== userId) {
            throw new Error('You do not have permission to delete this project');
        }

        await Project.deleteOne({ _id: projectId });
    } catch (err) {
        console.error('Error deleting project:', err.message);
        throw err;
    }
};

async function updateProject(projectId, userId, updateData) {
    try {
        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error('Project not found');
        }

        if (project.userId.toString() !== userId) {
            throw new Error('You do not have permission to edit this project');
        }

        project.projectName = updateData.projectName || project.projectName;
        project.description = updateData.description || project.description;

        await project.save();

        const updatedProject = await Project.findById(projectId)
            .populate('userId')
            .populate('tasks');

        return updatedProject;
    } catch (err) {
        console.error('Error updating project:', err.message);
        throw err;
    }
};

async function trackProjectTime(projectId, userId, minutes) {
    try {
        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error('Project not found');
        }

        const timeEntry = new TimeEntry({
            projectId: projectId,
            userId: userId,
            minutes: minutes
        });

        await timeEntry.save();

        project.timeEntries.push(timeEntry._id);
        await project.save();

        return timeEntry;
    } catch (err) {
        console.error('Error tracking project time:', err.message);
        throw err;
    }
};

async function getProjectAnalytics(projectId) {
    try {
        const project = await Project.findById(projectId).populate({
            path: 'tasks',
            populate: { path: 'timeEntries' }
        }).populate('timeEntries');

        if (!project) {
            throw new Error('Project not found');
        }

        let totalProjectTime = project.timeEntries.reduce((total, entry) => total + entry.minutes, 0);

        project.tasks.forEach(task => {
            totalProjectTime += task.timeEntries.reduce((total, entry) => total + entry.minutes, 0);
        });

        return {
            projectId: project._id,
            projectName: project.projectName,
            description: project.description,
            totalProjectTime: totalProjectTime,
            taskDetails: project.tasks.map(task => ({
                taskId: task._id,
                title: task.title,
                totalTime: task.timeEntries.reduce((total, entry) => total + entry.minutes, 0)
            }))
        };
    } catch (err) {
        console.error('Error getting project analytics:', err.message);
        throw err;
    }
};

module.exports = { createProject, getProjects, getProject, deleteProject, updateProject, trackProjectTime, getProjectAnalytics };
