import express from 'express';
import { aiController } from '../controllers/aiController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// AI processing routes (all require authentication)
router.use(authMiddleware);

router.post('/analyze-profile', aiController.analyzeProfile);
router.post('/generate-content', aiController.generateContent);
router.post('/suggest-improvements', aiController.suggestImprovements);
router.post('/optimize-portfolio', aiController.optimizePortfolio);

export default router; 