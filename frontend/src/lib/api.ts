const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface PortfolioData {
  title: string;
  description?: string;
  userId: string;
}

interface ApiResponse<T> {
  message?: string;
  error?: string;
  data?: T;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: string;
  sections: unknown[];
  projects: unknown[];
  skills: unknown[];
}

export const api = {
  // Auth endpoints
  async login(data: LoginData): Promise<ApiResponse<{ user: { id: string; email: string; name: string } }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch {
      return { error: 'Network error' };
    }
  },

  async register(data: RegisterData): Promise<ApiResponse<{ user: { id: string; email: string; name: string } }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch {
      return { error: 'Network error' };
    }
  },

  async createPortfolio(data: PortfolioData): Promise<ApiResponse<{ id: string; title: string; description: string; userId: string; createdAt: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch {
      return { error: 'Network error' };
    }
  },

  // Portfolio endpoints
  portfolio: {
    getAll: async (): Promise<Portfolio[]> => {
      const response = await fetch(`${API_BASE_URL}/portfolio`);
      return response.json();
    },
  },

  // Health check
  health: async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },
}; 