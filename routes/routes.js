const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')

router.get('/', controller.tasks_get);

router.post('/create_task', controller.create_task_post);

module.exports = router;