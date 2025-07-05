import { Request, Response } from 'express';
import { prisma } from '../index';

export const portfolioController = {
  async getPortfolios(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const portfolios = await prisma.portfolio.findMany({
        where: { userId },
        include: {
          sections: true,
          socialConnections: true
        }
      });

      res.json({ portfolios });
    } catch (error) {
      console.error('Get portfolios error:', error);
      res.status(500).json({ error: 'Failed to get portfolios' });
    }
  },

  async createPortfolio(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;
      const { title, description, template } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const portfolio = await prisma.portfolio.create({
        data: {
          title,
          description,
          template,
          userId
        },
        include: {
          sections: true
        }
      });

      res.status(201).json({ portfolio });
    } catch (error) {
      console.error('Create portfolio error:', error);
      res.status(500).json({ error: 'Failed to create portfolio' });
    }
  },

  async getPortfolio(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const portfolio = await prisma.portfolio.findFirst({
        where: { 
          id,
          userId 
        },
        include: {
          sections: true,
          socialConnections: true
        }
      });

      if (!portfolio) {
        return res.status(404).json({ error: 'Portfolio not found' });
      }

      res.json({ portfolio });
    } catch (error) {
      console.error('Get portfolio error:', error);
      res.status(500).json({ error: 'Failed to get portfolio' });
    }
  },

  async updatePortfolio(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.userId;
      const updateData = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const portfolio = await prisma.portfolio.findFirst({
        where: { 
          id,
          userId 
        }
      });

      if (!portfolio) {
        return res.status(404).json({ error: 'Portfolio not found' });
      }

      const updatedPortfolio = await prisma.portfolio.update({
        where: { id },
        data: updateData,
        include: {
          sections: true
        }
      });

      res.json({ portfolio: updatedPortfolio });
    } catch (error) {
      console.error('Update portfolio error:', error);
      res.status(500).json({ error: 'Failed to update portfolio' });
    }
  },

  async deletePortfolio(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const portfolio = await prisma.portfolio.findFirst({
        where: { 
          id,
          userId 
        }
      });

      if (!portfolio) {
        return res.status(404).json({ error: 'Portfolio not found' });
      }

      await prisma.portfolio.delete({
        where: { id }
      });

      res.json({ message: 'Portfolio deleted successfully' });
    } catch (error) {
      console.error('Delete portfolio error:', error);
      res.status(500).json({ error: 'Failed to delete portfolio' });
    }
  },

  async generatePortfolio(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const portfolio = await prisma.portfolio.findFirst({
        where: { 
          id,
          userId 
        },
        include: {
          socialConnections: true
        }
      });

      if (!portfolio) {
        return res.status(404).json({ error: 'Portfolio not found' });
      }

      // TODO: Implement AI portfolio generation logic
      // This will integrate with the AI service to generate content

      res.json({ 
        message: 'Portfolio generation started',
        portfolioId: id
      });
    } catch (error) {
      console.error('Generate portfolio error:', error);
      res.status(500).json({ error: 'Failed to generate portfolio' });
    }
  }
}; 