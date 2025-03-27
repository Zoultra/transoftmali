// routes/userRoutes.js
import { Router } from 'express';
import { createBuses, getBuses, getBusesById, updateBuses, deleteBuses } from '../controllers/busesController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = Router();

// Les routes protégées

router.post('/buses', createBuses);
router.get('/buses', getBuses);
router.get('/buses/:bus_id', getBusesById);
router.put('/buses/:bus_id', updateBuses);
router.delete('/buses/:bus_id', deleteBuses);

export default router;
