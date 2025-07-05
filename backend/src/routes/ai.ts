import express from 'express';
import { aiController } from '../controllers/aiController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// AI processing routes (all require authentication)
router.use(authMiddleware);

router.post('/analyze-social', aiController.analyzeSocialData);
router.post('/generate-content', aiController.generateContent);
router.post('/optimize-portfolio', aiController.optimizePortfolio);
router.post('/transform-portfolio', aiController.transformPortfolio);

export default router; 