# AI Portfolio Builder - MVP Setup Guide 🚀

This guide will help you set up and run the AI Portfolio Builder MVP locally.

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
- `POST /api/ai/analyze-profile` - Analyze social profiles
- `POST /api/ai/generate-content` - Generate portfolio content
- `POST /api/ai/suggest-improvements` - Get improvement suggestions
- `POST /api/ai/optimize-portfolio` - Optimize portfolio

## 🎯 MVP Features

### ✅ Implemented
- [x] User authentication (register/login)
- [x] Portfolio CRUD operations
- [x] GitHub API integration
- [x] AI content generation (OpenAI integration)
- [x] Modern UI with Tailwind CSS
- [x] Responsive design
- [x] Database schema with Prisma

### 🚧 In Progress
- [ ] LinkedIn API integration
- [ ] Twitter API integration
- [ ] Portfolio templates
- [ ] Real-time updates
- [ ] Analytics dashboard

### 📋 Planned
- [ ] Email notifications
- [ ] Portfolio sharing
- [ ] Custom domains
- [ ] Advanced AI features
- [ ] Team collaboration

## 🔑 API Keys Setup

### OpenAI API
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account and get your API key
3. Add it to your backend `.env` file

### GitHub OAuth (Optional)
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set callback URL to `http://localhost:3000/api/auth/callback/github`
4. Add client ID and secret to your environment files

### LinkedIn OAuth (Optional)
1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Create a new app
3. Configure OAuth 2.0 settings
4. Add client ID and secret to your environment files

## 🐛 Troubleshooting

### Common Issues

#### Database Connection
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Create database if it doesn't exist
createdb ai_portfolio_db
```

#### Port Conflicts
```bash
# Check if ports are in use
lsof -i :3000
lsof -i :5000

# Kill processes if needed
kill -9 <PID>
```

#### Prisma Issues
```bash
# Reset database
npx prisma migrate reset

# Regenerate client
npx prisma generate
```

#### Frontend Build Issues
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## 📚 Development Workflow

### 1. Feature Development
```bash
# Create a new feature branch
git checkout -b feature/new-feature

# Make your changes
# Test locally

# Commit and push
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

### 2. Database Changes
```bash
# Create a new migration
npx prisma migrate dev --name descriptive-name

# Update the schema
# Edit prisma/schema.prisma

# Apply changes
npx prisma migrate dev
```

### 3. API Testing
```bash
# Test API endpoints
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

## 🚀 Deployment

### Backend Deployment (Railway/Render)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Frontend Deployment (Vercel)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Database Deployment
- **Railway**: Managed PostgreSQL
- **Supabase**: Free tier available
- **Neon**: Serverless PostgreSQL

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the logs in your terminal
3. Check the browser console for frontend errors
4. Verify your environment variables are set correctly
5. Ensure all dependencies are installed

## 🎉 Next Steps

Once you have the MVP running:

1. **Test the core features**: Registration, login, portfolio creation
2. **Connect social profiles**: Start with GitHub integration
3. **Generate your first portfolio**: Use the AI features
4. **Customize the design**: Modify templates and styling
5. **Add more features**: Implement LinkedIn/Twitter integration
6. **Deploy to production**: Set up hosting and domains

Happy coding! 🚀 