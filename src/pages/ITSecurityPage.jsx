import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ITSecurityPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const assets = [
    { id: 'IT-001', name: 'Web Server PROD-01', type: 'Server', os: 'Ubuntu 22.04', status: 'Active', risk: 'High', ip: '192.168.1.10' },
    { id: 'IT-002', name: 'Database Server DB-01', type: 'Server', os: 'Windows Server 2022', status: 'Active', risk: 'Critical', ip: '192.168.1.20' },
    { id: 'IT-003', name: 'Workstation WS-001', type: 'Workstation', os: 'Windows 11', status: 'Active', risk: 'Medium', ip: '192.168.1.100' },
    { id: 'IT-004', name: 'File Server FS-01', type: 'Server', os: 'Windows Server 2019', status: 'Active', risk: 'Medium', ip: '192.168.1.30' },
    { id: 'IT-005', name: 'Mail Server MAIL-01', type: 'Server', os: 'Linux', status: 'Active', risk: 'High', ip: '192.168.1.40' },
    { id: 'IT-006', name: 'Workstation WS-002', type: 'Workstation', os: 'Windows 10', status: 'Active', risk: 'Low', ip: '192.168.1.101' }
  ];

  const alerts = [
    { id: 'ALERT-IT-001', type: 'Ransomware', severity: 'Critical', affected: 3, time: '1 hour ago', status: 'Active' },
    { id: 'ALERT-IT-002', type: 'Unauthorized Access', severity: 'High', affected: 5, time: '3 hours ago', status: 'Investigating' },
    { id: 'ALERT-IT-003', type: 'Malware Detection', severity: 'High', affected: 12, time: '5 hours ago', status: 'Active' },
    { id: 'ALERT-IT-004', type: 'Data Exfiltration', severity: 'Critical', affected: 2, time: '1 day ago', status: 'Resolved' },
    { id: 'ALERT-IT-005', type: 'Brute Force Attack', severity: 'Medium', affected: 8, time: '2 days ago', status: 'Resolved' }
  ];

  const vulnerabilities = [
    { cve: 'CVE-2024-1234', severity: 'Critical', cvss: 9.8, affected: 12, description: 'Remote Code Execution in Apache Server' },
    { cve: 'CVE-2024-5678', severity: 'High', cvss: 7.5, affected: 8, description: 'SQL Injection in Database' },
    { cve: 'CVE-2024-9012', severity: 'High', cvss: 7.2, affected: 15, description: 'Privilege Escalation in Windows' },
    { cve: 'CVE-2024-3456', severity: 'Medium', cvss: 6.5, affected: 20, description: 'Information Disclosure' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">IT Infrastructure Security</h1>
        <p className="text-gray-600">Monitor and manage IT assets, vulnerabilities, and security policies</p>
      </div>

      {/* Risk Score Indicator - Always Visible */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Overall Risk Score</h2>
          <span className="text-4xl font-bold text-orange-600">72/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-orange-600 h-4 rounded-full" style={{ width: '72%' }}></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Moderate risk - 3 critical vulnerabilities require attention</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-1 inline-flex">
        {['overview', 'assets', 'alerts', 'policies', 'compliance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vulnerability Feed */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-xl font-bold text-gray-800">Vulnerability Feed by CVE / CVSS</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">CVE ID</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">CVSS Score</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Severity</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Affected Assets</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {vulnerabilities.slice(0, 4).map((vuln) => (
                      <tr key={vuln.cve} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">{vuln.cve}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">{vuln.cvss}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            vuln.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                            vuln.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {vuln.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vuln.affected} assets</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Patch Compliance Status */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Patch Compliance Status</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Critical Patches</span>
                    <span className="text-sm font-semibold text-gray-800">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Security Updates</span>
                    <span className="text-sm font-semibold text-gray-800">82%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Feature Updates</span>
                    <span className="text-sm font-semibold text-gray-800">91%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Endpoint Protection Status */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Endpoint Protection Status</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Protected</p>
                  <p className="text-2xl font-bold text-green-600">1,234</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">At Risk</p>
                  <p className="text-2xl font-bold text-red-600">23</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Alerts */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Alerts</h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                  <h3 className="font-semibold text-red-800 mb-1">Ransomware</h3>
                  <p className="text-sm text-gray-600">3 suspicious encryption attempts detected</p>
                </div>
                <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                  <h3 className="font-semibold text-orange-800 mb-1">Unauthorized Access</h3>
                  <p className="text-sm text-gray-600">5 failed login attempts from unknown IPs</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <h3 className="font-semibold text-yellow-800 mb-1">Malware / EDR Logs</h3>
                  <p className="text-sm text-gray-600">12 malware signatures detected in last hour</p>
                </div>
              </div>
            </div>

            {/* Running Security Policies */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Running Security Policies</h2>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Firewall Rules Active
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Antivirus Scanning
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Intrusion Detection
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Access Control
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'assets' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">IT Assets ({assets.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Asset ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">OS</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">IP Address</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Risk Level</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm font-medium text-blue-600">
                      {asset.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{asset.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{asset.os}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{asset.ip}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        asset.risk === 'Critical' ? 'bg-red-100 text-red-800' :
                        asset.risk === 'High' ? 'bg-orange-100 text-orange-800' :
                        asset.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {asset.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/it/assets/${asset.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Security Alerts ({alerts.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Alert ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Affected Assets</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {alerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm font-medium text-blue-600">
                      {alert.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        alert.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                        alert.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{alert.affected} assets</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        alert.status === 'Active' ? 'bg-red-100 text-red-800' :
                        alert.status === 'Investigating' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'policies' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Security Policies</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Firewall Policy</h3>
                    <p className="text-sm text-gray-600">Block unauthorized inbound/outbound traffic, allow only approved ports and protocols</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">Active</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Antivirus Policy</h3>
                    <p className="text-sm text-gray-600">Real-time scanning enabled, daily full scans, automatic quarantine of threats</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">Active</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Patch Management Policy</h3>
                    <p className="text-sm text-gray-600">Critical patches within 24 hours, security updates within 7 days</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">Active</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Access Control Policy</h3>
                    <p className="text-sm text-gray-600">Role-based access, MFA required for admin accounts, least privilege principle</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">Active</span>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Data Encryption Policy</h3>
                    <p className="text-sm text-gray-600">Encrypt data at rest and in transit, use AES-256 encryption standard</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-semibold">Pending</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Policy Compliance</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Compliance</span>
                  <span className="text-sm font-semibold text-gray-800">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Assets in Compliance</span>
                  <span className="text-sm font-semibold text-gray-800">1,147 / 1,247</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">ISO 27001</h3>
              <p className="text-3xl font-bold text-green-600 mb-2">85%</p>
              <p className="text-sm text-gray-600">Compliance Score</p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">PCI DSS</h3>
              <p className="text-3xl font-bold text-blue-600 mb-2">78%</p>
              <p className="text-sm text-gray-600">Compliance Score</p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">NIST CSF</h3>
              <p className="text-3xl font-bold text-purple-600 mb-2">91%</p>
              <p className="text-sm text-gray-600">Compliance Score</p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Compliance Requirements</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">Access Control (ISO 27001 A.9)</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">Compliant</span>
                </div>
                <p className="text-sm text-gray-600">All access controls properly implemented and documented</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">Cryptography (ISO 27001 A.10)</h3>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-semibold">Partial</span>
                </div>
                <p className="text-sm text-gray-600">Encryption policies need to be fully implemented</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">Operations Security (ISO 27001 A.12)</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">Compliant</span>
                </div>
                <p className="text-sm text-gray-600">Security operations and monitoring in place</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">Network Security (PCI DSS Req. 1)</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">Compliant</span>
                </div>
                <p className="text-sm text-gray-600">Firewall and network segmentation configured</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Compliance Reports</h2>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">ISO 27001 Audit Report</p>
                  <p className="text-sm text-gray-600">Last audit: 2024-01-10</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Download</button>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">PCI DSS Self-Assessment</p>
                  <p className="text-sm text-gray-600">Last assessment: 2024-01-05</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Download</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
