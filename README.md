# kaffeehai 🚀

An AI-powered portfolio generation service that automatically builds and maintains professional portfolios from your social profiles.

## 🎯 Features

- **AI-Powered Portfolio Generation**: Automatically creates professional portfolios from social media data
- **Multi-Platform Integration**: GitHub, LinkedIn, Twitter/X support
- **Smart Content Analysis**: AI analyzes your posts, projects, and activities
- **Dynamic Templates**: Beautiful, responsive portfolio templates
- **Real-time Updates**: Portfolios update automatically as your social profiles change
- **Customization**: Easy-to-use editor for fine-tuning generated content

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   AI Service    │
│   (Next.js)     │◄──►│   (Node.js)     │◄──►│   (OpenAI)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Social APIs   │    │   Database      │    │   Auth Service  │
│   (GitHub,      │    │   (PostgreSQL)  │    │   (NextAuth)    │
│    LinkedIn,    │    │                 │    │                 │
│    Twitter)     │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **AI**: OpenAI GPT-4 API
- **Authentication**: NextAuth.js
- **Deployment**: Vercel + Railway

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- OpenAI API key
- GitHub OAuth app
- LinkedIn OAuth app
- Twitter API access

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ai-portfolio-builder
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
```bash
# Frontend (.env.local)
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
GITHUB_ID=your-github-oauth-id
GITHUB_SECRET=your-github-oauth-secret
LINKEDIN_ID=your-linkedin-oauth-id
LINKEDIN_SECRET=your-linkedin-oauth-secret
OPENAI_API_KEY=your-openai-api-key

# Backend (.env)
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
OPENAI_API_KEY=your-openai-api-key
JWT_SECRET=your-jwt-secret
```

4. Run the development servers
```bash
# Frontend
cd frontend
npm run dev

# Backend
cd ../backend
npm run dev
```

## 📁 Project Structure

```
ai-portfolio-builder/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App router pages
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utility functions
│   └── styles/              # CSS and styling
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Database models
│   │   └── routes/          # API routes
│   └── prisma/              # Database schema
└── docs/                    # Documentation
```

## 🎨 Portfolio Templates

- **Modern Minimal**: Clean, professional design
- **Creative Developer**: Showcase technical skills
- **Business Professional**: Corporate-friendly layout
- **Creative Portfolio**: Artistic and creative focus

## 🔄 Development Workflow

1. **Social Integration**: Connect social media accounts
2. **Data Collection**: Fetch and analyze social data
3. **AI Processing**: Generate portfolio content
4. **Template Application**: Apply selected template
5. **Customization**: Allow user editing
6. **Deployment**: Generate and host portfolio

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support, email support@aiportfoliobuilder.com or create an issue in this repository. 