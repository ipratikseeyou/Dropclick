-- Create users table for custom authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: This is a simple setup for custom authentication
-- In production, you should:
-- 1. Use Supabase Auth instead of custom auth
-- 2. Hash passwords with bcrypt
-- 3. Enable Row Level Security (RLS)
-- 4. Use proper session management 