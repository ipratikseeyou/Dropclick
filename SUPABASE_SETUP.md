# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to be set up

## 2. Get Your Project Credentials

1. Go to your project dashboard
2. Navigate to Settings > API
3. Copy your:
   - Project URL
   - Anon/Public key

## 3. Set Up the Database

1. Go to the SQL Editor in your Supabase dashboard
2. Run the SQL from `supabase-simple-setup.sql`:

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 4. Configure Environment Variables

### Local Development
1. Copy `frontend/env.local.example` to `frontend/.env.local`
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

### Vercel Deployment
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the same environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`

## 5. Test the Setup

1. Start your development server: `npm run dev`
2. Try registering a new user
3. Try logging in with the registered user
4. Check your Supabase dashboard to see the user data

## Security Notes

This is a simple setup for development. For production:

1. **Use Supabase Auth**: Replace custom auth with Supabase's built-in authentication
2. **Hash Passwords**: Use bcrypt or similar for password hashing
3. **Enable RLS**: Use Row Level Security for data protection
4. **Session Management**: Implement proper session handling
5. **Input Validation**: Add comprehensive input validation

## Troubleshooting

- **Connection Issues**: Check your Supabase URL and API key
- **Table Not Found**: Make sure you ran the SQL setup script
- **CORS Errors**: Supabase handles CORS automatically for the configured domains 