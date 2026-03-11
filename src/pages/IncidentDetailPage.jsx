import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function IncidentDetailPage() {
  const { incidentId } = useParams();
  const [comment, setComment] = useState('');

  const timeline = [
    { time: '2024-01-15 14:30', event: 'Incident detected by SIEM', type: 'detection' },
    { time: '2024-01-15 14:32', event: 'Automated response: IP blocked', type: 'action' },
    { time: '2024-01-15 14:35', event: 'SOC analyst assigned: John Doe', type: 'assignment' },
    { time: '2024-01-15 15:00', event: 'Initial investigation started', type: 'investigation' },
    { time: '2024-01-15 15:30', event: 'Root cause identified: Brute force attack', type: 'analysis' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          to="/incidents"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Incidents
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Incident Case #{incidentId}</h1>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 uppercase mb-2">Impact</label>
            <p className="text-gray-800">12 servers affected, production environment at risk</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 uppercase mb-2">Category</label>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">Unauthorized Access</span>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 uppercase mb-2">Time of Detection</label>
            <p className="text-gray-800">2024-01-15 14:30:00 UTC</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 uppercase mb-2">Severity</label>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">Critical</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Root Cause Analysis */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Root Cause Analysis</h2>
            <p className="text-gray-700 mb-4">
              The incident was caused by a coordinated brute-force attack targeting SSH services on multiple servers. 
              The attacker used a distributed botnet to attempt credential stuffing attacks from various IP addresses.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Key Finding:</strong> Weak password policies allowed successful authentication attempts after 2,347 failed attempts.
              </p>
            </div>
          </div>

          {/* Affected Assets / Devices */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Affected Assets / Devices</h2>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-800">Server-001 (192.168.1.10)</p>
                <p className="text-sm text-gray-600">Status: Compromised</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-800">Server-002 (192.168.1.11)</p>
                <p className="text-sm text-gray-600">Status: Under Investigation</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-800">Server-003 (192.168.1.12)</p>
                <p className="text-sm text-gray-600">Status: Isolated</p>
              </div>
            </div>
          </div>

          {/* MITRE ATT&CK Mapping */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">MITRE ATT&CK Mapping</h2>
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-semibold text-gray-800">T1110 - Brute Force</p>
                <p className="text-sm text-gray-600">Credential stuffing attack detected</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-semibold text-gray-800">T1078 - Valid Accounts</p>
                <p className="text-sm text-gray-600">Unauthorized account access</p>
              </div>
            </div>
          </div>

          {/* Timeline of Events */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Timeline of Events</h2>
            <div className="space-y-4">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-2 ${
                    item.type === 'detection' ? 'bg-red-500' :
                    item.type === 'action' ? 'bg-green-500' :
                    item.type === 'assignment' ? 'bg-blue-500' :
                    item.type === 'investigation' ? 'bg-yellow-500' : 'bg-purple-500'
                  }`}></div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.event}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Response Actions</h2>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              <li>Blocked source IP addresses at firewall level</li>
              <li>Isolated affected servers from network</li>
              <li>Reset compromised user credentials</li>
              <li>Enabled additional MFA requirements</li>
              <li>Deployed enhanced monitoring on affected systems</li>
            </ul>
          </div>

          {/* Attachments */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Attachments</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm text-gray-700">incident_logs_2024-01-15.txt</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-700">screenshot_evidence.png</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Comments */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Comments</h2>
            <div className="space-y-4 mb-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-1">Investigating network logs for additional indicators.</p>
                <p className="text-xs text-gray-500">John Doe - 2 hours ago</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-1">All affected systems have been isolated.</p>
                <p className="text-xs text-gray-500">Jane Smith - 3 hours ago</p>
              </div>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Add a comment..."
              rows="3"
            />
            <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Add Comment
            </button>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Actions</h2>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Assign to Team
              </button>
              <button className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium">
                Escalate
              </button>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                Mark as Resolved
              </button>
              <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
                Close Incident
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
