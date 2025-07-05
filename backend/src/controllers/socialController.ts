import { Request, Response } from 'express';
import axios from 'axios';
import { prisma } from '../index';

export const socialController = {
  async getGitHubProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      const { username } = req.query;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      if (!username) {
        res.status(400).json({ error: 'GitHub username required' });
        return;
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

  async getGitHubRepos(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      const { username } = req.query;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      if (!username) {
        res.status(400).json({ error: 'GitHub username required' });
        return;
      }

      const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
      const repos = response.data;

      res.json({ repositories: repos });
    } catch (error) {
      console.error('GitHub repos error:', error);
      res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
    }
  },

  async getLinkedInProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
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

  async getTwitterProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      const { username } = req.query;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      if (!username) {
        res.status(400).json({ error: 'Twitter username required' });
        return;
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

  async connectPlatform(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      const { platform } = req.params;
      const { accessToken, profileData } = req.body;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
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

  async disconnectPlatform(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      const { platform } = req.params;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
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
  },

  async connectGitHub(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { username } = req.body;

      if (!username) {
        res.status(400).json({ error: 'GitHub username required' });
        return;
      }

      // TODO: Fetch GitHub data using GitHub API
      const githubData = {
        username,
        repos: 25,
        followers: 150,
        bio: 'Full-stack developer passionate about AI and web technologies',
        avatar: `https://github.com/${username}.png`
      };

      const socialConnection = await prisma.socialConnection.upsert({
        where: {
          userId_platform: {
            userId,
            platform: 'github'
          }
        },
        update: {
          username,
          data: githubData
        },
        create: {
          userId,
          platform: 'github',
          username,
          data: githubData
        }
      });

      res.json({ socialConnection });
    } catch (error) {
      console.error('Connect GitHub error:', error);
      res.status(500).json({ error: 'Failed to connect GitHub' });
    }
  },

  async getGitHubData(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { username } = req.params;

      if (!username) {
        res.status(400).json({ error: 'GitHub username required' });
        return;
      }

      // TODO: Fetch real GitHub data using GitHub API
      const githubData = {
        username,
        repos: [
          {
            name: 'ai-portfolio-builder',
            description: 'AI-powered portfolio generation service',
            language: 'TypeScript',
            stars: 45,
            forks: 12
          },
          {
            name: 'react-dashboard',
            description: 'Modern React dashboard with TypeScript',
            language: 'TypeScript',
            stars: 23,
            forks: 8
          }
        ],
        profile: {
          bio: 'Full-stack developer passionate about AI and web technologies',
          location: 'San Francisco, CA',
          company: 'Tech Startup',
          blog: 'https://example.com',
          twitter: '@username'
        }
      };

      res.json({ githubData });
    } catch (error) {
      console.error('Get GitHub data error:', error);
      res.status(500).json({ error: 'Failed to get GitHub data' });
    }
  },

  async getSocialConnections(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const connections = await prisma.socialConnection.findMany({
        where: { userId }
      });

      res.json({ connections });
    } catch (error) {
      console.error('Get social connections error:', error);
      res.status(500).json({ error: 'Failed to get social connections' });
    }
  },

  async connectTwitter(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { username } = req.body;

      if (!username) {
        res.status(400).json({ error: 'Twitter username required' });
        return;
      }

      // TODO: Fetch Twitter data using Twitter API
      const twitterData = {
        username,
        followers: 1200,
        following: 500,
        tweets: 850,
        bio: 'Tech enthusiast | Full-stack developer | AI/ML practitioner'
      };

      const socialConnection = await prisma.socialConnection.upsert({
        where: {
          userId_platform: {
            userId,
            platform: 'twitter'
          }
        },
        update: {
          username,
          data: twitterData
        },
        create: {
          userId,
          platform: 'twitter',
          username,
          data: twitterData
        }
      });

      res.json({ socialConnection });
    } catch (error) {
      console.error('Connect Twitter error:', error);
      res.status(500).json({ error: 'Failed to connect Twitter' });
    }
  },

  async disconnectSocial(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { platform } = req.params;

      await prisma.socialConnection.deleteMany({
        where: {
          userId,
          platform
        }
      });

      res.json({ message: `${platform} disconnected successfully` });
    } catch (error) {
      console.error('Disconnect social error:', error);
      res.status(500).json({ error: 'Failed to disconnect social account' });
    }
  }
}; 