const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

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
  sections: any[];
  projects: any[];
  skills: any[];
}

export const api = {
  // Auth endpoints
  auth: {
    register: async (data: { email: string; password: string; name: string }) => {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },

    login: async (data: { email: string; password: string }) => {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  },

  // Portfolio endpoints
  portfolio: {
    getAll: async (): Promise<Portfolio[]> => {
      const response = await fetch(`${API_BASE}/api/portfolio`);
      return response.json();
    },

    create: async (data: { title: string; description?: string; userId: string }): Promise<Portfolio> => {
      const response = await fetch(`${API_BASE}/api/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  },

  // Health check
  health: async () => {
    const response = await fetch(`${API_BASE}/api/health`);
    return response.json();
  },
}; 