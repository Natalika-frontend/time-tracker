const mapUser = require("./mapUser");

module.exports = function(project) {
    if (!project) {
        throw new Error('Project is undefined');
    }

    const mappedProject = {
        id: project._id,
        projectName: project.projectName,
        description: project.description,
        tasks: project.tasks,
        lead: project.userId ? mapUser(project.userId) : null,
    };

    return mappedProject;
};
