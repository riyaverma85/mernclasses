const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const verifyToken = require('../middleware/auth');

router.post('/assign', verifyToken(['owner','admin']), taskController.assignTask);
router.get('/all', verifyToken(['owner','admin','user']), taskController.getTasks);
router.put('/edit/:id', verifyToken(['owner']), taskController.editTask);
router.delete('/delete/:id', verifyToken(['owner']), taskController.deleteTask);
router.put('/submit/:id', verifyToken(['user']), taskController.submitTask);

module.exports = router;
