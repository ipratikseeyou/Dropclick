import { NextRequest, NextResponse } from 'next/server';

// Mock database for now
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
}

const users: User[] = [];

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create user (without password hashing for now)
    const user: User = {
      id: Date.now().toString(),
      email,
      password, // In production, hash this
      name,
      createdAt: new Date().toISOString()
    };

    users.push(user);

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 