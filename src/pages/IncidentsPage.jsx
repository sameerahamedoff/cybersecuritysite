import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function IncidentsPage() {
  const [filter, setFilter] = useState('all');

  const incidents = [
    {
      id: 'INC-2024-001',
      type: 'Unauthorized Access',
      severity: 'Critical',
      environment: 'IT',
      status: 'Open',
      assignedTo: 'John Doe',
      detected: '2024-01-15 14:30'
    },
    {
      id: 'INC-2024-002',
      type: 'Malware Detection',
      severity: 'High',
      environment: 'IT',
      status: 'In Progress',
      assignedTo: 'Jane Smith',
      detected: '2024-01-15 12:15'
    },
    {
      id: 'INC-2024-003',
      type: 'OT Device Anomaly',
      severity: 'Medium',
      environment: 'OT',
      status: 'Investigating',
      assignedTo: 'Bob Wilson',
      detected: '2024-01-15 10:45'
    },
    {
      id: 'INC-2024-004',
      type: 'IoT Botnet Activity',
      severity: 'High',
      environment: 'IoT',
      status: 'Open',
      assignedTo: 'Alice Brown',
      detected: '2024-01-15 09:20'
    },
    {
      id: 'INC-2024-005',
      type: 'Data Exfiltration',
      severity: 'Critical',
      environment: 'IT',
      status: 'Closed',
      assignedTo: 'John Doe',
      detected: '2024-01-14 16:00'
    }
  ];

  const filteredIncidents = filter === 'all' 
    ? incidents 
    : incidents.filter(inc => inc.status.toLowerCase() === filter.toLowerCase() || 
                              (filter === 'critical' && inc.severity === 'Critical'));

  const getSeverityColor = (severity) => {
    const colors = {
      'Critical': 'bg-red-100 text-red-800',
      'High': 'bg-orange-100 text-orange-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-blue-100 text-blue-800'
    };
    return colors[severity] || colors['Low'];
  };

  const getStatusColor = (status) => {
    const colors = {
      'Open': 'bg-red-100 text-red-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      'Investigating': 'bg-blue-100 text-blue-800',
      'Closed': 'bg-green-100 text-green-800'
    };
    return colors[status] || colors['Open'];
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Incident Response & SOC Activity</h1>
        <p className="text-gray-600">View and manage security incidents across all environments</p>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-1 inline-flex">
        {['all', 'open', 'in progress', 'closed', 'critical'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors capitalize ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Incident List Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Incident List ({filteredIncidents.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Incident ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Affected Environment</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Detected</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIncidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/incidents/${incident.id}`}
                      className="text-blue-600 hover:underline font-mono text-sm font-medium"
                    >
                      {incident.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {incident.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {incident.environment}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {incident.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {incident.detected}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/incidents/${incident.id}`}
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

      {/* Case Management Timeline */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Case Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">INC-2024-001 assigned to John Doe</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full mt-2"></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">INC-2024-005 resolved and closed</p>
              <p className="text-xs text-gray-500">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">INC-2024-002 status updated to In Progress</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
