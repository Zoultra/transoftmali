 
import { Router } from 'express';
import { createReservation, getReservations, getReservationById, updateReservation, deleteReservation } from '../controllers/reservationController.js';  
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

// Les routes protégées

router.post('/reservation', createReservation);  
router.get('/reservation', getReservations);  
router.get('/reservation/:reservation_id', getReservationById);  
router.put('/reservation/:reservation_id', authenticateToken, updateReservation);  
router.delete('/reservation/:reservation_id', deleteReservation);  

export default router;