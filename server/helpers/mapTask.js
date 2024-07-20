module.exports = function(task) {
    if (!task) {
        throw new Error('Project is undefined');
    }

    const mappedTask = {
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status
    };

    return mappedTask;
};
