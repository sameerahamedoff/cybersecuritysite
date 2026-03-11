import React, { useState } from 'react';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('incident');
  const [format, setFormat] = useState('pdf');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Security & Compliance Reports</h1>
        <p className="text-gray-600">Generate, schedule, and export comprehensive security reports</p>
      </div>

      {/* Generate Reports */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Generate Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="incident">Incident Summary</option>
              <option value="vulnerability">Vulnerability Scores</option>
              <option value="asset">Asset Exposure</option>
              <option value="compliance">Compliance Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Export Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
              <option value="xls">Excel (XLS)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date Range</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="2024-01-01"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="2024-01-15"
            />
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Generate Report
          </button>
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            Schedule Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Report Types */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Available Reports</h2>
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <h3 className="font-semibold text-gray-800 mb-2">Incident Summary</h3>
              <p className="text-sm text-gray-600 mb-3">Comprehensive overview of security incidents, response times, and resolution status</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">PDF</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">CSV</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">XLS</button>
              </div>
            </div>
            <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
              <h3 className="font-semibold text-gray-800 mb-2">Vulnerability Scores</h3>
              <p className="text-sm text-gray-600 mb-3">Detailed vulnerability assessment with CVSS scores and remediation priorities</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-orange-600 text-white rounded text-xs hover:bg-orange-700">PDF</button>
                <button className="px-3 py-1 bg-orange-600 text-white rounded text-xs hover:bg-orange-700">CSV</button>
                <button className="px-3 py-1 bg-orange-600 text-white rounded text-xs hover:bg-orange-700">XLS</button>
              </div>
            </div>
            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
              <h3 className="font-semibold text-gray-800 mb-2">Asset Exposure</h3>
              <p className="text-sm text-gray-600 mb-3">Complete inventory of assets with risk levels and security posture</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">PDF</button>
                <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">CSV</button>
                <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">XLS</button>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Reports */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Compliance Reports</h2>
          <div className="space-y-3">
            <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
              <h3 className="font-semibold text-gray-800 mb-2">ISO 27001</h3>
              <p className="text-sm text-gray-600 mb-2">Information Security Management</p>
              <p className="text-xs text-gray-500">Last generated: 2024-01-10</p>
              <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">Generate</button>
            </div>
            <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded">
              <h3 className="font-semibold text-gray-800 mb-2">PCI DSS</h3>
              <p className="text-sm text-gray-600 mb-2">Payment Card Industry Data Security</p>
              <p className="text-xs text-gray-500">Last generated: 2024-01-08</p>
              <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">Generate</button>
            </div>
            <div className="p-4 bg-teal-50 border-l-4 border-teal-500 rounded">
              <h3 className="font-semibold text-gray-800 mb-2">NIST CSF</h3>
              <p className="text-sm text-gray-600 mb-2">Cybersecurity Framework</p>
              <p className="text-xs text-gray-500">Last generated: 2024-01-12</p>
              <button className="mt-2 px-4 py-2 bg-teal-600 text-white rounded text-sm hover:bg-teal-700">Generate</button>
            </div>
          </div>
        </div>
      </div>

      {/* Scheduling & Email Delivery */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Scheduled Reports & Email Delivery</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">Weekly Incident Summary</p>
              <p className="text-sm text-gray-600">Every Monday at 9:00 AM | Sent to: security-team@company.com</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">Edit</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">Delete</button>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">Monthly Compliance Report</p>
              <p className="text-sm text-gray-600">1st of every month at 8:00 AM | Sent to: compliance@company.com</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">Edit</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">Delete</button>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            + Add New Scheduled Report
          </button>
        </div>
      </div>
    </div>
  );
}
