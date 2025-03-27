// routes/userRoutes.js
import { Router } from 'express';
import { createCompany, getCompany, getCompanyById, updateCompany, deleteCompany } from '../controllers/companyController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = Router();

// Les routes protegés

router.post('/company', createCompany);
router.get('/company', getCompany);
router.get('/company/:company_id', getCompanyById);
router.put('/company/:company_id', updateCompany);
router.delete('/company/:company_id', deleteCompany);

export default router;
