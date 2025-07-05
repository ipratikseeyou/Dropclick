import { Request, Response } from 'express';
import OpenAI from 'openai';
import { prisma } from '../index';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const aiController = {
  async analyzeProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;
      const { socialData } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!socialData) {
        return res.status(400).json({ error: 'Social data required' });
      }

      // Create analysis prompt
      const prompt = `
        Analyze the following social media profile data and provide insights for a professional portfolio:
        
        GitHub Data: ${JSON.stringify(socialData.github || {})}
        LinkedIn Data: ${JSON.stringify(socialData.linkedin || {})}
        Twitter Data: ${JSON.stringify(socialData.twitter || {})}
        
        Please provide:
        1. Professional summary
        2. Key skills and technologies
        3. Notable projects and achievements
        4. Professional experience highlights
        5. Recommendations for portfolio sections
        6. Suggested improvements
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert career advisor and portfolio consultant. Analyze social media data to create compelling professional insights."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      });

      const analysis = completion.choices[0].message.content;

      res.json({
        analysis: analysis,
        insights: {
          skills: [],
          projects: [],
          experience: []
        }
      });
    } catch (error) {
      console.error('Profile analysis error:', error);
      res.status(500).json({ error: 'Failed to analyze profile' });
    }
  },

  async generateContent(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;
      const { section, context, template } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!section || !context) {
        return res.status(400).json({ error: 'Section and context required' });
      }

      const prompt = `
        Generate professional content for a portfolio ${section} section.
        
        Context: ${context}
        Template Style: ${template || 'modern professional'}
        
        Please create compelling, professional content that highlights achievements and skills.
        Make it engaging and suitable for potential employers or clients.
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a professional content writer specializing in portfolio creation. Write compelling, authentic content that showcases professional achievements."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 800,
        temperature: 0.8
      });

      const content = completion.choices[0].message.content;

      res.json({
        content,
        section,
        generatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Content generation error:', error);
      res.status(500).json({ error: 'Failed to generate content' });
    }
  },

  async suggestImprovements(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;
      const { portfolioData } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!portfolioData) {
        return res.status(400).json({ error: 'Portfolio data required' });
      }

      const prompt = `
        Review this portfolio and suggest improvements:
        
        Portfolio Data: ${JSON.stringify(portfolioData)}
        
        Please provide:
        1. Content improvements
        2. Structure suggestions
        3. Missing sections to add
        4. SEO optimization tips
        5. Visual design recommendations
        6. Call-to-action suggestions
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a portfolio optimization expert. Provide actionable suggestions to improve portfolio effectiveness and professional appeal."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      });

      const suggestions = completion.choices[0].message.content;

      res.json({
        suggestions,
        improvements: {
          content: [],
          structure: [],
          seo: [],
          design: []
        }
      });
    } catch (error) {
      console.error('Improvement suggestions error:', error);
      res.status(500).json({ error: 'Failed to generate suggestions' });
    }
  },

  async optimizePortfolio(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;
      const { portfolioId } = req.params;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Get portfolio data
      const portfolio = await prisma.portfolio.findFirst({
        where: { 
          id: portfolioId,
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

      const prompt = `
        Optimize this portfolio for maximum impact:
        
        Portfolio: ${JSON.stringify(portfolio)}
        
        Please provide:
        1. Optimized content for each section
        2. Improved structure and flow
        3. Enhanced professional summary
        4. Better project descriptions
        5. Optimized keywords for SEO
        6. Improved call-to-actions
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a portfolio optimization expert. Transform portfolios to maximize professional impact and engagement."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.7
      });

      const optimizedContent = completion.choices[0].message.content;

      res.json({
        optimizedContent,
        portfolioId,
        optimizedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Portfolio optimization error:', error);
      res.status(500).json({ error: 'Failed to optimize portfolio' });
    }
  }
}; 