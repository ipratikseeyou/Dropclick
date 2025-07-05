export default function TestEnvPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      
      <div className="space-y-4">
        <div>
          <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>
          <span className="ml-2">
            {process.env.NEXT_PUBLIC_SUPABASE_URL ? 
              '✅ SET' : 
              '❌ NOT SET'
            }
          </span>
        </div>
        
        <div>
          <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>
          <span className="ml-2">
            {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 
              '✅ SET' : 
              '❌ NOT SET'
            }
          </span>
        </div>
        
        <div>
          <strong>OPENAI_API_KEY:</strong>
          <span className="ml-2">
            {process.env.OPENAI_API_KEY ? 
              '✅ SET' : 
              '❌ NOT SET'
            }
          </span>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">Debug Info:</h2>
        <p>Node Environment: {process.env.NODE_ENV}</p>
        <p>Build Time: {new Date().toISOString()}</p>
      </div>
    </div>
  );
} 