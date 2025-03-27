// routes/userRoutes.js
import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser,loginUser } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = Router();

router.post('/users', createUser);
router.post('/users/login', loginUser);


// Les routes protegés
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
