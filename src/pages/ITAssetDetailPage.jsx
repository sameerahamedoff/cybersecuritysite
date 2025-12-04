import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ITAssetDetailPage() {
  const { assetId } = useParams();

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          to="/it"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to IT Security
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Asset ID — {assetId}</h1>
        <p className="text-gray-600">Detailed Profile</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hardware & OS Details */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Hardware & OS Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Manufacturer</label>
                <p className="text-gray-800">Dell Inc.</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Model</label>
                <p className="text-gray-800">PowerEdge R740</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Operating System</label>
                <p className="text-gray-800">Ubuntu Server 22.04 LTS</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">OS Version</label>
                <p className="text-gray-800">22.04.3</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">CPU</label>
                <p className="text-gray-800">Intel Xeon E5-2680 v4 (2x)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">RAM</label>
                <p className="text-gray-800">64 GB</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">IP Address</label>
                <p className="text-gray-800 font-mono">192.168.1.10</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">MAC Address</label>
                <p className="text-gray-800 font-mono">00:1B:44:11:3A:B7</p>
              </div>
            </div>
          </div>

          {/* Installed Software */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Installed Software</h2>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">Apache HTTP Server</p>
                  <p className="text-sm text-gray-600">Version 2.4.58</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">Up to date</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">MySQL Server</p>
                  <p className="text-sm text-gray-600">Version 8.0.35</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">Update available</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">OpenSSH</p>
                  <p className="text-sm text-gray-600">Version 8.9p1</p>
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">Vulnerable</span>
              </div>
            </div>
          </div>

          {/* Open Ports / Services */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Open Ports / Services</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Port</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Service</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Protocol</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm font-mono text-gray-800">22</td>
                    <td className="px-4 py-2 text-sm text-gray-600">SSH</td>
                    <td className="px-4 py-2 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Open</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">TCP</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-mono text-gray-800">80</td>
                    <td className="px-4 py-2 text-sm text-gray-600">HTTP</td>
                    <td className="px-4 py-2 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Open</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">TCP</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-mono text-gray-800">443</td>
                    <td className="px-4 py-2 text-sm text-gray-600">HTTPS</td>
                    <td className="px-4 py-2 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Open</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">TCP</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-mono text-gray-800">3306</td>
                    <td className="px-4 py-2 text-sm text-gray-600">MySQL</td>
                    <td className="px-4 py-2 text-sm">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Restricted</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">TCP</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Vulnerabilities */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Vulnerabilities</h2>
            <div className="space-y-3">
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">CVE-2024-1234</p>
                    <p className="text-sm text-gray-600">OpenSSH Remote Code Execution</p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">Critical</span>
                </div>
                <p className="text-xs text-gray-500">CVSS Score: 9.8 | Published: 2024-01-10</p>
              </div>
              <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">CVE-2024-5678</p>
                    <p className="text-sm text-gray-600">MySQL Authentication Bypass</p>
                  </div>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-semibold">High</span>
                </div>
                <p className="text-xs text-gray-500">CVSS Score: 7.5 | Published: 2024-01-08</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Last Patch Installed */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Last Patch Installed</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Security Update</p>
                <p className="text-sm text-gray-600">2024-01-12 03:00 UTC</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">System Update</p>
                <p className="text-sm text-gray-600">2024-01-10 02:30 UTC</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Application Update</p>
                <p className="text-sm text-gray-600">2024-01-08 01:15 UTC</p>
              </div>
            </div>
          </div>

          {/* Security Logs */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Security Logs</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">2024-01-15 14:30</p>
                <p className="text-sm text-gray-700">Failed login attempt from 192.168.1.100</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">2024-01-15 12:15</p>
                <p className="text-sm text-gray-700">Firewall rule updated</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">2024-01-15 10:00</p>
                <p className="text-sm text-gray-700">Antivirus scan completed - 0 threats</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
