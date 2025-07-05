'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Sparkles, 
  CheckCircle, 
  Loader2,
  ArrowRight,
  Settings,
  FileText,
  Star
} from 'lucide-react';

interface SocialProfile {
  platform: 'github' | 'linkedin' | 'twitter';
  username: string;
  connected: boolean;
}

interface AIPreferences {
  tone: 'professional' | 'casual' | 'creative';
  focus: 'technical' | 'business' | 'design' | 'mixed';
  length: 'short' | 'medium' | 'long';
}

interface PortfolioSection {
  type: 'about' | 'experience' | 'projects' | 'skills' | 'education';
  title: string;
  content: string;
  order: number;
}

interface AIAnalysis {
  summary: string;
  sections: PortfolioSection[];
  skills: string[];
  recommendations: string[];
}

export default function AIGeneratePage() {
  const router = useRouter();
  const [step, setStep] = useState<'connect' | 'preferences' | 'analyzing' | 'results'>('connect');
  const [profiles, setProfiles] = useState<SocialProfile[]>([
    { platform: 'github', username: '', connected: false },
    { platform: 'linkedin', username: '', connected: false },
    { platform: 'twitter', username: '', connected: false }
  ]);
  const [preferences, setPreferences] = useState<AIPreferences>({
    tone: 'professional',
    focus: 'mixed',
    length: 'medium'
  });
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);

  const handleProfileChange = (platform: 'github' | 'linkedin' | 'twitter', username: string) => {
    setProfiles(prev => prev.map(p => 
      p.platform === platform 
        ? { ...p, username, connected: username.length > 0 }
        : p
    ));
  };

  const handlePreferenceChange = (key: keyof AIPreferences, value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleAnalyze = async () => {
    setStep('analyzing');

    try {
      const connectedProfiles = profiles.filter(p => p.connected);
      
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profiles: connectedProfiles,
          preferences
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAnalysis(data.analysis);
        setStep('results');
      } else {
        console.error('Analysis failed:', data.error);
        alert('Analysis failed. Please try again.');
        setStep('preferences');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Network error. Please check your connection.');
      setStep('preferences');
    }
  };

  const handleCreatePortfolio = () => {
    // Navigate to portfolio creation with AI-generated content
    router.push('/dashboard?ai-generated=true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">AI Portfolio Generator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect your social profiles and let AI create a stunning professional portfolio
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step !== 'connect' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step !== 'connect' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                {step !== 'connect' ? <CheckCircle className="h-5 w-5" /> : '1'}
              </div>
              <span className="ml-2">Connect Profiles</span>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <div className={`flex items-center ${step === 'preferences' || step === 'analyzing' || step === 'results' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'preferences' || step === 'analyzing' || step === 'results' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                {step === 'preferences' || step === 'analyzing' || step === 'results' ? <Settings className="h-5 w-5" /> : '2'}
              </div>
              <span className="ml-2">Preferences</span>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <div className={`flex items-center ${step === 'analyzing' || step === 'results' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'analyzing' || step === 'results' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                {step === 'analyzing' ? <Loader2 className="h-5 w-5 animate-spin" /> : step === 'results' ? <FileText className="h-5 w-5" /> : '3'}
              </div>
              <span className="ml-2">Generate</span>
            </div>
          </div>
        </div>

        {/* Step 1: Connect Profiles */}
        {step === 'connect' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Connect Your Social Profiles</h2>
              <p className="text-gray-600 mb-6">
                Connect your social profiles to help AI understand your background and generate relevant content.
              </p>
              
              <div className="space-y-4">
                {profiles.map((profile) => (
                  <div key={profile.platform} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {profile.platform === 'github' && <Github className="h-6 w-6 text-gray-900" />}
                      {profile.platform === 'linkedin' && <Linkedin className="h-6 w-6 text-blue-600" />}
                      {profile.platform === 'twitter' && <Twitter className="h-6 w-6 text-blue-400" />}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                        {profile.platform} Username
                      </label>
                      <input
                        type="text"
                        placeholder={`Enter your ${profile.platform} username`}
                        value={profile.username}
                        onChange={(e) => handleProfileChange(profile.platform, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex-shrink-0">
                      {profile.connected && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button
                  onClick={() => setStep('preferences')}
                  disabled={!profiles.some(p => p.connected)}
                  className="w-full"
                >
                  Continue to Preferences
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Preferences */}
        {step === 'preferences' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Customize Your Portfolio</h2>
              <p className="text-gray-600 mb-6">
                Choose your preferences to help AI generate content that matches your style.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                  <select
                    value={preferences.tone}
                    onChange={(e) => handlePreferenceChange('tone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="creative">Creative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Focus Area</label>
                  <select
                    value={preferences.focus}
                    onChange={(e) => handlePreferenceChange('focus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="mixed">Mixed</option>
                    <option value="technical">Technical</option>
                    <option value="business">Business</option>
                    <option value="design">Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content Length</label>
                  <select
                    value={preferences.length}
                    onChange={(e) => handlePreferenceChange('length', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setStep('connect')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleAnalyze}
                  className="flex-1"
                >
                  Generate Portfolio
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Analyzing */}
        {step === 'analyzing' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">AI is Analyzing Your Profiles</h2>
              <p className="text-gray-600">
                Our AI is analyzing your social profiles and generating personalized portfolio content...
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 'results' && analysis && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">AI-Generated Portfolio</h2>
                <Button onClick={handleCreatePortfolio}>
                  Create Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Summary</h3>
                <p className="text-gray-700">{analysis.summary}</p>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Skills Identified</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Portfolio Sections */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Portfolio Sections</h3>
                <div className="space-y-4">
                  {analysis.sections.map((section, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{section.title}</h4>
                      <p className="text-gray-700 text-sm">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-lg font-medium mb-2">AI Recommendations</h3>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 