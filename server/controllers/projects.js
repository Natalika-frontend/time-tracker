const Project = require("../models/Project");
const User = require("../models/User");

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
}

module.exports = { createProject, deleteProject, updateProject };
