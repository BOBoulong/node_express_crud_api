const { Router } = require('express');
const userController = require('../controllers/user_controller');

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.removeUser);

module.exports = router;
