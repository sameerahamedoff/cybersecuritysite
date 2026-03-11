import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function IoTSecurityPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const devices = [
    { id: 'IOT-001', name: 'Temperature Sensor T-001', type: 'Environmental Sensor', status: 'Healthy', battery: 78, location: 'Building A - Floor 3' },
    { id: 'IOT-002', name: 'Smart Camera CAM-001', type: 'Security Camera', status: 'At Risk', battery: 45, location: 'Building B - Entrance' },
    { id: 'IOT-003', name: 'Humidity Sensor H-001', type: 'Environmental Sensor', status: 'Healthy', battery: 92, location: 'Building A - Floor 2' },
    { id: 'IOT-004', name: 'Motion Detector M-001', type: 'Motion Sensor', status: 'Critical', battery: 12, location: 'Building C - Warehouse' },
    { id: 'IOT-005', name: 'Air Quality Monitor AQ-001', type: 'Environmental Sensor', status: 'Healthy', battery: 85, location: 'Building A - Floor 1' },
    { id: 'IOT-006', name: 'Smart Lock L-001', type: 'Access Control', status: 'At Risk', battery: 34, location: 'Building B - Main Door' }
  ];

  const alerts = [
    { id: 'ALERT-001', type: 'Botnet Behavior', severity: 'Critical', devices: 12, time: '2 hours ago', status: 'Active' },
    { id: 'ALERT-002', type: 'Brute-force Login', severity: 'High', devices: 8, time: '5 hours ago', status: 'Active' },
    { id: 'ALERT-003', type: 'Sensor Spoofing', severity: 'Medium', devices: 3, time: '1 day ago', status: 'Investigating' },
    { id: 'ALERT-004', type: 'Unauthorized Access', severity: 'High', devices: 5, time: '2 days ago', status: 'Resolved' }
  ];

  const vulnerabilities = [
    { cve: 'CVE-2024-1234', severity: 'Critical', cvss: 9.8, affected: 23, description: 'Remote code execution' },
    { cve: 'CVE-2024-5678', severity: 'High', cvss: 7.5, affected: 12, description: 'Authentication bypass' },
    { cve: 'CVE-2024-9012', severity: 'High', cvss: 7.2, affected: 8, description: 'Privilege escalation' },
    { cve: 'CVE-2024-3456', severity: 'Medium', cvss: 6.5, affected: 15, description: 'Information disclosure' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">IoT Device Threat Monitoring</h1>
        <p className="text-gray-600">Monitor and secure Internet of Things devices across your network</p>
      </div>

      {/* Summary Cards - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm font-medium mb-1">Total Devices</p>
          <p className="text-3xl font-bold text-gray-800">1,247</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-500 text-sm font-medium mb-1">Healthy</p>
          <p className="text-3xl font-bold text-gray-800">1,089</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <p className="text-gray-500 text-sm font-medium mb-1">At Risk</p>
          <p className="text-3xl font-bold text-gray-800">124</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <p className="text-gray-500 text-sm font-medium mb-1">Critical</p>
          <p className="text-3xl font-bold text-gray-800">34</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-1 inline-flex">
        {['overview', 'devices', 'alerts', 'vulnerabilities', 'policies'].map((tab) => (
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
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Device Health & Battery Levels */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Device Health & Battery Levels</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Sensor Network A</span>
                    <span className="text-sm font-semibold text-gray-800">78% avg battery</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Smart Cameras</span>
                    <span className="text-sm font-semibold text-gray-800">45% avg battery</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-yellow-600 h-3 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Environmental Sensors</span>
                    <span className="text-sm font-semibold text-gray-800">92% avg battery</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Firmware CVE Exposure */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Firmware CVE Exposure</h2>
              <div className="space-y-3">
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">CVE-2024-1234</p>
                      <p className="text-sm text-gray-600">Affects 23 devices</p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">Critical</span>
                  </div>
                  <p className="text-xs text-gray-500">CVSS Score: 9.8 - Remote code execution</p>
                </div>
                <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">CVE-2024-5678</p>
                      <p className="text-sm text-gray-600">Affects 12 devices</p>
                    </div>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-semibold">High</span>
                  </div>
                  <p className="text-xs text-gray-500">CVSS Score: 7.5 - Authentication bypass</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Default Credentials Detection */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Default Credentials Detection</h2>
              <div className="space-y-3">
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">Devices with default passwords</p>
                      <p className="text-sm text-gray-600">34 devices detected</p>
                    </div>
                    <span className="text-2xl font-bold text-red-600">34</span>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">Weak passwords</p>
                      <p className="text-sm text-gray-600">89 devices need password update</p>
                    </div>
                    <span className="text-2xl font-bold text-yellow-600">89</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weak Communication Channels */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Weak Communication Channels</h2>
              <div className="space-y-3">
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">HTTP (Unencrypted)</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">156 devices</span>
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">MQTT (No TLS)</span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-semibold">89 devices</span>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">CoAP (Unsecured)</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">45 devices</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Active Alerts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <h3 className="font-semibold text-red-800 mb-2">Botnet Behavior</h3>
                <p className="text-sm text-gray-600">12 devices showing suspicious network patterns</p>
              </div>
              <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                <h3 className="font-semibold text-orange-800 mb-2">Brute-force Login</h3>
                <p className="text-sm text-gray-600">8 devices experiencing repeated login attempts</p>
              </div>
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <h3 className="font-semibold text-yellow-800 mb-2">Sensor Spoofing</h3>
                <p className="text-sm text-gray-600">3 sensors reporting anomalous data patterns</p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'devices' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">IoT Devices ({devices.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Device ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Battery</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {devices.map((device) => (
                  <tr key={device.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm font-medium text-blue-600">
                      {device.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{device.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{device.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        device.status === 'Healthy' ? 'bg-green-100 text-green-800' :
                        device.status === 'At Risk' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {device.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              device.battery > 70 ? 'bg-green-600' :
                              device.battery > 40 ? 'bg-yellow-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${device.battery}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{device.battery}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{device.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/iot/devices/${device.id}`}
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
            <h2 className="text-xl font-bold text-gray-800">Active Alerts ({alerts.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Alert ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Affected Devices</th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{alert.devices} devices</td>
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

      {activeTab === 'vulnerabilities' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Vulnerabilities ({vulnerabilities.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">CVE ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">CVSS Score</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Affected Devices</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vulnerabilities.map((vuln) => (
                  <tr key={vuln.cve} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href="#" className="text-blue-600 hover:underline font-mono text-sm font-medium">
                        {vuln.cve}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        vuln.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                        vuln.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {vuln.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{vuln.cvss}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vuln.affected} devices</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{vuln.description}</td>
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
                    <h3 className="font-semibold text-gray-800 mb-2">Password Policy</h3>
                    <p className="text-sm text-gray-600">Enforce strong passwords, minimum 12 characters, complexity requirements</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">Active</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Encryption Policy</h3>
                    <p className="text-sm text-gray-600">Require TLS/SSL for all device communications</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">Active</span>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Firmware Update Policy</h3>
                    <p className="text-sm text-gray-600">Automatic firmware updates for critical security patches</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-semibold">Pending</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Network Isolation Policy</h3>
                    <p className="text-sm text-gray-600">IoT devices isolated on separate VLAN</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">Active</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Access Control Policy</h3>
                    <p className="text-sm text-gray-600">Role-based access control for device management</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">Active</span>
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
                  <span className="text-sm font-semibold text-gray-800">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Devices in Compliance</span>
                  <span className="text-sm font-semibold text-gray-800">1,085 / 1,247</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
