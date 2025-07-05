import { NextRequest, NextResponse } from 'next/server';

// Mock portfolios
const portfolios: any[] = [];

export async function GET() {
  return NextResponse.json(portfolios);
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, userId } = await request.json();
    
    if (!title || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const portfolio = {
      id: Date.now().toString(),
      title,
      description: description || '',
      userId,
      createdAt: new Date().toISOString(),
      sections: [],
      projects: [],
      skills: []
    };

    portfolios.push(portfolio);
    return NextResponse.json(portfolio, { status: 201 });
  } catch (error) {
    console.error('Portfolio creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 