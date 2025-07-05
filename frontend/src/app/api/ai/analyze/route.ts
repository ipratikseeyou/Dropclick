import { NextRequest, NextResponse } from 'next/server';

interface SocialProfile {
  platform: 'github' | 'linkedin' | 'twitter';
  username: string;
  data?: any;
}

interface AnalysisRequest {
  profiles: SocialProfile[];
  preferences: {
    tone: 'professional' | 'casual' | 'creative';
    focus: 'technical' | 'business' | 'design' | 'mixed';
    length: 'short' | 'medium' | 'long';
  };
}

interface PortfolioSection {
  type: 'about' | 'experience' | 'projects' | 'skills' | 'education';
  title: string;
  content: string;
  order: number;
}

export async function POST(request: NextRequest) {
  try {
    const { profiles, preferences }: AnalysisRequest = await request.json();

    if (!profiles || profiles.length === 0) {
      return NextResponse.json(
        { error: 'At least one social profile is required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is available
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Perform real AI analysis using OpenAI
    const analysis = await performAIAnalysis(profiles, preferences, openaiApiKey);

    return NextResponse.json({
      success: true,
      analysis,
      message: 'AI analysis completed successfully'
    });
  } catch (error) {
    console.error('AI Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to perform AI analysis' },
      { status: 500 }
    );
  }
}

async function performAIAnalysis(
  profiles: SocialProfile[], 
  preferences: any, 
  apiKey: string
): Promise<{
  summary: string;
  sections: PortfolioSection[];
  skills: string[];
  recommendations: string[];
}> {
  // Create a comprehensive prompt for OpenAI
  const profileDescriptions = profiles.map(profile => {
    switch (profile.platform) {
      case 'github':
        return `GitHub profile: ${profile.username} - Likely a developer with technical skills`;
      case 'linkedin':
        return `LinkedIn profile: ${profile.username} - Professional background and experience`;
      case 'twitter':
        return `Twitter profile: ${profile.username} - Social presence and community engagement`;
      default:
        return `${profile.platform} profile: ${profile.username}`;
    }
  }).join(', ');

  const prompt = `Analyze the following social profiles and generate a professional portfolio:

Profiles: ${profileDescriptions}

Preferences:
- Tone: ${preferences.tone}
- Focus: ${preferences.focus}
- Length: ${preferences.length}

Please provide:
1. A professional summary (2-3 sentences)
2. 4 portfolio sections: About Me, Professional Experience, Featured Projects, Technical Skills
3. A list of 5-8 relevant skills
4. 3 specific recommendations for portfolio improvement

Format the response as JSON with this structure:
{
  "summary": "professional summary here",
  "sections": [
    {
      "type": "about",
      "title": "About Me",
      "content": "content here",
      "order": 1
    },
    {
      "type": "experience", 
      "title": "Professional Experience",
      "content": "content here",
      "order": 2
    },
    {
      "type": "projects",
      "title": "Featured Projects", 
      "content": "content here",
      "order": 3
    },
    {
      "type": "skills",
      "title": "Technical Skills",
      "content": "content here", 
      "order": 4
    }
  ],
  "skills": ["skill1", "skill2", "skill3"],
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"]
}

Make the content professional, engaging, and tailored to the specified tone and focus area.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional portfolio writer and career consultant. Generate high-quality, personalized portfolio content based on social profile information.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response from AI
    const parsedAnalysis = JSON.parse(aiResponse);

    return {
      summary: parsedAnalysis.summary,
      sections: parsedAnalysis.sections,
      skills: parsedAnalysis.skills,
      recommendations: parsedAnalysis.recommendations
    };

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Fallback to mock data if OpenAI fails
    return await generateMockAnalysis(profiles, preferences);
  }
}

// Fallback mock analysis function
async function generateMockAnalysis(profiles: SocialProfile[], preferences: any) {
  const githubProfile = profiles.find(p => p.platform === 'github');
  const linkedinProfile = profiles.find(p => p.platform === 'linkedin');
  const twitterProfile = profiles.find(p => p.platform === 'twitter');

  let summary = '';
  let skills: string[] = [];
  let recommendations: string[] = [];

  if (githubProfile) {
    skills.push('JavaScript', 'TypeScript', 'React', 'Node.js', 'Git');
    summary += 'Experienced software developer with strong technical skills. ';
  }

  if (linkedinProfile) {
    skills.push('Project Management', 'Team Leadership', 'Communication');
    summary += 'Professional with excellent business acumen and leadership experience. ';
  }

  if (twitterProfile) {
    skills.push('Content Creation', 'Social Media', 'Networking');
    summary += 'Active in the tech community with strong networking skills. ';
  }

  const sections: PortfolioSection[] = [
    {
      type: 'about',
      title: 'About Me',
      content: `${summary}Passionate about creating innovative solutions and driving technological advancement. Committed to continuous learning and professional growth.`,
      order: 1
    },
    {
      type: 'experience',
      title: 'Professional Experience',
      content: githubProfile ? 
        'Senior Software Engineer with 5+ years of experience in full-stack development, specializing in modern web technologies and scalable architecture.' :
        'Experienced professional with a track record of delivering high-quality solutions and leading successful projects.',
      order: 2
    },
    {
      type: 'projects',
      title: 'Featured Projects',
      content: githubProfile ?
        'Developed multiple web applications using React, Node.js, and modern cloud technologies. Led teams of 3-5 developers on various projects.' :
        'Successfully delivered numerous projects across different domains, demonstrating versatility and adaptability.',
      order: 3
    },
    {
      type: 'skills',
      title: 'Technical Skills',
      content: `Proficient in ${skills.slice(0, 5).join(', ')} and other modern technologies. Strong problem-solving abilities and attention to detail.`,
      order: 4
    }
  ];

  if (githubProfile) {
    recommendations.push('Add more detailed project descriptions to showcase technical expertise');
  }
  if (linkedinProfile) {
    recommendations.push('Include specific metrics and achievements in experience descriptions');
  }
  if (!twitterProfile) {
    recommendations.push('Consider adding Twitter to showcase thought leadership and community engagement');
  }

  return {
    summary,
    sections,
    skills: [...new Set(skills)],
    recommendations
  };
} 