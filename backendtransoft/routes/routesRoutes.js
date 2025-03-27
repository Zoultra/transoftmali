// routes/userRoutes.js
import { Router } from 'express';
import { createRoute, getRoutes, getRouteById, updateRoute, deleteRoute, searchRoutes } from '../controllers/routesController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/searchroutes', searchRoutes);
// Les routes protegés
router.post('/routes', createRoute);
router.get('/routes', getRoutes);
router.get('/routes/:route_id', getRouteById);
router.put('/routes/:route_id', updateRoute);
router.delete('/routes/:route_id', deleteRoute);
 

export default router;
