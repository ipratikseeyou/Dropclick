# kaffeehai - MVP Setup Guide 🚀

This guide will help you set up and run the kaffeehai MVP locally.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## 🏗️ Project Structure

```
ai-portfolio-builder/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   └── lib/             # Utility functions
│   └── package.json
├── backend/                  # Node.js backend API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── routes/          # API routes
│   │   └── middleware/      # Auth middleware
│   ├── prisma/              # Database schema
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-portfolio-builder

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Database Setup

```bash
# Navigate to backend directory
cd backend

# Create a PostgreSQL database
# You can use a local PostgreSQL instance or a cloud service like Railway, Supabase, etc.

# Set up your environment variables
cp env.example .env
# Edit .env with your database URL and other credentials
```

### 3. Environment Configuration

#### Backend (.env)
```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ai_portfolio_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"

# OpenAI
OPENAI_API_KEY="your-openai-api-key-here"

# Server
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

#### Frontend (.env.local)
```bash
# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Backend API
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

### 4. Database Migration

```bash
# Navigate to backend directory
cd backend

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) View your database with Prisma Studio
npx prisma studio
```

### 5. Start the Development Servers

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health
- **Database Studio**: http://localhost:5555 (if running Prisma Studio)

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get user profile
- `POST /api/auth/refresh` - Refresh JWT token

### Portfolios
- `GET /api/portfolio` - Get user portfolios
- `POST /api/portfolio` - Create new portfolio
- `GET /api/portfolio/:id` - Get specific portfolio
- `PUT /api/portfolio/:id` - Update portfolio
- `DELETE /api/portfolio/:id` - Delete portfolio
- `POST /api/portfolio/:id/generate` - Generate portfolio with AI

### Social Media Integration
- `GET /api/social/github/profile` - Get GitHub profile
- `GET /api/social/github/repos` - Get GitHub repositories
- `POST /api/social/connect/:platform` - Connect social platform
- `DELETE /api/social/disconnect/:platform` - Disconnect platform

### AI Services
- `