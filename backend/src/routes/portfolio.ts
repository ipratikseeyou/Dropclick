import express from 'express';
import { portfolioController } from '../controllers/portfolioController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Portfolio routes (all require authentication)
router.use(authMiddleware);

router.get('/', portfolioController.getPortfolios);
router.post('/', portfolioController.createPortfolio);
router.get('/:id', portfolioController.getPortfolio);
router.put('/:id', portfolioController.updatePortfolio);
router.delete('/:id', portfolioController.deletePortfolio);
router.post('/:id/generate', portfolioController.generatePortfolio);

export default router; 