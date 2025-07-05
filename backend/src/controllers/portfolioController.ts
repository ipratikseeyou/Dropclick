import { Request, Response } from 'express';
import { prisma } from '../index';

export const portfolioController = {
  async getPortfolios(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
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
        res.status(401).json({ error: 'Unauthorized' });
        return;
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
        res.status(401).json({ error: 'Unauthorized' });
        return;
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
        res.status(404).json({ error: 'Portfolio not found' });
        return;
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
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const portfolio = await prisma.portfolio.findFirst({
        where: { 
          id,
          userId 
        }
      });

      if (!portfolio) {
        res.status(404).json({ error: 'Portfolio not found' });
        return;
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
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const portfolio = await prisma.portfolio.findFirst({
        where: { 
          id,
          userId 
        }
      });

      if (!portfolio) {
        res.status(404).json({ error: 'Portfolio not found' });
        return;
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
        res.status(401).json({ error: 'Unauthorized' });
        return;
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
        res.status(404).json({ error: 'Portfolio not found' });
        return;
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