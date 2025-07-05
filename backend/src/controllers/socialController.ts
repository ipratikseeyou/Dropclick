import { Request, Response } from 'express';
import axios from 'axios';
import { prisma } from '../index';

export const socialController = {
  async getGitHubProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;
      const { username } = req.query;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!username) {
        return res.status(400).json({ error: 'GitHub username required' });
      }

      // Fetch GitHub profile
      const response = await axios.get(`https://api.github.com/users/${username}`);
      const profile = response.data;

      // Fetch repositories
      const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
      const repos = reposResponse.data;

      res.json({
        profile,
        repositories: repos
      });
    } catch (error) {
      console.error('GitHub profile error:', error);
      res.status(500).json({ error: 'Failed to fetch GitHub profile' });
    }
  },

  async getGitHubRepos(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;
      const { username } = req.query;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!username) {
        return res.status(400).json({ error: 'GitHub username required' });
      }

      const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
      const repos = response.data;

      res.json({ repositories: repos });
    } catch (error) {
      console.error('GitHub repos error:', error);
      res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
    }
  },

  async getLinkedInProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // TODO: Implement LinkedIn API integration
      // LinkedIn API requires OAuth 2.0 and specific permissions
      
      res.json({ 
        message: 'LinkedIn integration coming soon',
        note: 'LinkedIn API requires OAuth 2.0 setup and specific permissions'
      });
    } catch (error) {
      console.error('LinkedIn profile error:', error);
      res.status(500).json({ error: 'Failed to fetch LinkedIn profile' });
    }
  },

  async getTwitterProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;
      const { username } = req.query;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!username) {
        return res.status(400).json({ error: 'Twitter username required' });
      }

      // TODO: Implement Twitter API integration
      // Twitter API v2 requires authentication and specific endpoints
      
      res.json({ 
        message: 'Twitter integration coming soon',
        note: 'Twitter API v2 requires authentication setup'
      });
    } catch (error) {
      console.error('Twitter profile error:', error);
      res.status(500).json({ error: 'Failed to fetch Twitter profile' });
    }
  },

  async connectPlatform(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;
      const { platform } = req.params;
      const { accessToken, profileData } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Save social connection
      const connection = await prisma.socialConnection.upsert({
        where: {
          userId_platform: {
            userId,
            platform
          }
        },
        update: {
          accessToken,
          profileData,
          updatedAt: new Date()
        },
        create: {
          userId,
          platform,
          accessToken,
          profileData
        }
      });

      res.json({ 
        message: `${platform} connected successfully`,
        connection
      });
    } catch (error) {
      console.error('Connect platform error:', error);
      res.status(500).json({ error: 'Failed to connect platform' });
    }
  },

  async disconnectPlatform(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;
      const { platform } = req.params;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      await prisma.socialConnection.delete({
        where: {
          userId_platform: {
            userId,
            platform
          }
        }
      });

      res.json({ 
        message: `${platform} disconnected successfully`
      });
    } catch (error) {
      console.error('Disconnect platform error:', error);
      res.status(500).json({ error: 'Failed to disconnect platform' });
    }
  }
}; 