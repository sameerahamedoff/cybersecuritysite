import React, { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('organization');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">System & Application Settings</h1>
        <p className="text-gray-600">Configure system settings, integrations, and preferences</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-1 inline-flex">
        {['organization', 'access', 'integrations', 'notifications', 'billing'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab === 'access' ? 'Access Control' : tab === 'billing' ? 'Billing' : tab}
          </button>
        ))}
      </div>

      {/* Organization Settings */}
      {activeTab === 'organization' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Organization Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Organization Name</label>
              <input
                type="text"
                defaultValue="Acme Corporation"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Manufacturing</option>
                <option>Healthcare</option>
                <option>Energy</option>
                <option>Financial Services</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Timezone</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>UTC</option>
                <option>America/New_York</option>
                <option>Europe/London</option>
                <option>Asia/Tokyo</option>
              </select>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Access Control & Roles */}
      {activeTab === 'access' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Access Control & Roles</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold text-gray-800">Administrator</p>
                  <p className="text-sm text-gray-600">Full system access and configuration</p>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm font-semibold">3 users</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold text-gray-800">Security Analyst</p>
                  <p className="text-sm text-gray-600">View and manage incidents, access reports</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-semibold">12 users</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold text-gray-800">Viewer</p>
                  <p className="text-sm text-gray-600">Read-only access to dashboards and reports</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">25 users</span>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              + Add New Role
            </button>
          </div>
        </div>
      )}

      {/* Integration APIs */}
      {activeTab === 'integrations' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Integration APIs</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold text-gray-800">REST API</p>
                  <p className="text-sm text-gray-600">API Key: •••••••••••••••••</p>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Regenerate</button>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold text-gray-800">Webhook URL</p>
                  <p className="text-sm text-gray-600">https://api.company.com/webhook</p>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Edit</button>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold text-gray-800">SIEM Integration</p>
                  <p className="text-sm text-gray-600">Splunk Enterprise</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">Connected</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email / Slack / Teams Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Notification Settings</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Email Notifications</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm text-gray-700">Critical incidents</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm text-gray-700">Daily security summary</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Weekly reports</span>
                </label>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Slack Integration</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Workspace: security-team</p>
                <p className="text-sm text-gray-600 mb-3">Channel: #security-alerts</p>
                <button className="px-4 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">Configure</button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Microsoft Teams Integration</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Team: Security Operations</p>
                <p className="text-sm text-gray-600 mb-3">Channel: Security Incidents</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Configure</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing & Subscription */}
      {activeTab === 'billing' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Billing & Subscription</h2>
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold text-gray-800">Current Plan</p>
                  <p className="text-sm text-gray-600">Enterprise - $499/month</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">Active</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Usage</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Assets Monitored</span>
                    <span className="text-sm font-semibold text-gray-800">1,247 / 2,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">API Calls</span>
                    <span className="text-sm font-semibold text-gray-800">45,234 / 100,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Upgrade Plan
              </button>
              <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                View Invoice History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
