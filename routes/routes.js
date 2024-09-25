const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')
const loginController = require('../controllers/loginController')
const clientController = require('../controllers/clientController')

router.get('/', taskController.tasks_get);

router.post('/add_task', taskController.add_task_post);

router.post('/login_create_new_request', loginController.login_create_new_user);

router.post('/login_request', loginController.login_request);

router.get('/get_clients/:userId', clientController.get_clients_request);

router.post('/add_client', clientController.add_client_request);

module.exports = router;