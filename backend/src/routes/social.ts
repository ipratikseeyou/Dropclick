import express from 'express';
import { socialController } from '../controllers/socialController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Social media integration routes (all require authentication)
router.use(authMiddleware);

router.get('/github/profile', socialController.getGitHubProfile);
router.get('/github/repos', socialController.getGitHubRepos);
router.get('/linkedin/profile', socialController.getLinkedInProfile);
router.get('/twitter/profile', socialController.getTwitterProfile);
router.post('/connect/:platform', socialController.connectPlatform);
router.delete('/disconnect/:platform', socialController.disconnectPlatform);

export default router; 