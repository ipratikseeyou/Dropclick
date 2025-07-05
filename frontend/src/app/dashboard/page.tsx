'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Settings, 
  Github, 
  Linkedin, 
  Twitter, 
  Sparkles,
  Eye,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react';

export default function DashboardPage() {
  const [portfolios] = useState([
    {
      id: '1',
      title: 'My Professional Portfolio',
      description: 'Full-stack developer portfolio',
      template: 'modern',
      isPublished: true,
      slug: 'john-doe',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Creative Portfolio',
      description: 'Design and development showcase',
      template: 'creative',
      isPublished: false,
      slug: 'john-doe-creative',
      updatedAt: '2024-01-10'
    }
  ]);

  const [socialConnections] = useState([
    { platform: 'github', connected: true, username: 'johndoe' },
    { platform: 'linkedin', connected: false, username: null },
    { platform: 'twitter', connected: false, username: null }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">AI Portfolio Builder</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, John!
          </h1>
          <p className="text-gray-600">
            Manage your portfolios and social connections
          </p>
        </div>

        {/* Social Connections */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Social Connections
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {socialConnections.map((connection) => (
              <div
                key={connection.platform}
                className={`p-4 rounded-lg border ${
                  connection.connected 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {connection.platform === 'github' && <Github className="h-5 w-5" />}
                    {connection.platform === 'linkedin' && <Linkedin className="h-5 w-5" />}
                    {connection.platform === 'twitter' && <Twitter className="h-5 w-5" />}
                    <div>
                      <p className="font-medium text-gray-900 capitalize">
                        {connection.platform}
                      </p>
                      <p className="text-sm text-gray-500">
                        {connection.connected ? connection.username : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={connection.connected ? "outline" : "default"}
                    size="sm"
                  >
                    {connection.connected ? 'Connected' : 'Connect'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolios */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Portfolios
            </h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Portfolio
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {portfolio.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {portfolio.description}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span className="capitalize">{portfolio.template}</span>
                      <span>•</span>
                      <span>Updated {portfolio.updatedAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {portfolio.isPublished && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Published
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Sparkles className="h-4 w-4 mr-1" />
                      Generate
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    {portfolio.isPublished && (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {portfolios.length === 0 && (
            <div className="text-center py-12">
              <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No portfolios yet
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first AI-powered portfolio to get started
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Portfolio
              </Button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Generate Portfolio
            </h3>
            <p className="text-gray-600 mb-4">
              Let AI analyze your social profiles and create a professional portfolio
            </p>
            <Button className="w-full">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate with AI
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Connect Social Profiles
            </h3>
            <p className="text-gray-600 mb-4">
              Link your GitHub, LinkedIn, and Twitter for better portfolio generation
            </p>
            <Button variant="outline" className="w-full">
              Connect Accounts
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              View Analytics
            </h3>
            <p className="text-gray-600 mb-4">
              Track your portfolio performance and visitor insights
            </p>
            <Button variant="outline" className="w-full">
              View Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 