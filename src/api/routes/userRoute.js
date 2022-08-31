module.exports = (server) => {
    const userController = require('../controllers/userController');

    server.route('/users/register').post(userController.createAnUser);
    server.route('/users/login').post(userController.loginAnUser);

    server.route('/users').get(userController.listAllUsers)

    server.route('/users/:user_id') // req.params.post_id
    .get(userController.getAUser)
    .put(userController.updateAUser)
    .delete(userController.deleteAUser);
}