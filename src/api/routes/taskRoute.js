module.exports = (server) => {

    const taskController = require('../controllers/taskController');

    // create a task
    server.route('/tasks/add').post(taskController.createATask);

    // all tasks
    server.route('/tasks/all')
        .get(taskController.listAllTasks)
        .delete(taskController.deleteAllTasks)

    // done tasks
    server.route('/tasks/done')
        .get(taskController.listDoneTasks)
        .delete(taskController.deleteDoneTasks)

    // todo tasks
    server.route('/tasks/todo').get(taskController.listTodoTasks)

    // one task
    server.route('/tasks/:task_id') // req.params.task_id
        .get(taskController.getATask)
        .put(taskController.updateATask)
        .delete(taskController.deleteATask);
}